import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  OrbitControls,
  SpotLight,
} from '@react-three/drei';
import BottleModel from './BottleModel';
import SceneErrorBoundary from './SceneErrorBoundary';

const FEATURE_CALLOUTS = [
  {
    title: 'Smart Touch Display',
    text: "Instantly know your water's temperature with a single tap.",
    className: 'left-6 top-[18%] md:left-16 xl:left-24',
  },
  {
    title: 'Premium Stainless Steel',
    text: 'Double-wall vacuum insulation keeps drinks icy cold or piping hot for 24 hours.',
    className: 'right-6 top-[44%] md:right-16 xl:right-24',
  },
  {
    title: 'Phygital Integration',
    text: 'Your physical companion, connected to your digital journey.',
    className: 'left-6 bottom-[16%] md:left-16 xl:left-24',
  },
];

export default function BottleViewer({ onBack }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef();

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.16),rgba(5,5,5,0)_34%),linear-gradient(180deg,#0b0b0c_0%,#050505_100%)]" />

      <SceneErrorBoundary>
        <Canvas
          camera={{ position: [0, 0.36, 6], fov: 30 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, toneMapping: 3 }}
          className="relative z-0"
          shadows
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.24} color="#ffffff" />
            <directionalLight
              position={[5, 7, 5]}
              intensity={1.45}
              color="#fff6ea"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <directionalLight position={[-5, 2, 4]} intensity={0.9} color="#dbe8ff" />
            <SpotLight
              position={[0, 4.2, -4.8]}
              angle={0.48}
              penumbra={0.72}
              intensity={4.4}
              distance={9}
              color="#ffffff"
              castShadow
            />
            <pointLight position={[0, 3.8, -4]} intensity={1.8} color="#ffffff" distance={10} decay={2} />
            <pointLight position={[2.8, 0.8, 2]} intensity={0.7} color="#7dffcf" distance={7} decay={2} />
            <Environment preset="city" environmentIntensity={1.2} />
            <ContactShadows
              position={[0, -2.62, 0]}
              opacity={0.48}
              scale={8}
              blur={2.8}
              far={4}
              color="#000000"
            />
            <BottleModel />
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom
              minDistance={2.5}
              maxDistance={12}
              minPolarAngle={-Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              autoRotate={autoRotate}
              autoRotateSpeed={2.2}
              enableDamping
              dampingFactor={0.08}
            />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>

      <div className="grain-overlay" />

      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
        {FEATURE_CALLOUTS.map((feature, index) => (
          <div
            key={feature.title}
            className={`animate-premium-fade absolute flex max-w-[330px] flex-col gap-3 text-white/90 ${feature.className}`}
            style={{
              animationDelay: `${180 + index * 140}ms`,
              textShadow: '0 2px 18px rgba(0,0,0,0.42)',
            }}
          >
            <p
              className="text-2xl font-normal leading-tight tracking-wide text-white/90"
              style={{ fontFamily: 'var(--font-family-serif)' }}
            >
              {feature.title}
            </p>
            <p className="font-sans text-sm font-light leading-6 tracking-wide text-white/58">
              {feature.text}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-sans text-xs font-light uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 py-2 pl-5 pr-2 font-sans text-white/70 backdrop-blur-sm">
          <span className="text-[0.68rem] font-light uppercase tracking-[0.24em]">Auto</span>
          <button
            onClick={() => setAutoRotate((value) => !value)}
            aria-label="Toggle auto-rotate"
            className={`relative h-6 w-10 rounded-full transition ${autoRotate ? 'bg-white/80' : 'bg-white/15'}`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-black transition ${autoRotate ? 'left-5' : 'left-1'}`}
            />
          </button>
        </div>
      </div>

      <div className="animate-premium-fade pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 font-sans text-[0.68rem] font-light uppercase tracking-[0.28em] text-white/35">
        Drag to orbit - Scroll to zoom
      </div>
    </div>
  );
}
