import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Shared Materials ─── */
const FOREST_GREEN = '#1A3626';
const FOREST_LIGHT = '#2A5640';
const SAND_GOLD = '#C2A878';
const DARK_RUBBER = '#1a1a1a';
const STEEL_SILVER = '#8a8a8a';
const LED_GREEN = '#00ff99';

/**
 * Main bottle body — tall stainless steel cylinder with spiral grip pattern.
 * Matches the design from the product photos with wrapped texture and gold accents.
 */
export function BottleBody(props) {
  return (
    <group {...props}>
      {/* Main body cylinder - taller and more prominent */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.48, 0.50, 2.8, 64, 1]} />
        <meshStandardMaterial
          color={FOREST_GREEN}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Neck section - smooth transition */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.48, 0.3, 64]} />
        <meshStandardMaterial
          color={FOREST_GREEN}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Top gold accent ring */}
      <mesh position={[0, 1.25, 0]}>
        <torusGeometry args={[0.48, 0.018, 16, 64]} />
        <meshStandardMaterial
          color={SAND_GOLD}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Bottom gold accent ring */}
      <mesh position={[0, -1.3, 0]}>
        <torusGeometry args={[0.50, 0.018, 16, 64]} />
        <meshStandardMaterial
          color={SAND_GOLD}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Spiral grip texture - wrapped bands pattern */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.485, 0.012, 8, 64]} />
          <meshStandardMaterial
            color="#0a1810"
            metalness={0.1}
            roughness={0.85}
          />
        </mesh>
      ))}

      {/* Vertical textured sections between grip bands */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.48;
        const z = Math.sin(angle) * 0.48;
        return (
          <mesh key={`vert-${i}`} position={[x, 0, z]}>
            <boxGeometry args={[0.08, 1.8, 0.015]} />
            <meshStandardMaterial
              color="#0f2418"
              metalness={0.2}
              roughness={0.7}
            />
          </mesh>
        );
      })}

      {/* LED Thermometer panel */}
      <LEDThermometer position={[0.42, 0.7, 0.2]} rotation={[0, 0.45, 0]} />

      {/* QR Code area */}
      <mesh position={[-0.48, -0.6, 0.15]} rotation={[0, -0.35, 0]}>
        <planeGeometry args={[0.24, 0.24]} />
        <meshStandardMaterial
          color="#e0ddd5"
          metalness={0.15}
          roughness={0.55}
        />
      </mesh>
      {/* QR Code pattern */}
      <mesh position={[-0.485, -0.6, 0.16]} rotation={[0, -0.35, 0]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshStandardMaterial color={FOREST_GREEN} metalness={0.35} roughness={0.5} />
      </mesh>
    </group>
  );
}

/**
 * Side-mounted LED thermometer display
 */
function LEDThermometer(props) {
  const ledRef = useRef();

  useFrame((state) => {
    if (ledRef.current) {
      ledRef.current.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group {...props}>
      {/* Panel housing */}
      <mesh>
        <boxGeometry args={[0.12, 0.3, 0.03]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* LED screen */}
      <mesh position={[0, 0, 0.016]}>
        <boxGeometry args={[0.08, 0.2, 0.005]} />
        <meshStandardMaterial
          ref={ledRef}
          color="#003322"
          emissive={LED_GREEN}
          emissiveIntensity={1}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

/**
 * Standard sip lid — flat design with secure cap
 */
export function StandardLid(props) {
  return (
    <group {...props}>
      {/* Main flat cap body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.38, 0.36, 0.25, 64]} />
        <meshStandardMaterial
          color={FOREST_GREEN}
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>
      {/* Sip spout - ergonomic curve */}
      <mesh position={[0.15, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 0.15, 32]} />
        <meshStandardMaterial
          color={DARK_RUBBER}
          metalness={0.08}
          roughness={0.88}
        />
      </mesh>
      {/* Spout cap cover */}
      <mesh position={[0.15, 0.28, 0]} castShadow>
        <sphereGeometry args={[0.07, 32, 16]} />
        <meshStandardMaterial
          color={DARK_RUBBER}
          metalness={0.05}
          roughness={0.92}
        />
      </mesh>
      {/* Top gold accent ring */}
      <mesh position={[0, 0.13, 0]}>
        <torusGeometry args={[0.38, 0.014, 12, 64]} />
        <meshStandardMaterial color={SAND_GOLD} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Bottom gold accent ring */}
      <mesh position={[0, -0.13, 0]}>
        <torusGeometry args={[0.36, 0.014, 12, 64]} />
        <meshStandardMaterial color={SAND_GOLD} metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

/**
 * Gym cap — wider cap with phone holder hinge
 */
export function GymCap(props) {
  return (
    <group {...props}>
      {/* Wide cap body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.38, 0.34, 0.3, 64]} />
        <meshStandardMaterial color="#222" metalness={0.6} roughness={0.45} />
      </mesh>
      {/* Phone holder hinge base */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.5, 0.06, 0.35]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Phone holder plate (angled up) */}
      <mesh position={[0, 0.38, -0.12]} rotation={[-0.5, 0, 0]} castShadow>
        <boxGeometry args={[0.44, 0.35, 0.03]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.55} roughness={0.4} />
      </mesh>
      {/* MagSafe ring */}
      <mesh position={[0, 0.38, -0.105]} rotation={[-0.5, 0, 0]}>
        <torusGeometry args={[0.12, 0.015, 16, 48]} />
        <meshStandardMaterial color={SAND_GOLD} metalness={0.85} roughness={0.18} />
      </mesh>
      {/* Gold accent */}
      <mesh position={[0, 0.15, 0]}>
        <torusGeometry args={[0.38, 0.01, 12, 64]} />
        <meshStandardMaterial color={SAND_GOLD} metalness={0.85} roughness={0.18} />
      </mesh>
    </group>
  );
}

/**
 * Water filtration cap with mesh filter visible
 */
export function FilterCap(props) {
  return (
    <group {...props}>
      {/* Cap body — taller than standard */}
      <mesh castShadow>
        <cylinderGeometry args={[0.34, 0.32, 0.5, 64]} />
        <meshStandardMaterial color={FOREST_LIGHT} metalness={0.65} roughness={0.4} />
      </mesh>
      {/* Internal filter mesh (visible through translucent section) */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.25, 32]} />
        <meshStandardMaterial
          color={STEEL_SILVER}
          metalness={0.6}
          roughness={0.3}
          wireframe={true}
        />
      </mesh>
      {/* Translucent viewing window */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 64, 1, true]} />
        <meshStandardMaterial
          color="#88aa99"
          transparent
          opacity={0.3}
          metalness={0.3}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Top knob */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial color={SAND_GOLD} metalness={0.85} roughness={0.18} />
      </mesh>
    </group>
  );
}

/**
 * Herb infuser strainer — internal basket
 */
export function HerbInfuser(props) {
  return (
    <group {...props}>
      {/* Strainer basket */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.25, 0.9, 32, 4]} />
        <meshStandardMaterial
          color={STEEL_SILVER}
          metalness={0.7}
          roughness={0.25}
          wireframe
        />
      </mesh>
      {/* Solid rim top */}
      <mesh position={[0, 0.45, 0]}>
        <torusGeometry args={[0.3, 0.02, 12, 48]} />
        <meshStandardMaterial color={STEEL_SILVER} metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Solid rim bottom */}
      <mesh position={[0, -0.45, 0]}>
        <torusGeometry args={[0.25, 0.02, 12, 48]} />
        <meshStandardMaterial color={STEEL_SILVER} metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Pull tab */}
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[0.06, 0.015, 8, 24]} />
        <meshStandardMaterial color={SAND_GOLD} metalness={0.85} roughness={0.18} />
      </mesh>
    </group>
  );
}

/**
 * Standard base cap - flat design with gold accents
 */
export function StandardBase(props) {
  return (
    <group {...props}>
      {/* Main flat base cap */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.50, 0.48, 0.2, 64]} />
        <meshStandardMaterial
          color={FOREST_GREEN}
          metalness={0.8}
          roughness={0.33}
        />
      </mesh>
      {/* Top gold accent ring */}
      <mesh position={[0, 0.11, 0]}>
        <torusGeometry args={[0.50, 0.014, 16, 64]} />
        <meshStandardMaterial color={SAND_GOLD} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Rubber foot pad */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.02, 64]} />
        <meshStandardMaterial color={DARK_RUBBER} metalness={0} roughness={0.95} />
      </mesh>
      {/* Anti-slip texture dots */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 0.35;
        const z = Math.sin(angle) * 0.35;
        return (
          <mesh key={i} position={[x, -0.09, z]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial
              color={SAND_GOLD}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/**
 * Magnetic compass base module
 */
export function CompassBase(props) {
  const needleRef = useRef();

  useFrame((state) => {
    if (needleRef.current) {
      needleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <group {...props}>
      {/* Base housing */}
      <mesh castShadow>
        <cylinderGeometry args={[0.46, 0.46, 0.3, 64]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Compass face (translucent) */}
      <mesh position={[0, -0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 64]} />
        <meshStandardMaterial
          color="#f5f0e8"
          metalness={0.1}
          roughness={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Compass ring */}
      <mesh position={[0, -0.155, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.02, 8, 64]} />
        <meshStandardMaterial color={SAND_GOLD} metalness={0.85} roughness={0.18} />
      </mesh>
      {/* Cardinal markers */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(angle) * 0.3,
            -0.15,
            Math.cos(angle) * 0.3,
          ]}
        >
          <boxGeometry args={[0.03, 0.01, 0.06]} />
          <meshStandardMaterial color={i === 0 ? '#cc3333' : SAND_GOLD} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      {/* Needle */}
      <group ref={needleRef} position={[0, -0.14, 0]}>
        <mesh>
          <boxGeometry args={[0.02, 0.01, 0.28]} />
          <meshStandardMaterial color="#cc3333" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.02, 0.01, 0.28]} />
          <meshStandardMaterial color="#eeeeee" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Emergency storage compartment base
 */
export function EmergencyBase(props) {
  return (
    <group {...props}>
      {/* Outer shell */}
      <mesh castShadow>
        <cylinderGeometry args={[0.46, 0.44, 0.35, 64]} />
        <meshStandardMaterial color={FOREST_GREEN} metalness={0.7} roughness={0.38} />
      </mesh>
      {/* Inner compartment (recessed) */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.2, 64]} />
        <meshStandardMaterial color="#222" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Twist-lock indicator ring */}
      <mesh position={[0, 0.17, 0]}>
        <torusGeometry args={[0.46, 0.012, 12, 64]} />
        <meshStandardMaterial color={SAND_GOLD} metalness={0.85} roughness={0.18} />
      </mesh>
      {/* Lock icon (small sphere) */}
      <mesh position={[0.35, -0.19, 0.3]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color={SAND_GOLD} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
