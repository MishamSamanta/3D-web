import React, { useMemo } from 'react';
import * as THREE from 'three';

interface ProceduralGarmentProps {
  color: string;
  type?: 'hoodie' | 'tshirt' | 'jacket' | 'cargo';
}

export const ProceduralGarment: React.FC<ProceduralGarmentProps> = ({ color, type = 'hoodie' }) => {
  const threeColor = useMemo(() => new THREE.Color(color), [color]);
  const darkColor = useMemo(() => threeColor.clone().offsetHSL(0, 0, -0.06), [threeColor]);

  return (
    <group position={[0, -0.15, 0]}>
      {/* 1. Main Anatomical Torso */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.76, 0.70, 1.48, 32, 6]} />
        <meshStandardMaterial color={threeColor} roughness={0.78} metalness={0.12} />
      </mesh>

      {/* Shoulder Pauldrons / Tactical Yokes */}
      <group position={[-0.75, 0.65, 0]} rotation={[0, 0, 0.22]}>
        <mesh castShadow>
          <boxGeometry args={[0.46, 0.14, 0.54]} />
          <meshStandardMaterial color={darkColor} roughness={0.65} metalness={0.18} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.48, 0.02, 0.56]} />
          <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={1.8} />
        </mesh>
      </group>

      <group position={[0.75, 0.65, 0]} rotation={[0, 0, -0.22]}>
        <mesh castShadow>
          <boxGeometry args={[0.46, 0.14, 0.54]} />
          <meshStandardMaterial color={darkColor} roughness={0.65} metalness={0.18} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.48, 0.02, 0.56]} />
          <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={1.8} />
        </mesh>
      </group>

      {/* 2. Tactical Chest Harness with Buckle */}
      <group position={[0, 0.18, 0.52]}>
        {/* Horizontal strap */}
        <mesh>
          <boxGeometry args={[0.88, 0.09, 0.025]} />
          <meshStandardMaterial color="#0c0d10" roughness={0.9} />
        </mesh>
        {/* Vertical shoulder straps */}
        <mesh position={[-0.38, 0.22, -0.01]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[0.08, 0.52, 0.02]} />
          <meshStandardMaterial color="#0c0d10" roughness={0.9} />
        </mesh>
        <mesh position={[0.38, 0.22, -0.01]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[0.08, 0.52, 0.02]} />
          <meshStandardMaterial color="#0c0d10" roughness={0.9} />
        </mesh>
        {/* Central Tactical Buckle */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.18, 0.12, 0.05]} />
          <meshStandardMaterial color="#1e2025" roughness={0.25} metalness={0.95} />
        </mesh>
        {/* Buckle release tabs */}
        <mesh position={[-0.09, 0, 0.02]}>
          <boxGeometry args={[0.03, 0.05, 0.06]} />
          <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={1.8} />
        </mesh>
        <mesh position={[0.09, 0, 0.02]}>
          <boxGeometry args={[0.03, 0.05, 0.06]} />
          <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={1.8} />
        </mesh>
        {/* Hanging adjustment strap */}
        <mesh position={[0, -0.24, 0.01]} rotation={[0.08, 0, 0]}>
          <boxGeometry args={[0.07, 0.38, 0.02]} />
          <meshStandardMaterial color="#0c0d10" roughness={0.9} />
        </mesh>
      </group>

      {/* 3. Center Waterproof Zipper with Glowing Neon Trim */}
      <group position={[0, 0.05, 0.51]}>
        <mesh>
          <boxGeometry args={[0.045, 1.42, 0.02]} />
          <meshStandardMaterial color="#101114" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Neon zipper borders */}
        <mesh position={[-0.03, 0, 0.005]}>
          <boxGeometry args={[0.014, 1.42, 0.022]} />
          <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={2.0} />
        </mesh>
        <mesh position={[0.03, 0, 0.005]}>
          <boxGeometry args={[0.014, 1.42, 0.022]} />
          <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={2.0} />
        </mesh>
      </group>

      {/* 4. NOVA Chest Badge */}
      <mesh position={[0, 0.44, 0.525]}>
        <boxGeometry args={[0.26, 0.08, 0.02]} />
        <meshStandardMaterial color="#1d2028" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.44, 0.536]}>
        <boxGeometry args={[0.20, 0.035, 0.01]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
      </mesh>

      {/* 5. Lower Torso Storm Cargo Pockets with Neon Slits */}
      <group position={[-0.42, -0.32, 0.46]} rotation={[0, 0.15, -0.06]}>
        <mesh castShadow>
          <boxGeometry args={[0.36, 0.36, 0.12]} />
          <meshStandardMaterial color={darkColor} roughness={0.68} />
        </mesh>
        <mesh position={[0, 0.04, 0.065]}>
          <boxGeometry args={[0.30, 0.02, 0.02]} />
          <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={2.0} />
        </mesh>
      </group>

      <group position={[0.42, -0.32, 0.46]} rotation={[0, -0.15, 0.06]}>
        <mesh castShadow>
          <boxGeometry args={[0.36, 0.36, 0.12]} />
          <meshStandardMaterial color={darkColor} roughness={0.68} />
        </mesh>
        <mesh position={[0, 0.04, 0.065]}>
          <boxGeometry args={[0.30, 0.02, 0.02]} />
          <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={2.0} />
        </mesh>
      </group>

      {/* 6. Articulated Sleeves */}
      {/* Left Sleeve with Utility Arm Pouch */}
      <group position={[-0.98, 0.58, 0]} rotation={[0.06, 0.08, 0.32]}>
        {/* Upper arm */}
        <mesh position={[0, -0.35, 0]} castShadow>
          <cylinderGeometry args={[0.29, 0.24, 0.85, 24]} />
          <meshStandardMaterial color={threeColor} roughness={0.78} />
        </mesh>
        {/* Bicep Utility Cargo Pouch */}
        <group position={[-0.26, -0.28, 0.04]} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            <boxGeometry args={[0.18, 0.22, 0.12]} />
            <meshStandardMaterial color={darkColor} roughness={0.65} />
          </mesh>
          <mesh position={[0, 0, 0.065]}>
            <boxGeometry args={[0.015, 0.22, 0.02]} />
            <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={2.0} />
          </mesh>
        </group>
        {/* Forearm */}
        <mesh position={[-0.1, -1.25, 0.06]} rotation={[0, 0, 0.12]} castShadow>
          <cylinderGeometry args={[0.23, 0.19, 0.82, 24]} />
          <meshStandardMaterial color={threeColor} roughness={0.78} />
        </mesh>
        {/* Neon cuff */}
        <mesh position={[-0.18, -1.72, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.19, 0.018, 10, 24]} />
          <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={2.0} />
        </mesh>
      </group>

      {/* Right Sleeve */}
      <group position={[0.98, 0.58, 0]} rotation={[0.06, -0.08, -0.32]}>
        <mesh position={[0, -0.35, 0]} castShadow>
          <cylinderGeometry args={[0.29, 0.24, 0.85, 24]} />
          <meshStandardMaterial color={threeColor} roughness={0.78} />
        </mesh>
        <mesh position={[0.1, -1.25, 0.06]} rotation={[0, 0, -0.12]} castShadow>
          <cylinderGeometry args={[0.23, 0.19, 0.82, 24]} />
          <meshStandardMaterial color={threeColor} roughness={0.78} />
        </mesh>
        <mesh position={[0.18, -1.72, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.19, 0.018, 10, 24]} />
          <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={2.0} />
        </mesh>
      </group>

      {/* 7. High Tactical Storm Cowl & Hood System */}
      {type !== 'tshirt' ? (
        <group position={[0, 0.82, 0.02]}>
          {/* High Storm Cowl */}
          <mesh position={[0, 0.1, 0.05]}>
            <cylinderGeometry args={[0.36, 0.44, 0.36, 32, 1, true]} />
            <meshStandardMaterial color={threeColor} roughness={0.78} />
          </mesh>
          {/* Neon Cowl Rim */}
          <mesh position={[0, 0.28, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.36, 0.018, 12, 36]} />
            <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={2.0} />
          </mesh>
          {/* Hood Dome */}
          <mesh position={[0, 0.22, -0.12]} castShadow>
            <sphereGeometry args={[0.54, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.74]} />
            <meshStandardMaterial color={threeColor} roughness={0.82} side={THREE.DoubleSide} />
          </mesh>
          {/* Cyber Lime Face Aperture Rim */}
          <mesh position={[0, 0.28, 0.22]} rotation={[Math.PI * 0.44, 0, 0]}>
            <torusGeometry args={[0.46, 0.022, 16, 40, Math.PI * 1.35]} />
            <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={2.0} />
          </mesh>
        </group>
      ) : (
        <mesh position={[0, 0.74, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.05, 16, 32]} />
          <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={1.5} />
        </mesh>
      )}

      {/* Ribbed Bottom Hem with Neon Piping */}
      <mesh position={[0, -0.76, 0]} castShadow>
        <cylinderGeometry args={[0.70, 0.68, 0.18, 32]} />
        <meshStandardMaterial color={darkColor} roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.76, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.70, 0.016, 12, 36]} />
        <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={2.0} />
      </mesh>
    </group>
  );
};
