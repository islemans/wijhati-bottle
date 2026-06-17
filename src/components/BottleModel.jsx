import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import scrollStore from '../scrollStore';
import {
  InoxBody,
  SmartCap,
  SmartStorageBase,
} from './BottleParts';

export default function BottleModel() {
  const groupRef = useRef();
  const capRef = useRef();
  const bodyRef = useRef();
  const baseRef = useRef();

  const anim = useRef({
    rotY: 0,
    rotX: 0,
    capY: 0,
    baseY: 0,
    posX: 0,
    scale: 1,
    floatOffset: 0,
  });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const a = anim.current;
    const lerp = (curr, target, speed) =>
      curr + (target - curr) * Math.min(speed * delta * 60, 1);

    const section = scrollStore.activeSection;
    const explode = scrollStore.explodeProgress;
    let targetRotY;
    let targetRotX;
    let targetCapY = 0;
    let targetBaseY = 0;
    let targetPosX = 0;
    let targetScale = 1;

    if (section === 'hero') {
      targetRotY = scrollStore.mouseX * 0.4;
      targetRotX = scrollStore.mouseY * -0.15;
    } else if (section === 'exploded') {
      const eased = 1 - Math.pow(1 - Math.min(explode * 1.8, 1), 3);
      targetRotY = state.clock.elapsedTime * 0.12;
      targetRotX = -0.08;
      targetCapY = eased * 1.75;
      targetBaseY = eased * -1.55;
      targetScale = 0.84;
    } else {
      targetRotY = state.clock.elapsedTime * 0.18;
      targetRotX = -0.04;
      targetPosX = 1.35;
      targetScale = 0.92;
    }

    a.rotY = lerp(a.rotY, targetRotY, 0.06);
    a.rotX = lerp(a.rotX, targetRotX, 0.06);
    a.capY = lerp(a.capY, targetCapY, 0.05);
    a.baseY = lerp(a.baseY, targetBaseY, 0.05);
    a.posX = lerp(a.posX, targetPosX, 0.04);
    a.scale = lerp(a.scale, targetScale, 0.05);
    a.floatOffset = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;

    groupRef.current.rotation.y = a.rotY;
    groupRef.current.rotation.x = a.rotX;
    groupRef.current.position.x = a.posX;
    groupRef.current.position.y = a.floatOffset;
    groupRef.current.scale.setScalar(a.scale);

    if (capRef.current) capRef.current.position.y = 1.66 + a.capY;
    if (bodyRef.current) bodyRef.current.position.y = 0;
    if (baseRef.current) baseRef.current.position.y = -1.7 + a.baseY;
  });

  return (
    <group ref={groupRef}>
      <group ref={capRef} position={[0, 1.66, 0]}>
        <SmartCap />
      </group>

      <group ref={bodyRef} position={[0, 0, 0]}>
        <InoxBody />
      </group>

      <group ref={baseRef} position={[0, -1.7, 0]}>
        <SmartStorageBase />
      </group>
    </group>
  );
}
