import React, { useMemo } from 'react';
import * as THREE from 'three';

interface ProceduralGarmentProps {
  color: string;
  type?: 'hoodie' | 'tshirt' | 'jacket' | 'cargo';
}

export const ProceduralGarment: React.FC<ProceduralGarmentProps> = ({ color, type = 'hoodie' }) => {
  const threeColor = useMemo(() => new THREE.Color(color), [color]);

  return (
    <group position={[0, -0.2, 0]}>
      {/* Torso */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.7, 1.45, 32, 6]} />
        <meshStandardMaterial
          color={threeColor}
          roughness={0.8}
          metalness={0.08}
        />
      </mesh>

      {/* Wireframe Holographic Cage / Tech Overlay */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.77, 0.72, 1.47, 16, 4]} />
        <meshBasicMaterial
          color="#d4ff00"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Hem */}
      <mesh position={[0, -0.76, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.68, 0.16, 32]} />
        <meshStandardMaterial color="#0c0d10" roughness={0.9} />
      </mesh>

      {/* Shoulders & Sleeves */}
      {/* Left Sleeve */}
      <group position={[-0.95, 0.52, 0]} rotation={[0, 0, 0.35]}>
        <mesh position={[0, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.2, 1.1, 24]} />
          <meshStandardMaterial color={threeColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Right Sleeve */}
      <group position={[0.95, 0.52, 0]} rotation={[0, 0, -0.35]}>
        <mesh position={[0, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.2, 1.1, 24]} />
          <meshStandardMaterial color={threeColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Hood (if hoodie/jacket) or Collar Ring (if tshirt) */}
      {type !== 'tshirt' ? (
        <group position={[0, 0.88, -0.06]}>
          <mesh castShadow>
            <sphereGeometry args={[0.52, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
            <meshStandardMaterial color={threeColor} roughness={0.85} side={THREE.DoubleSide} />
          </mesh>
          {/* Hood Rim */}
          <mesh position={[0, 0.08, 0.22]} rotation={[Math.PI * 0.42, 0, 0]}>
            <torusGeometry args={[0.42, 0.05, 12, 28, Math.PI * 1.3]} />
            <meshStandardMaterial color="#0c0d10" roughness={0.8} />
          </mesh>
        </group>
      ) : (
        <mesh position={[0, 0.74, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.05, 16, 32]} />
          <meshStandardMaterial color="#0c0d10" roughness={0.8} />
        </mesh>
      )}

      {/* Chest Badge / Technical Label */}
      <mesh position={[-0.32, 0.3, 0.45]} rotation={[0, -0.12, 0]}>
        <boxGeometry args={[0.28, 0.15, 0.02]} />
        <meshStandardMaterial
          color="#d4ff00"
          emissive="#d4ff00"
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Technical coordinate ring */}
      <mesh position={[0, -0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.22, 64]} />
        <meshBasicMaterial color="#d4ff00" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
