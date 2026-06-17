import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const INOX_GREEN = '#12261E';
const CAP_BLACK = '#101214';
const GOLD = '#D4AF37';
const LED = '#8fffd5';

const inoxMaterial = {
  color: INOX_GREEN,
  metalness: 0.6,
  roughness: 0.4,
  clearcoat: 0.3,
  clearcoatRoughness: 0.38,
  envMapIntensity: 1.15,
};

const capMaterial = {
  color: CAP_BLACK,
  metalness: 0.62,
  roughness: 0.4,
  clearcoat: 0.22,
  clearcoatRoughness: 0.34,
  envMapIntensity: 1.1,
};

const goldMaterial = {
  color: GOLD,
  metalness: 0.78,
  roughness: 0.24,
  clearcoat: 0.18,
  clearcoatRoughness: 0.3,
  envMapIntensity: 1.15,
};

export function SmartCap(props) {
  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.54, 0.54, 0.24, 160, 1]} />
        <meshPhysicalMaterial {...capMaterial} />
      </mesh>

      <mesh position={[0, 0.126, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.36, 160]} />
        <meshPhysicalMaterial
          color="#050606"
          metalness={0.18}
          roughness={0.48}
          clearcoat={0.35}
          clearcoatRoughness={0.18}
          emissive="#06120e"
          emissiveIntensity={0.3}
        />
      </mesh>

      <SmartTemperatureText position={[0, 0.134, 0]} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}

function SmartTemperatureText(props) {
  const displayRef = useRef();

  useFrame((state) => {
    if (displayRef.current) {
      displayRef.current.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.16;
    }
  });

  return (
    <Text
      {...props}
      fontSize={0.11}
      letterSpacing={0.03}
      anchorX="center"
      anchorY="middle"
      color={LED}
    >
      22°C
      <meshPhysicalMaterial
        ref={displayRef}
        color={LED}
        emissive={LED}
        emissiveIntensity={1}
        toneMapped={false}
      />
    </Text>
  );
}

export function InoxBody(props) {
  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 3.08, 160, 1]} />
        <meshPhysicalMaterial {...inoxMaterial} />
      </mesh>

      <mesh position={[0, 1.535, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.505, 0.505, 0.018, 160, 1]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
      </mesh>

      <mesh position={[0, -1.535, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.505, 0.505, 0.018, 160, 1]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
      </mesh>

      <Text
        position={[0, 0.15, 0.51]}
        fontSize={0.18}
        letterSpacing={0.04}
        anchorX="center"
        anchorY="middle"
        color={GOLD}
      >
        Wijhati
        <meshPhysicalMaterial {...goldMaterial} />
      </Text>

      <Text
        position={[0, -1.04, 0.506]}
        fontSize={0.22}
        anchorX="center"
        anchorY="middle"
        color={GOLD}
      >
        W
        <meshPhysicalMaterial {...goldMaterial} />
      </Text>

      <Text
        position={[0, -1.2, 0.506]}
        fontSize={0.08}
        anchorX="center"
        anchorY="middle"
        color={GOLD}
      >
        Wijhati
        <meshPhysicalMaterial {...goldMaterial} />
      </Text>
    </group>
  );
}

export function SmartStorageBase(props) {
  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.505, 0.505, 0.34, 160, 1]} />
        <meshPhysicalMaterial {...inoxMaterial} />
      </mesh>
    </group>
  );
}
