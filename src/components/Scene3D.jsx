import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  Center,
  PresentationControls,
} from '@react-three/drei';
import BottleModel from './BottleModel';

/**
 * Full-screen R3F canvas with premium lighting, environment reflections,
 * contact shadows, and user interaction controls.
 *
 * The Canvas stays fixed behind all HTML content.
 */
export default function Scene3D() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0.3, 8], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: 3 /* ACESFilmic */ }}
        style={{ background: 'transparent' }}
        shadows
      >
        <Suspense fallback={null}>
          {/* ─── Lighting Rig ─── */}

          {/* Soft ambient fill — warm to complement the forest green */}
          <ambientLight intensity={0.6} color="#f5efe6" />

          {/* Key light — strong warm directional from upper-right */}
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.8}
            color="#fff8ee"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={30}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
          />

          {/* Fill light — cooler blue from the left to add dimension */}
          <directionalLight
            position={[-6, 4, -4]}
            intensity={0.7}
            color="#c2d4ff"
          />

          {/* Rim / accent light — warm gold from behind */}
          <pointLight
            position={[0, 4, -6]}
            intensity={1.2}
            color="#C2A878"
            distance={20}
            decay={2}
          />

          {/* Low fill to lighten the shadows underneath */}
          <pointLight
            position={[0, -3, 3]}
            intensity={0.4}
            color="#f5efe6"
            distance={12}
            decay={2}
          />

          {/* ─── Environment Map for Realistic Reflections ─── */}
          {/* "warehouse" gives great metallic reflections on stainless steel */}
          <Environment preset="warehouse" environmentIntensity={0.6} />

          {/* ─── Contact Shadow — grounds the bottle visually ─── */}
          <ContactShadows
            position={[0, -2.6, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
            color="#1A3626"
          />

          {/* ─── Presentation Controls — drag to rotate the bottle ─── */}
          {/*
            PresentationControls wraps the bottle so users can grab & spin it.
            - `global` means you can drag anywhere on the canvas, not just on the mesh.
            - `polar` limits vertical tilt so the bottle doesn't flip upside-down.
            - `azimuth` limits horizontal rotation to a natural range.
            - `snap` gently returns the bottle to rest when released.
            - The spring `config` gives a weighty, premium feel.
            - `cursor` keeps a grab cursor while hovering/dragging.
            
            NOTE: This does NOT conflict with GSAP ScrollTrigger because
            PresentationControls only intercepts pointer drag events,
            while GSAP reads the scroll position from the document.
            Touch devices: scroll is on the Y axis, rotation is on drag,
            so they coexist naturally.
          */}
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 200 }}
            cursor={true}
          >
            {/* ─── Center — guarantees the bottle stays aligned ─── */}
            {/*
              <Center> from drei auto-computes the bounding box of all
              children and offsets them so the group's origin sits dead-center.
              This means even when you swap in a .glb with a different origin,
              the bottle will stay properly framed.
            */}
            <Center>
              <BottleModel />
            </Center>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
