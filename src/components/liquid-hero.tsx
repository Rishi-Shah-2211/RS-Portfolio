"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * LiquidHero — a TRANSPARENT water-ripple overlay over the hero. A
 * fullscreen shader keeps a screen-space height field of expanding ripple
 * wavefronts; where the surface is flat it is fully see-through, so the
 * hero shows through untouched. Only the wave crests render — as faint
 * light glints and soft plum troughs — so it looks like a thin sheet of
 * water laid over the page, rippling from the cursor. Render loop pauses
 * when the hero scrolls offscreen to keep scrolling smooth.
 */

const MAX = 14;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec4 uRipples[${MAX}]; // xy = centre uv, z = startTime, w = amp
  uniform int uCount;
  uniform vec3 uHi;
  uniform vec3 uLo;

  float hgt(vec2 p){
    float h = 0.0;
    for (int i = 0; i < ${MAX}; i++){
      if (i >= uCount) break;
      vec4 r = uRipples[i];
      float age = uTime - r.z;
      if (age < 0.0) continue;
      float aspect = uRes.x / uRes.y;
      vec2 c = vec2(r.x * aspect, r.y);
      float d = distance(p, c);
      float radius = age * 0.42;
      // wide envelope + long wavelength + slow temporal = gentle, glassy swells
      float env = exp(-pow((d - radius) / 0.11, 2.0)) * exp(-age * 0.9);
      h += sin((d - radius) * 20.0 - age * 1.4) * env * r.w;
    }
    return h;
  }

  void main(){
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2(vUv.x * aspect, vUv.y);
    float e = 0.0016;
    float h  = hgt(p);
    float hx = hgt(p + vec2(e, 0.0)) - hgt(p - vec2(e, 0.0));
    float hy = hgt(p + vec2(0.0, e)) - hgt(p - vec2(0.0, e));
    vec3 N = normalize(vec3(-hx, -hy, e * 6.0));
    vec3 L = normalize(vec3(0.6, 0.7, 0.55));
    float spec = pow(max(dot(N, L), 0.0), 22.0);

    // near-colourless: a faint light/dark refraction, no hue
    vec3 col = mix(uLo, uHi, clamp(0.5 + h * 2.2, 0.0, 1.0));
    col += spec * 0.6;

    // very transparent — only the crest glint reads, the page shows through
    float alpha = clamp(abs(h) * 1.1 + spec * 0.4, 0.0, 0.22);
    gl_FragColor = vec4(col, alpha);
  }
`;

function RipplePlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const ripples = useRef<{ x: number; y: number; t: number; amp: number }[]>([]);
  const uRipples = useMemo(
    () => Array.from({ length: MAX }, () => new THREE.Vector4(0, 0, -999, 0)),
    [],
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uCount: { value: 0 },
      uRipples: { value: uRipples },
      uHi: { value: new THREE.Color("#ffffff") },
      uLo: { value: new THREE.Color("#1c1518") },
    }),
    [uRipples],
  );

  useEffect(() => {
    const drop = (cx: number, cy: number, amp: number) => {
      ripples.current.push({
        x: cx / window.innerWidth,
        y: 1 - cy / window.innerHeight,
        t: performance.now() / 1000,
        amp,
      });
      if (ripples.current.length > MAX) ripples.current.shift();
    };
    let last = 0;
    const onMove = (e: PointerEvent) => {
      const n = performance.now();
      if (n - last < 80) return;
      last = n;
      drop(e.clientX, e.clientY, 0.6);
    };
    const onDown = (e: PointerEvent) => drop(e.clientX, e.clientY, 1.0);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  useFrame(() => {
    const now = performance.now() / 1000;
    ripples.current = ripples.current.filter((r) => now - r.t < 4);
    for (let i = 0; i < MAX; i++) {
      const r = ripples.current[i];
      if (r) uRipples[i].set(r.x, r.y, r.t, r.amp);
      else uRipples[i].set(0, 0, -999, 0);
    }
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = now;
      matRef.current.uniforms.uCount.value = ripples.current.length;
      (matRef.current.uniforms.uRes.value as THREE.Vector2).set(size.width, size.height);
    }
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function LiquidHero() {
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setReady(true);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!ready || !el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "80px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  // transparent overlay — the page background shows straight through
  if (!ready) return null;

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        gl={{ antialias: false, alpha: true, premultipliedAlpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
      >
        <RipplePlane />
      </Canvas>
    </div>
  );
}
