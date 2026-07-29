"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * HeroSculpture — a glossy plum torus-knot turning inside a thin gold ring,
 * with the stack orbiting around it in 3D. Gloss comes from a procedural
 * studio environment map built on a canvas (no HDRI download), so the metal
 * carries real highlights and reflections. Desktop only, pauses when the
 * hero scrolls away, and sits out entirely under reduced motion.
 */

const STACK = [
  "TypeScript",
  "Next.js",
  "Postgres",
  "Three.js",
  "Prisma",
  "ONNX",
  "Python",
  "Supabase",
];

/** shared smoothed pointer, -1..1 on each axis */
const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

function StudioEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 256;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, "#ffffff");
    g.addColorStop(0.35, "#f0e6ec");
    g.addColorStop(0.62, "#b98e6a");
    g.addColorStop(1, "#2a1520");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 256);
    // two soft light strips → the highlights that read as gloss
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillRect(0, 18, 64, 26);
    ctx.fillStyle = "rgba(216,188,203,0.75)";
    ctx.fillRect(0, 120, 64, 14);

    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromEquirectangular(tex).texture;
    scene.environment = env;

    return () => {
      scene.environment = null;
      env.dispose();
      tex.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Knot() {
  const knot = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;

    if (knot.current) {
      knot.current.rotation.y += d * 0.26;
      knot.current.rotation.x += d * 0.1;
      knot.current.rotation.z +=
        (pointer.x * 0.35 - knot.current.rotation.z) * 0.05;
      knot.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.06;
    }
    if (ring.current) ring.current.rotation.z += d * 0.14;

    const cam = state.camera;
    cam.position.x += (pointer.x * 0.55 - cam.position.x) * 0.05;
    cam.position.y += (-pointer.y * 0.45 - cam.position.y) * 0.05;
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.05, 0.34, 220, 34]} />
        <meshPhysicalMaterial
          color="#6e2746"
          metalness={0.96}
          roughness={0.11}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.6}
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI * 0.42, 0, 0]}>
        <torusGeometry args={[1.85, 0.022, 16, 150]} />
        <meshPhysicalMaterial
          color="#ad8754"
          metalness={1}
          roughness={0.18}
          envMapIntensity={1.8}
        />
      </mesh>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 4]} intensity={1.5} />
      <directionalLight position={[-4, -2, 2]} intensity={0.8} color="#d8bccb" />
    </>
  );
}

function StackOrbit({ running }: { running: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !running) return;
    const chips = Array.from(el.children) as HTMLElement[];
    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.0045;
      const r = el.getBoundingClientRect();
      const R = Math.min(r.width, r.height) * 0.44;
      chips.forEach((c, i) => {
        const a = t * 1.5 + (i / chips.length) * Math.PI * 2;
        const x = Math.cos(a);
        const z = Math.sin(a);
        const s = 0.66 + 0.34 * ((z + 1) / 2);
        const op = 0.2 + 0.7 * ((z + 1) / 2);
        c.style.transform = `translate(-50%,-50%) translate(${x * R * 1.35}px, ${
          Math.sin(a * 1.7) * R * 0.3
        }px) scale(${s})`;
        c.style.opacity = String(op);
        c.style.zIndex = String(Math.round(z * 10) + 10);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0" aria-hidden>
      {STACK.map((s) => (
        <span
          key={s}
          className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-terracotta/20 bg-white/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink backdrop-blur-[2px] will-change-transform"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export default function HeroSculpture() {
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [ready]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!ready || !el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "80px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  if (!ready) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute left-[64%] top-[46%] z-0 hidden h-[32vw] max-h-[460px] w-[32vw] max-w-[460px] -translate-x-1/2 -translate-y-1/2 md:block"
    >
      <Canvas
        dpr={[1, 1.6]}
        frameloop={inView ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
      >
        <StudioEnv />
        <Knot />
      </Canvas>
      <StackOrbit running={inView} />
    </div>
  );
}
