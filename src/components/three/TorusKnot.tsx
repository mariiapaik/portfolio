"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  /** "hero" = large faint knot, "ornament" = small bright knot */
  variant?: "hero" | "ornament";
};

export default function TorusKnot({ variant = "hero" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const isHero = variant === "hero";
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || (isHero ? 800 : 220);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    );
    // Pull the camera back so the knot sits with padding inside the frame
    // and never clips its container as it rotates.
    camera.position.z = isHero ? 6 : 6.8;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      // No WebGL context available — degrade gracefully (no 3D ornament).
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = isHero
      ? new THREE.TorusKnotGeometry(2.2, 0.6, 150, 20)
      : new THREE.TorusKnotGeometry(1.1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: isHero ? 0.3 : 0.5,
      wireframe: true,
      transparent: true,
      opacity: isHero ? 0.4 : 0.7,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const pointLight = new THREE.PointLight(0x00f0ff, isHero ? 1.5 : 1.2);
    pointLight.position.set(isHero ? 10 : 5, isHero ? 10 : 5, isHero ? 10 : 5);
    scene.add(pointLight);
    scene.add(new THREE.AmbientLight(0xffffff, isHero ? 0.1 : 0.2));

    // Autonomous slow, slightly chaotic rotation — no cursor interaction.
    // Different per-axis rates + gentle drifting wobble keep it from looking
    // like a clean mechanical spin.
    const base = isHero ? 0.0009 : 0.0011;
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = Date.now() * 0.0001;
      mesh.rotation.x += base * (1 + 0.4 * Math.sin(t * 0.7));
      mesh.rotation.y += base * 1.3 * (1 + 0.4 * Math.cos(t * 0.5));
      mesh.rotation.z += base * 0.5 * (1 + 0.3 * Math.sin(t * 0.9));
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || (isHero ? 800 : 220);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return <div ref={ref} className="knot-canvas" aria-hidden />;
}
