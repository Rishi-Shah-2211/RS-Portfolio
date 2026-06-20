"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * LiquidHero — a full-screen flowing-ink shader behind the hero. Domain-
 * warped fractal noise drifts like liquid metal; the cursor pushes a warm
 * swell through it that slowly relaxes. Theme-aware: reads the live
 * --color-* CSS variables so it recolours with the day/night toggle.
 * One fullscreen triangle, one draw call. Reduced-motion → static wash.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;     // 0..1, smoothed
  uniform float uMouseStr; // swell strength
  uniform vec2 uRes;
  uniform vec3 uBase;
  uniform vec3 uMid;
  uniform vec3 uAccent;

  // hash + value noise
  vec2 hash22(vec2 p){
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(dot(hash22(i+vec2(0,0)), f-vec2(0,0)),
                   dot(hash22(i+vec2(1,0)), f-vec2(1,0)), u.x),
               mix(dot(hash22(i+vec2(0,1)), f-vec2(0,1)),
                   dot(hash22(i+vec2(1,1)), f-vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p*=2.0; a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float agp = uRes.x / uRes.y;
    vec2 p = uv; p.x *= agp;

    float t = uTime * 0.05;

    // mouse swell pushes the field outward
    vec2 m = uMouse; m.x *= agp;
    float md = distance(p, m);
    float swell = exp(-md * 3.2) * uMouseStr;

    // domain warp — the "liquid" flow
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
    vec2 r = vec2(fbm(p + 2.0*q + vec2(1.7, 9.2) + t*0.6),
                  fbm(p + 2.0*q + vec2(8.3, 2.8) - t*0.5));
    float f = fbm(p + 3.0*r + swell * 1.4);

    f = f * 0.5 + 0.5;
    f = clamp(f + swell * 0.5, 0.0, 1.0);

    vec3 col = mix(uBase, uMid, smoothstep(0.25, 0.6, f));
    col = mix(col, uAccent, smoothstep(0.62, 0.95, f) * (0.55 + swell));

    // soft vignette
    float vig = smoothstep(1.25, 0.35, distance(uv, vec2(0.5)));
    col *= 0.82 + 0.18 * vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function readVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function Plane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const strength = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseStr: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uBase: { value: new THREE.Color("#fbfaf7") },
      uMid: { value: new THREE.Color("#e7ecf6") },
      uAccent: { value: new THREE.Color("#233a72") },
    }),
    [],
  );

  // re-read theme colours when the .dark class flips
  useEffect(() => {
    const sync = () => {
      uniforms.uBase.value.set(readVar("--color-cream", "#fbfaf7"));
      uniforms.uMid.value.set(readVar("--color-cream-dim", "#e7ecf6"));
      uniforms.uAccent.value.set(readVar("--color-terracotta", "#233a72"));
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [uniforms]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
      strength.current = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uRes.value.set(size.width, size.height);
    mouse.current.lerp(target.current, 0.06);
    u.uMouse.value.copy(mouse.current);
    strength.current = Math.max(0, strength.current - delta * 0.5);
    u.uMouseStr.value += (strength.current - u.uMouseStr.value) * 0.1;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
}

export default function LiquidHero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="absolute inset-0 -z-10 bg-cream" aria-hidden />;
  }

  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
      >
        <Plane />
      </Canvas>
      {/* readability wash so headline type stays crisp */}
      <div className="absolute inset-0 bg-cream/35" />
    </div>
  );
}
