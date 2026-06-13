"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/**
 * Floating 3D figurine that:
 *  - turns its HEAD toward the cursor (the body stays put),
 *  - blinks from time to time, and
 *  - smoothly drifts down the viewport as the page is scrolled.
 *
 * The model is a rigged Meshy export. We never play its baked animation clip
 * (so the body rests in its standing bind pose); instead we rotate only the
 * "Head" bone toward the pointer. The rig has no eye morphs, so the blink is
 * done by swapping the material to a "closed eyes" copy of the texture
 * (painted at runtime) for a fraction of a second.
 */

// Flip these if the head turns the wrong way.
const YAW_SIGN = 1;
const PITCH_SIGN = 1;
const MAX_YAW = 0.7; // rad — max left/right head turn
const MAX_PITCH = 0.45; // rad — max up/down head turn
// Virtual distance (px) from the head to the cursor plane. Smaller = the head
// reacts more sharply / reaches its max angle sooner.
const GAZE_DEPTH = 1400;
// Eyelid closes from the top of the eye downward. Flip if it looks like the
// lid rises from the bottom instead.
const LID_FROM_TOP = true;

export default function Figurine() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 440;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // No WebGL — degrade gracefully.
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // Lower = darker overall. Main brightness knob for the figurine.
    renderer.toneMappingExposure = 0.5;
    container.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.6;

    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(2, 3, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x00f0ff, 1.2);
    rim.position.set(-3, 1, -2);
    scene.add(rim);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x202830, 0.45));

    // pivot only carries the idle bob — NOT the gaze rotation.
    const pivot = new THREE.Group();
    scene.add(pivot);

    let loaded = false;

    // Head-bone gaze.
    let headBone: THREE.Bone | null = null;
    let neckBone: THREE.Bone | null = null;
    const headRest = new THREE.Quaternion();
    const neckRest = new THREE.Quaternion();
    const upAxis = new THREE.Vector3(0, 1, 0);
    const rightAxis = new THREE.Vector3(1, 0, 0);
    const qYaw = new THREE.Quaternion();
    const qPitch = new THREE.Quaternion();
    const qTmp = new THREE.Quaternion();
    let curYaw = 0;
    let curPitch = 0;

    // Eye-blink material swap. lidFrames[0] = half-closed, [1] = fully closed.
    let eyeMaterial: THREE.MeshStandardMaterial | null = null;
    let openMap: THREE.Texture | null = null;
    let lidFrames: THREE.Texture[] = [];

    const loader = new GLTFLoader();
    loader.load(
      "/figurine.glb",
      (gltf) => {
        const root = gltf.scene;

        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        root.position.sub(center);
        // Leave headroom so the crown isn't clipped when it bobs / looks up.
        root.scale.setScalar(1.65 / (size.y || 1));

        root.traverse((obj) => {
          if ((obj as THREE.Bone).isBone) {
            if (obj.name === "Head") headBone = obj as THREE.Bone;
            else if (obj.name === "neck") neckBone = obj as THREE.Bone;
          }
          const mesh = obj as THREE.Mesh;
          if (mesh.isMesh) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat && mat.map && mat.map.image && !eyeMaterial) {
              eyeMaterial = mat;
              openMap = mat.map;
              const eyes = analyzeEyes(mat.map);
              if (eyes) {
                lidFrames = [
                  buildLidTexture(eyes, 0.55),
                  buildLidTexture(eyes, 1.0),
                ];
              }
            }
          }
        });

        // Derive the head's local rotation axes from its marker children
        // ("headfront" = facing direction, "head_end" = crown/up).
        if (headBone) {
          headRest.copy((headBone as THREE.Bone).quaternion);
          const h = headBone as THREE.Bone;
          let front: THREE.Object3D | undefined;
          let end: THREE.Object3D | undefined;
          h.children.forEach((c) => {
            if (c.name === "headfront") front = c;
            if (c.name === "head_end") end = c;
          });
          if (front && end) {
            const up = end.position.clone().normalize();
            const fwd = front.position.clone().normalize();
            const right = up.clone().cross(fwd).normalize();
            upAxis.copy(up);
            rightAxis.copy(right);
          }
        }
        if (neckBone) neckRest.copy((neckBone as THREE.Bone).quaternion);

        pivot.add(root);
        loaded = true;
        container.classList.add("figurine-ready");
      },
      undefined,
      (err) => console.error("Figurine failed to load", err)
    );

    // --- Cursor (raw viewport pixel position) ---
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener("pointermove", onPointerMove);

    // --- Horizontal travel: stand in the side gutter next to the content ---
    // The content column is centred (max 1280px); the figurine lives in the
    // empty gutter to one side and alternates sides per section, so it never
    // overlaps the content while parked (only while gliding across between
    // sections).
    type Side = "right" | "left" | "center";
    // Explicit side per section (index = section order). Grouped so the
    // figurine switches sides less often. Keep in sync with the per-section
    // lane padding in globals.css.
    const PATTERN: Side[] = [
      "right", // 1 hero
      "right", // 2 stats
      "left", // 3 what I build
      "left", // 4 client work
      "right", // 5 case study
      "center", // 6 projects
      "right", // 7 stack
      "left", // 8 about
      "left", // 9 cta
    ];
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section")
    );
    const sideForSection = (i: number): Side => PATTERN[i] ?? "right";

    // Below this width there are no side lanes; the figurine becomes a small
    // mascot pinned to the bottom-right corner instead.
    const isMobile = () => window.innerWidth < 768;

    // Width of the per-section lane reserved for the figurine. Must match the
    // `--lane` CSS var that shifts each section's content to the other side.
    const laneWidth = () =>
      Math.min(320, Math.max(200, window.innerWidth * 0.22));

    // Size & anchor the figurine, then resize the renderer to match.
    const layout = () => {
      if (isMobile()) {
        width = 116;
        height = 164;
        container.style.width = `${width}px`;
        container.style.height = `${height}px`;
        // Pin to the bottom-right corner.
        container.style.top = "auto";
        container.style.bottom = "12px";
        container.style.right = "12px";
        container.style.left = "auto";
        container.style.transform = "none";
      } else {
        width = Math.round(Math.max(180, laneWidth() - 28));
        height = Math.round(width * 1.42);
        container.style.width = `${width}px`;
        container.style.height = `${height}px`;
        // Vertically centred; `left` is driven each frame in animate().
        container.style.top = "50%";
        container.style.bottom = "auto";
        container.style.right = "auto";
        container.style.transform = "translateY(-50%)";
      }
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    // X (px) placing the figurine in its left / right lane or screen centre.
    const anchorX = (side: Side) => {
      if (side === "center") return (window.innerWidth - width) / 2;
      const inset = Math.max(8, (laneWidth() - width) / 2);
      if (side === "left") return inset;
      return window.innerWidth - width - inset;
    };

    layout();

    let targetSide: Side = sections.length ? sideForSection(0) : "right";
    const updateTarget = () => {
      if (!sections.length) return;
      const mid = window.innerHeight / 2;
      let active = 0;
      let best = Infinity;
      sections.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        const d = Math.abs((r.top + r.bottom) / 2 - mid);
        if (d < best) {
          best = d;
          active = i;
        }
      });
      targetSide = sideForSection(active);
    };
    updateTarget();
    window.addEventListener("scroll", updateTarget, { passive: true });

    let curX = anchorX(targetSide);

    // --- Blink scheduling ---
    // A blink steps through frames so the lid visibly lowers and lifts:
    // half-closed -> fully closed (hold) -> half-closed -> open.
    let nextBlinkAt = performance.now() + 1200;
    let seqIdx = -1; // -1 = eyes open / idle
    let phaseEnd = 0;
    let burst = 0;
    type Step = { map: THREE.Texture; dur: number };
    let shownMap: THREE.Texture | null = null;
    const applyMap = (m: THREE.Texture) => {
      if (!eyeMaterial || shownMap === m) return;
      eyeMaterial.map = m;
      eyeMaterial.needsUpdate = true;
      shownMap = m;
    };
    const blinkSeq = (): Step[] => [
      { map: lidFrames[0], dur: 30 },
      { map: lidFrames[1], dur: 85 },
      { map: lidFrames[0], dur: 28 },
    ];
    let seq: Step[] = [];

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let raf = 0;
    let last = performance.now();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now * 0.001;

      if (loaded) {
        // Head gaze: aim the head at the cursor based on where the figurine
        // actually sits on screen (it lives in the top area of its canvas).
        const rect = renderer.domElement.getBoundingClientRect();
        const anchorX = rect.left + rect.width * 0.5;
        const anchorY = rect.top + rect.height * 0.28;
        const dx = pointer.x - anchorX;
        const dy = pointer.y - anchorY;
        const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
        const targetYaw = YAW_SIGN * clamp(Math.atan2(dx, GAZE_DEPTH), MAX_YAW);
        const targetPitch =
          PITCH_SIGN * clamp(Math.atan2(dy, GAZE_DEPTH), MAX_PITCH);
        const ease = reduceMotion ? 1 : 1 - Math.pow(0.0015, dt);
        curYaw = lerp(curYaw, targetYaw, ease);
        curPitch = lerp(curPitch, targetPitch, ease);

        if (headBone) {
          qYaw.setFromAxisAngle(upAxis, curYaw);
          qPitch.setFromAxisAngle(rightAxis, curPitch);
          qTmp.copy(headRest).multiply(qYaw).multiply(qPitch);
          headBone.quaternion.copy(qTmp);
        }
        if (neckBone) {
          // The neck follows at ~35% for a more natural turn.
          qYaw.setFromAxisAngle(upAxis, curYaw * 0.35);
          qPitch.setFromAxisAngle(rightAxis, curPitch * 0.35);
          qTmp.copy(neckRest).multiply(qYaw).multiply(qPitch);
          neckBone.quaternion.copy(qTmp);
        }

        pivot.position.y = reduceMotion ? 0 : Math.sin(t * 1.1) * 0.05;

        // Blink: advance through the lid-lowering sequence.
        if (!reduceMotion && lidFrames.length && openMap) {
          if (seqIdx < 0) {
            if (now >= nextBlinkAt) {
              seq = blinkSeq();
              seqIdx = 0;
              applyMap(seq[0].map);
              phaseEnd = now + seq[0].dur;
            }
          } else if (now >= phaseEnd) {
            seqIdx += 1;
            if (seqIdx < seq.length) {
              applyMap(seq[seqIdx].map);
              phaseEnd = now + seq[seqIdx].dur;
            } else {
              applyMap(openMap);
              seqIdx = -1;
              if (burst > 0) {
                burst -= 1;
                nextBlinkAt = now + 150;
              } else {
                burst = Math.random() < 0.25 ? 1 : 0;
                nextBlinkAt = now + 2200 + Math.random() * 4000;
              }
            }
          }
        }

        renderer.render(scene, camera);
      }

      // On desktop, glide horizontally toward the active section's lane.
      // On mobile the figurine stays pinned in its corner (set in layout()).
      if (!isMobile()) {
        const targetX = anchorX(targetSide);
        curX = lerp(curX, targetX, reduceMotion ? 1 : 1 - Math.pow(0.03, dt));
        container.style.left = `${curX.toFixed(1)}px`;
      }
    };

    animate();

    const onResize = () => {
      layout();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", onResize);
      lidFrames.forEach((m) => m.dispose());
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[];
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} className="figurine" aria-hidden />;
}

type Eye = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  sr: number;
  sg: number;
  sb: number;
};

type EyeAnalysis = {
  base: Uint8ClampedArray;
  w: number;
  h: number;
  eyes: Eye[];
  src: THREE.Texture;
};

/**
 * Locates the eyes on the figurine texture (saturated-blue iris islands on the
 * fragmented Meshy UV atlas) and records, for each one, a padded eyelid box and
 * the surrounding skin colour. Returns the original pixels so lid frames can be
 * painted on top without re-decoding the image.
 */
function analyzeEyes(src: THREE.Texture): EyeAnalysis | null {
  const image = src.image as { width?: number; height?: number };
  const w = image.width ?? 0;
  const h = image.height ?? 0;
  if (!w || !h) return null;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(image as CanvasImageSource, 0, 0, w, h);

  const d = ctx.getImageData(0, 0, w, h).data;
  const n = w * h;
  const idx = (p: number) => p * 4;
  const isBlack = (i: number) => d[i] < 16 && d[i + 1] < 16 && d[i + 2] < 16;
  const isSkin = (i: number) =>
    d[i] > 70 && d[i] >= d[i + 1] && d[i + 1] >= d[i + 2] - 10 && !isBlack(i);
  const median = (a: number[]) => {
    if (!a.length) return null;
    a.sort((x, y) => x - y);
    return a[a.length >> 1];
  };

  const iris = new Uint8Array(n);
  for (let p = 0; p < n; p++) {
    const i = idx(p);
    if (d[i + 2] > 95 && d[i + 2] - d[i] > 30 && d[i + 2] - d[i + 1] > 18) {
      iris[p] = 1;
    }
  }

  const visited = new Uint8Array(n);
  const eyes: Eye[] = [];
  for (let p = 0; p < n; p++) {
    if (!iris[p] || visited[p]) continue;
    let minX = w;
    let minY = h;
    let maxX = 0;
    let maxY = 0;
    let area = 0;
    const stack = [p];
    visited[p] = 1;
    while (stack.length) {
      const q = stack.pop()!;
      const x = q % w;
      const y = (q / w) | 0;
      area++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      for (const nb of [q - 1, q + 1, q - w, q + w]) {
        if (nb < 0 || nb >= n || visited[nb] || !iris[nb]) continue;
        visited[nb] = 1;
        stack.push(nb);
      }
    }
    if (area < 8 || area > 8000) continue;

    const bw = maxX - minX + 1;
    const bh = maxY - minY + 1;
    // Pad more vertically so a fully descended lid clearly covers the eye.
    const padX = Math.round(bw * 0.45);
    const padTop = Math.round(bh * 0.85);
    const padBottom = Math.round(bh * 0.45);
    const x0 = Math.max(0, minX - padX);
    const x1 = Math.min(w - 1, maxX + padX);
    const y0 = Math.max(0, minY - (LID_FROM_TOP ? padTop : padBottom));
    const y1 = Math.min(h - 1, maxY + (LID_FROM_TOP ? padBottom : padTop));

    const ring = 6;
    const rs: number[] = [];
    const gs: number[] = [];
    const bs: number[] = [];
    for (let y = Math.max(0, y0 - ring); y <= Math.min(h - 1, y1 + ring); y++) {
      for (let x = Math.max(0, x0 - ring); x <= Math.min(w - 1, x1 + ring); x++) {
        if (x >= x0 && x <= x1 && y >= y0 && y <= y1) continue;
        const i = idx(y * w + x);
        if (isSkin(i)) {
          rs.push(d[i]);
          gs.push(d[i + 1]);
          bs.push(d[i + 2]);
        }
      }
    }
    const sr = median(rs);
    const sg = median(gs);
    const sb = median(bs);
    if (sr == null || sg == null || sb == null) continue;

    eyes.push({ minX, minY, maxX, maxY, x0, x1, y0, y1, sr, sg, sb });
  }

  if (!eyes.length) return null;
  return { base: d, w, h, eyes, src };
}

/**
 * Paints a single blink frame: for each eye the skin-coloured lid is filled from
 * the top of the eyelid box down by `coverage` (0 = open, 1 = fully closed),
 * with a dark eyelash line drawn along the lid's leading edge.
 */
function buildLidTexture(a: EyeAnalysis, coverage: number): THREE.Texture {
  const { w, h, base, src } = a;
  const d = new Uint8ClampedArray(base); // start from the untouched texture
  const idx = (p: number) => p * 4;
  const isBlack = (i: number) =>
    base[i] < 16 && base[i + 1] < 16 && base[i + 2] < 16;

  for (const e of a.eyes) {
    const boxH = e.y1 - e.y0;
    // Leading edge of the descending (or rising) lid.
    const edge = LID_FROM_TOP
      ? Math.round(e.y0 + boxH * coverage)
      : Math.round(e.y1 - boxH * coverage);
    const fillTop = LID_FROM_TOP ? e.y0 : edge;
    const fillBottom = LID_FROM_TOP ? edge : e.y1;

    for (let y = fillTop; y <= fillBottom; y++) {
      for (let x = e.x0; x <= e.x1; x++) {
        const i = idx(y * w + x);
        if (isBlack(i)) continue;
        d[i] = e.sr;
        d[i + 1] = e.sg;
        d[i + 2] = e.sb;
      }
    }

    // Eyelash line along the lid edge.
    const bw = e.maxX - e.minX + 1;
    const lh = Math.max(2, Math.round((e.maxY - e.minY + 1) * 0.18));
    const lx0 = e.minX - Math.round(bw * 0.15);
    const lx1 = e.maxX + Math.round(bw * 0.15);
    const ly0 = LID_FROM_TOP ? edge - lh : edge;
    for (let y = ly0; y < ly0 + lh; y++) {
      if (y < 0 || y >= h) continue;
      for (let x = lx0; x <= lx1; x++) {
        if (x < 0 || x >= w) continue;
        const i = idx(y * w + x);
        if (isBlack(i)) continue;
        d[i] = Math.round(e.sr * 0.35);
        d[i + 1] = Math.round(e.sg * 0.32);
        d[i + 2] = Math.round(e.sb * 0.32);
      }
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(new ImageData(d, w, h), 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = src.colorSpace;
  tex.flipY = src.flipY;
  tex.wrapS = src.wrapS;
  tex.wrapT = src.wrapT;
  tex.needsUpdate = true;
  return tex;
}
