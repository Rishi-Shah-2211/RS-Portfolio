"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";

/**
 * DistortImage — a screenshot rendered on a WebGL plane that ripples away
 * from the cursor with a subtle RGB split while hovered, then settles.
 * Falls back to a plain <img> on touch devices / reduced motion.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform float uImgAspect;
  uniform float uPlaneAspect;
  varying vec2 vUv;

  void main() {
    // object-fit: cover
    vec2 uv = vUv;
    float r = uPlaneAspect / uImgAspect;
    if (r > 1.0) {
      uv.y = uv.y / r + (1.0 - 1.0 / r) * 0.5;
    } else {
      uv.x = uv.x * r + (1.0 - r) * 0.5;
    }

    float dist = distance(vUv, uMouse);
    float influence = smoothstep(0.45, 0.0, dist) * uHover;
    float wave = sin(dist * 28.0 - uTime * 4.5) * 0.018 * influence;
    vec2 dir = normalize(vUv - uMouse + 0.0001);
    vec2 off = dir * wave;

    float rr = texture2D(uTex, uv + off * 1.6).r;
    float gg = texture2D(uTex, uv + off).g;
    float bb = texture2D(uTex, uv + off * 0.4).b;
    gl_FragColor = vec4(rr, gg, bb, 1.0);
  }
`;

function Plane({
  src,
  hoverRef,
  mouseRef,
}: {
  src: string;
  hoverRef: MutableRefObject<number>;
  mouseRef: MutableRefObject<{ x: number; y: number }>;
}) {
  const tex = useLoader(THREE.TextureLoader, src);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTex: { value: tex },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uImgAspect: { value: tex.image.width / tex.image.height },
      uPlaneAspect: { value: 16 / 10 },
    }),
    [tex],
  );

  useFrame((state, delta) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uHover.value = THREE.MathUtils.lerp(u.uHover.value, hoverRef.current, 0.08);
    const m = u.uMouse.value as THREE.Vector2;
    m.lerp(new THREE.Vector2(mouseRef.current.x, mouseRef.current.y), 0.12);
    u.uPlaneAspect.value = viewport.width / viewport.height;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
}

export default function DistortImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [webgl, setWebgl] = useState(false);
  const hoverRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setWebgl(fine && motionOk);
  }, []);

  if (!webgl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} loading="lazy" />
    );
  }

  return (
    <div
      className={`h-full w-full ${className}`}
      onPointerEnter={() => (hoverRef.current = 1)}
      onPointerLeave={() => (hoverRef.current = 0)}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseRef.current = {
          x: (e.clientX - r.left) / r.width,
          y: 1 - (e.clientY - r.top) / r.height,
        };
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1], fov: 50 }}
        orthographic={false}
        resize={{ scroll: false }}
      >
        <Suspense fallback={null}>
          <Plane src={src} hoverRef={hoverRef} mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
