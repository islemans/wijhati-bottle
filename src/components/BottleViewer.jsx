import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  OrbitControls,
} from '@react-three/drei';
import BottleModel from './BottleModel';

const MODES = [
  { id: 'default', label: 'Everyday', icon: '☕' },
  { id: 'gym', label: 'Gym', icon: '💪' },
  { id: 'survival', label: 'Survival', icon: '🧭' },
  { id: 'explorer', label: 'Explorer', icon: '🗝️' },
];

export default function BottleViewer({ onBack }) {
  const [configMode, setConfigMode] = useState('default');
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef();

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--color-cream)',
    }}>
      <Canvas
        camera={{ position: [0, 0.3, 6], fov: 30 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: 3 }}
        style={{ background: 'transparent' }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} color="#f5efe6" />
          <directionalLight
            position={[10, 10, 5]} intensity={1.8} color="#fff8ee"
            castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}
          />
          <directionalLight position={[-6, 4, -4]} intensity={0.7} color="#c2d4ff" />
          <pointLight position={[0, 4, -6]} intensity={1.2} color="#C2A878" />
          <pointLight position={[0, -3, 3]} intensity={0.4} color="#f5efe6" />
          <Environment preset="warehouse" environmentIntensity={0.6} />
          <ContactShadows
            position={[0, -2.6, 0]} opacity={0.4} scale={10}
            blur={2} far={4} color="#1A3626"
          />
          <BottleModel configMode={configMode} />
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={12}
            minPolarAngle={-Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            autoRotate={autoRotate}
            autoRotateSpeed={4}
            enableDamping
            dampingFactor={0.08}
          />
        </Suspense>
      </Canvas>

      <div className="grain-overlay" />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '20px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(245,244,240,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(194,168,120,0.15)',
            borderRadius: '60px',
            padding: '10px 24px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-family-sans)',
            fontWeight: 600, fontSize: '0.85rem',
            color: 'var(--color-forest)',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => { e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; }}
          onMouseLeave={(e) => { e.target.style.boxShadow = 'none'; }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          background: 'rgba(245,244,240,0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(194,168,120,0.15)',
          borderRadius: '60px',
          padding: '6px 6px 6px 20px',
        }}>
          <span style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--color-forest)',
            opacity: 0.5,
          }}>
            Auto-Rotate
          </span>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            style={{
              width: '40px', height: '24px', borderRadius: '12px',
              border: 'none', cursor: 'pointer', position: 'relative',
              transition: 'background 0.3s',
              background: autoRotate ? 'var(--color-forest)' : 'rgba(0,0,0,0.12)',
            }}
          >
            <div style={{
              width: '18px', height: '18px', borderRadius: '50%',
              background: 'white', position: 'absolute', top: '3px',
              transition: 'left 0.3s',
              left: autoRotate ? '19px' : '3px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            }} />
          </button>
        </div>
      </div>

      {/* Bottom: configurator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: '32px',
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{
          display: 'flex', gap: '8px',
          background: 'rgba(245,244,240,0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(194,168,120,0.15)',
          borderRadius: '16px',
          padding: '8px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
        }}>
          {MODES.map((mode) => {
            const active = configMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setConfigMode(mode.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-family-sans)',
                  fontWeight: 600, fontSize: '0.8rem',
                  color: active ? 'var(--color-cream)' : 'var(--color-forest)',
                  background: active ? 'var(--color-forest)' : 'transparent',
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.target.style.background = 'rgba(26,54,38,0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{mode.icon}</span>
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      <div style={{
        position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, textAlign: 'center',
        fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: 'var(--color-forest)',
        opacity: 0.3, pointerEvents: 'none',
      }}>
        {autoRotate ? 'Drag to orbit · Scroll to zoom' : 'Drag to orbit · Scroll to zoom'}
      </div>
    </div>
  );
}
