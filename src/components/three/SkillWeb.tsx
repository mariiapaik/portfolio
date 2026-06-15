"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { skillGroups } from "@/lib/data";

export default function SkillWeb() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 48;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const disposables: { dispose: () => void }[] = [];

    const makeLabel = (text: string, worldHeight: number, color: string) => {
      const fontPx = 78;
      const font = `Bold ${fontPx}px 'Space Grotesk', sans-serif`;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      ctx.font = font;
      const label = text.toUpperCase();
      const w = Math.ceil(ctx.measureText(label).width);
      const padX = 56;
      const padY = 36;
      canvas.width = w + padX * 2;
      canvas.height = fontPx + padY * 2;

      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
      ctx.fillStyle = color;
      ctx.fillText(label, canvas.width / 2, canvas.height / 2);

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        opacity: 0.95,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(
        worldHeight * (canvas.width / canvas.height),
        worldHeight,
        1
      );
      disposables.push(tex, mat);
      return sprite;
    };

    type Node = { sprite: THREE.Sprite; anchor: THREE.Vector3; phase: number };
    const nodes: Node[] = [];
    const addNode = (sprite: THREE.Sprite, pos: THREE.Vector3) => {
      sprite.position.copy(pos);
      root.add(sprite);
      const node = { sprite, anchor: pos.clone(), phase: Math.random() * 6.28 };
      nodes.push(node);
      return node;
    };

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.1,
    });
    disposables.push(lineMat);

    type Link = { line: THREE.Line; a: THREE.Vector3; b: THREE.Vector3 };
    const links: Link[] = [];
    const addLink = (a: THREE.Vector3, b: THREE.Vector3) => {
      const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
      const line = new THREE.Line(geo, lineMat);
      root.add(line);
      disposables.push(geo);
      links.push({ line, a, b });
    };
    const connect = (n1: Node, n2: Node) =>
      addLink(n1.sprite.position, n2.sprite.position);

    const WEB_RX = 32;
    const WEB_RY = 19;
    const WEB_RZ = 32;
    const CLUSTER_RX = 10.6;
    const CLUSTER_RY = 8.4;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const hubs: Node[] = [];

    const volumePoint = (index: number, total: number, radius: number) => {
      const y = total <= 1 ? 0 : 1 - (index / (total - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = index * GOLDEN_ANGLE - Math.PI / 2;
      return new THREE.Vector3(
        Math.cos(theta) * WEB_RX * ring * radius,
        y * WEB_RY * radius,
        Math.sin(theta) * WEB_RZ * ring * radius
      );
    };

    const keepInsideWeb = (point: THREE.Vector3) => {
      const distance = Math.sqrt(
        (point.x / WEB_RX) ** 2 +
          (point.y / WEB_RY) ** 2 +
          (point.z / WEB_RZ) ** 2
      );
      if (distance > 0.96) point.multiplyScalar(0.96 / distance);
      return point;
    };

    const allNodes: Node[] = [];

    skillGroups.forEach((group, gi) => {
      const theta =
        (gi / skillGroups.length) * Math.PI * 2 - Math.PI / 2 + 0.35;
      const centerRadius = 0.34 + ((gi * 5) % 7) * 0.08;
      const center = volumePoint(gi + 1, skillGroups.length + 2, centerRadius);
      const normal = new THREE.Vector3(
        center.x / WEB_RX,
        center.y / WEB_RY,
        center.z / WEB_RZ
      ).normalize();
      const tangent = new THREE.Vector3(-Math.sin(theta), 0, Math.cos(theta))
        .normalize();
      const bitangent = new THREE.Vector3().crossVectors(normal, tangent)
        .normalize();

      const hub = addNode(makeLabel(group.cat, 1.45, "#a6ecff"), center);
      hubs.push(hub);
      allNodes.push(hub);

      const items = group.items.map((name, ii) => {
        const ang = ii * GOLDEN_ANGLE + gi * 0.8;
        const rx = CLUSTER_RX + (ii % 4) * 1.05;
        const ry = CLUSTER_RY + ((ii + 1) % 3) * 0.75;
        const depth = (((ii * 2 + gi) % 7) - 3) * 1.25;
        const off = tangent
          .clone()
          .multiplyScalar(Math.cos(ang) * rx)
          .add(
            bitangent
              .clone()
              .multiplyScalar(Math.sin(ang) * ry + (((ii + gi) % 5) - 2) * 1.2)
          )
          .add(normal.clone().multiplyScalar(depth));
        const node = addNode(
          makeLabel(name, 1.28, "#00f0ff"),
          keepInsideWeb(center.clone().add(off))
        );
        allNodes.push(node);
        return node;
      });

      items.forEach((it, ii) => {
        connect(hub, it);
        connect(it, items[(ii + 1) % items.length]);
      });
    });

    const ORIGIN = new THREE.Vector3(0, 0, 0);
    hubs.forEach((hub, i) => {
      connect(hub, hubs[(i + 1) % hubs.length]);
      addLink(hub.sprite.position, ORIGIN);
    });

    const linked = new Set<string>();
    allNodes.forEach((node, i) => {
      const nearest = allNodes
        .map((other, j) => ({
          j,
          other,
          d: node.anchor.distanceTo(other.anchor),
        }))
        .filter(({ j, d }) => j !== i && d < 19)
        .sort((a, b) => a.d - b.d)
        .slice(0, 1);

      nearest.forEach(({ j, other }) => {
        const key = [Math.min(i, j), Math.max(i, j)].join(":");
        if (!linked.has(key)) {
          linked.add(key);
          connect(node, other);
        }
      });
    });

    const baseBox = new THREE.Box3().setFromObject(root);
    const baseSize = new THREE.Vector3();
    baseBox.getSize(baseSize);

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let dragX = 0;
    let dragY = 0;
    const drag = { active: false, lastX: 0, lastY: 0 };

    const onPointerDown = (e: PointerEvent) => {
      drag.active = true;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      container.classList.add("is-dragging");
      container.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (drag.active) {
        const dx = e.clientX - drag.lastX;
        const dy = e.clientY - drag.lastY;
        drag.lastX = e.clientX;
        drag.lastY = e.clientY;
        dragX += dx * 0.008;
        dragY = THREE.MathUtils.clamp(dragY + dy * 0.006, -0.95, 0.95);
        return;
      }

      targetX = (e.clientX - window.innerWidth / 2) * 0.00045;
      targetY = (e.clientY - window.innerHeight / 2) * 0.00045;
    };

    const onPointerUp = (e: PointerEvent) => {
      drag.active = false;
      container.classList.remove("is-dragging");
      if (container.hasPointerCapture(e.pointerId)) {
        container.releasePointerCapture(e.pointerId);
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    const fitRoot = () => {
      const distance = camera.position.z;
      const visibleH =
        2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * distance;
      const visibleW = visibleH * camera.aspect;
      const targetFill = window.innerWidth < 768 ? 0.76 : 0.56;
      const scale =
        Math.min(
          (visibleW * targetFill) / (baseSize.x || 1),
          (visibleH * 0.82) / (baseSize.y || 1)
        ) * 1.02;
      root.scale.setScalar(scale);
    };
    fitRoot();

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = Date.now() * 0.0006;

      const amp = 0.7;
      for (const n of nodes) {
        const ph = t + n.phase;
        n.sprite.position.set(
          n.anchor.x + Math.sin(ph) * amp,
          n.anchor.y + Math.cos(ph * 1.1) * amp,
          n.anchor.z + Math.sin(ph * 0.7) * amp
        );
      }

      for (const L of links) {
        const p = L.line.geometry.attributes.position.array as Float32Array;
        p[0] = L.a.x;
        p[1] = L.a.y;
        p[2] = L.a.z;
        p[3] = L.b.x;
        p[4] = L.b.y;
        p[5] = L.b.z;
        L.line.geometry.attributes.position.needsUpdate = true;
      }

      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;
      root.rotation.y = dragX + curX + t * 0.035;
      root.rotation.x = dragY - curY;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      fitRoot();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} id="skill-web-container" aria-hidden />;
}
