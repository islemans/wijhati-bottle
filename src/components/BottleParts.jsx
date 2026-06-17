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

      {/* Temperature sensor core — shiny steel cylinder */}
      <mesh position={[0, -0.115, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.03, 32]} />
        <meshPhysicalMaterial color="#c0c0c0" metalness={1} roughness={0.15} envMapIntensity={1.5} />
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

      {/* Inner stainless steel wall — open tube, hyper-reflective */}
      <mesh position={[0, 0.005, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.48, 3.09, 160, 1, true]} />
        <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0.05} clearcoat={1} side={2} envMapIntensity={1.8} />
      </mesh>

      {/* Gold separator rings */}
      <mesh position={[0, 1.535, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.505, 0.505, 0.018, 160, 1]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
      </mesh>

      <mesh position={[0, -1.535, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.505, 0.505, 0.018, 160, 1]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
      </mesh>

      <Text
        position={[0, -1.04, 0.506]}
        fontSize={0.22}
        anchorX="center"
        anchorY="middle"
        color="#D4AF37"
      >
        W
        <meshPhysicalMaterial color="#D4AF37" metalness={0.78} roughness={0.24} clearcoat={0.18} clearcoatRoughness={0.3} envMapIntensity={1.15} />
      </Text>

      <Text
        position={[0, -1.2, 0.51]}
        fontSize={0.12}
        letterSpacing={0.06}
        anchorX="center"
        anchorY="middle"
        color="#D4AF37"
        rotation={[0, 0, 0]}
      >
        Wijhati
        <meshPhysicalMaterial color="#D4AF37" metalness={0.78} roughness={0.24} clearcoat={0.18} clearcoatRoughness={0.3} envMapIntensity={1.15} />
      </Text>
    </group>
  );
}

export function SmartStorageBase(props) {
  return (
    <group {...props}>
      {/* Wall — open-ended cylinder so interior is a visible cavity */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.505, 0.505, 0.34, 64, 1, true]} />
        <meshPhysicalMaterial {...inoxMaterial} side={2} />
      </mesh>

      {/* Floor — solid disc at the bottom of the wall */}
      <mesh position={[0, -0.17, 0]} castShadow>
        <cylinderGeometry args={[0.505, 0.505, 0.02, 64]} />
        <meshPhysicalMaterial {...inoxMaterial} />
      </mesh>
    </group>
  );
}
