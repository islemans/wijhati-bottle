import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import scrollStore from '../scrollStore';
import {
  BottleBody,
  StandardLid,
  GymCap,
  FilterCap,
  HerbInfuser,
  StandardBase,
  CompassBase,
  EmergencyBase,
} from './BottleParts';

/*
 * ═══════════════════════════════════════════════════════════════════
 *  HOW TO REPLACE WITH YOUR ACTUAL .GLB MODEL
 * ═══════════════════════════════════════════════════════════════════
 *
 *  1. Place your exported Blender file at:   public/bottle.glb
 *
 *  2. In Blender, name the top-level objects by module so useGLTF
 *     can find them:
 *       - "Body"         → main body cylinder + grip + QR + LED
 *       - "StandardLid"  → default sip lid
 *       - "GymCap"       → gym cap with phone holder
 *       - "FilterCap"    → water filtration cap
 *       - "HerbInfuser"  → internal strainer basket
 *       - "StandardBase" → default base cap
 *       - "CompassBase"  → compass module
 *       - "EmergencyBase"→ emergency storage module
 *
 *  3. Add these imports at the top of this file:
 *
 *       import { useGLTF } from '@react-three/drei';
 *
 *  4. Inside the component, load the model:
 *
 *       const { nodes, materials } = useGLTF('/bottle.glb');
 *
 *  5. Replace each <BottlePart /> with the real mesh. For example:
 *
 *       BEFORE:  <BottleBody />
 *       AFTER:   <primitive object={nodes.Body} />
 *
 *     Or for more control over materials:
 *
 *       <mesh
 *         geometry={nodes.Body.geometry}
 *         material={materials.BodyMaterial}
 *         castShadow
 *         receiveShadow
 *       />
 *
 *  6. The group refs (lidGroupRef, bodyGroupRef, baseGroupRef, etc.)
 *     and the animation logic in useFrame() stay EXACTLY the same.
 *     Just nest the real meshes inside the same <group ref={...}>.
 *
 *  7. Optionally preload for instant display:
 *
 *       useGLTF.preload('/bottle.glb');
 *
 * ═══════════════════════════════════════════════════════════════════
 */

/**
 * Assembled bottle with scroll-driven explosion, mouse-follow parallax,
 * and real-time configurator module swaps.
 *
 * Animation is driven by the mutable `scrollStore` (written by GSAP,
 * read here in useFrame) so there are zero React re-renders during scroll.
 */
export default function BottleModel() {
  const groupRef = useRef();
  const lidGroupRef = useRef();
  const bodyGroupRef = useRef();
  const infuserGroupRef = useRef();
  const baseGroupRef = useRef();

  /* ── Smooth animation state (lerped every frame, never causes re-render) ── */
  const anim = useRef({
    rotY: 0,
    rotX: 0,
    lidY: 0,
    baseY: 0,
    infuserY: 0,
    posX: 0,
    scale: 1,
    floatOffset: 0,
  });

  /* ── Configuration: always use default (standard top, standard base) ── */
  const activeConfig = { top: 'standard', base: 'standard' };

  /* ── Per-frame animation loop ── */
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const a = anim.current;
    const lerp = (curr, target, speed) =>
      curr + (target - curr) * Math.min(speed * delta * 60, 1);

    const section = scrollStore.activeSection;
    const explode = scrollStore.explodeProgress;

    /* ── Compute targets based on current section ── */
    let targetRotY, targetRotX, targetLidY, targetBaseY, targetInfuserY;
    let targetPosX = 0;
    let targetScale = 1;

    if (section === 'hero') {
      // Mouse-follow rotation (additive to PresentationControls drag)
      targetRotY = scrollStore.mouseX * 0.4;
      targetRotX = scrollStore.mouseY * -0.15;
      targetLidY = 0;
      targetBaseY = 0;
      targetInfuserY = 0;
    } else if (section === 'exploded') {
      // Scroll-driven explosion with eased progress
      const eased = easeOutCubic(Math.min(explode * 1.8, 1));
      targetRotY = state.clock.elapsedTime * 0.12;
      targetRotX = -0.08;
      targetLidY = eased * 2.0;
      targetBaseY = eased * -1.8;
      targetInfuserY = eased * 0.7;
      targetScale = 0.82;      // Scale down so exploded parts stay in frame
    } else {
      // Configurator: gentle auto-rotate, shift right for control panel
      targetRotY = state.clock.elapsedTime * 0.18;
      targetRotX = -0.04;
      targetLidY = 0;
      targetBaseY = 0;
      targetInfuserY = 0;
      targetPosX = 1.6;
      targetScale = 0.88;
    }

    /* ── Smoothly interpolate all values ── */
    a.rotY = lerp(a.rotY, targetRotY, 0.06);
    a.rotX = lerp(a.rotX, targetRotX, 0.06);
    a.lidY = lerp(a.lidY, targetLidY, 0.05);
    a.baseY = lerp(a.baseY, targetBaseY, 0.05);
    a.infuserY = lerp(a.infuserY, targetInfuserY, 0.05);
    a.posX = lerp(a.posX, targetPosX, 0.04);
    a.scale = lerp(a.scale, targetScale, 0.05);

    // Gentle idle floating
    a.floatOffset = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;

    /* ── Apply transforms to the groups ── */
    groupRef.current.rotation.y = a.rotY;
    groupRef.current.rotation.x = a.rotX;
    groupRef.current.position.x = a.posX;
    groupRef.current.position.y = a.floatOffset;
    groupRef.current.scale.setScalar(a.scale);

    if (lidGroupRef.current) {
      lidGroupRef.current.position.y = 1.72 + a.lidY;
    }

    if (baseGroupRef.current) {
      baseGroupRef.current.position.y = -1.38 + a.baseY;
    }

    if (infuserGroupRef.current) {
      infuserGroupRef.current.position.y = 0.3 + a.infuserY;
      const infuserShow = section === 'exploded' ? Math.min(explode * 2.5, 1) : 0;
      infuserGroupRef.current.visible = infuserShow > 0.05;
    }
  });

  return (
    <group ref={groupRef}>

      {/* ── Top Module ──
       * Swap placeholder with:  <primitive object={nodes.StandardLid} />  etc.
       */}
      <group ref={lidGroupRef} position={[0, 1.72, 0]}>
        {activeConfig.top === 'standard' && <StandardLid />}
        {activeConfig.top === 'gym' && <GymCap />}
        {activeConfig.top === 'filter' && <FilterCap />}
      </group>

      {/* ── Main Body ──
       * Swap placeholder with:  <primitive object={nodes.Body} />
       */}
      <group ref={bodyGroupRef}>
        <BottleBody />
      </group>

      {/* ── Internal: Herb Infuser (visible only during explode) ──
       * Swap placeholder with:  <primitive object={nodes.HerbInfuser} />
       */}
      <group ref={infuserGroupRef} position={[0, 0.3, 0]} visible={false}>
        <HerbInfuser />
      </group>

      {/* ── Base Module ──
       * Swap placeholder with:  <primitive object={nodes.StandardBase} />  etc.
       */}
      <group ref={baseGroupRef} position={[0, -1.38, 0]}>
        {activeConfig.base === 'standard' && <StandardBase />}
        {activeConfig.base === 'compass' && <CompassBase />}
        {activeConfig.base === 'emergency' && <EmergencyBase />}
      </group>

    </group>
  );
}

/** Cubic ease-out for smoother explosion ramp */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
