"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { techWeb } from "@/lib/data";

export default function SkillWeb() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      // No WebGL context available — degrade gracefully (no skill swarm).
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const skillGroup = new THREE.Group();
    scene.add(skillGroup);

    const skillNodes: THREE.Sprite[] = [];
    const connections: {
      line: THREE.Line;
      start: THREE.Sprite;
      end: THREE.Sprite;
    }[] = [];

    const boundaryX = 35;
    const boundaryY = 18;
    const boundaryZ = 15;

    techWeb.forEach((name) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = 512;
      canvas.height = 160;
      ctx.font = "Bold 96px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "#00F0FF";
      ctx.shadowBlur = 30;
      ctx.fillStyle = "#00F0FF";
      ctx.fillText(name.toUpperCase(), canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
      });
      const sprite = new THREE.Sprite(material);
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random();
      sprite.position.set(
        Math.cos(angle) * dist * boundaryX * 0.8,
        Math.sin(angle) * dist * boundaryY * 0.8,
        (Math.random() - 0.5) * boundaryZ * 0.8
      );
      const baseScale = 3.5 + Math.random() * 1.5;
      sprite.scale.set(baseScale, baseScale * 0.3125, 1);
      sprite.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        originalScale: baseScale,
        phase: Math.random() * Math.PI * 2,
      };
      skillGroup.add(sprite);
      skillNodes.push(sprite);
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.12,
    });
    for (let i = 0; i < skillNodes.length; i++) {
      for (let j = i + 1; j < skillNodes.length; j++) {
        if (Math.random() > 0.85) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            skillNodes[i].position,
            skillNodes[j].position,
          ]);
          const line = new THREE.Line(geometry, lineMaterial);
          skillGroup.add(line);
          connections.push({ line, start: skillNodes[i], end: skillNodes[j] });
        }
      }
    }

    camera.position.z = 35;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.0035;
      targetY = (e.clientY - window.innerHeight / 2) * 0.0035;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const time = Date.now() * 0.0008;
      skillNodes.forEach((node) => {
        node.position.add(node.userData.velocity as THREE.Vector3);
        const nx = node.position.x / boundaryX;
        const ny = node.position.y / boundaryY;
        const nz = node.position.z / boundaryZ;
        const distSquared = nx * nx + ny * ny + nz * nz;
        if (distSquared > 0.95) {
          const normal = new THREE.Vector3(nx, ny, nz).normalize();
          (node.userData.velocity as THREE.Vector3).reflect(
            normal.multiplyScalar(-1)
          );
          node.position.multiplyScalar(0.98);
        }
        const pulse = 1 + Math.sin(time * 2 + node.userData.phase) * 0.1;
        node.scale.set(
          node.userData.originalScale * pulse,
          node.userData.originalScale * 0.3125 * pulse,
          1
        );
        const depthFactor = (node.position.z + boundaryZ) / (boundaryZ * 2);
        node.material.opacity = Math.max(0.4, Math.min(1, depthFactor + 0.2));
      });
      connections.forEach((conn) => {
        const positions = (
          conn.line.geometry.attributes.position as THREE.BufferAttribute
        ).array as Float32Array;
        positions[0] = conn.start.position.x;
        positions[1] = conn.start.position.y;
        positions[2] = conn.start.position.z;
        positions[3] = conn.end.position.x;
        positions[4] = conn.end.position.y;
        positions[5] = conn.end.position.z;
        conn.line.geometry.attributes.position.needsUpdate = true;
        const dist = conn.start.position.distanceTo(conn.end.position);
        (conn.line.material as THREE.LineBasicMaterial).opacity = Math.max(
          0,
          0.2 - dist / 40
        );
      });
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      skillGroup.rotation.y = mouseX;
      skillGroup.rotation.x = -mouseY;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} id="skill-web-container" aria-hidden />;
}
