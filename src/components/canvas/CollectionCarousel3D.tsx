import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PRODUCTS, Product } from '../../data/products';
import { GarmentModel } from './GarmentModel';
import { useScene } from '../../context/SceneContext';

interface CarouselItemProps {
  product: Product;
  position: [number, number, number];
  index: number;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ product, position, index }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { setActiveProduct, activeProduct, playFeedbackSound } = useScene();
  const isSelected = activeProduct.id === product.id;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Base continuous gentle rotation
    groupRef.current.rotation.y += delta * (hovered ? 0.8 : 0.3);

    // Target hover lift
    const targetY = position[1] + (hovered ? 0.35 : 0) + (isSelected ? 0.15 : 0);
    const targetScale = hovered ? 1.08 : isSelected ? 1.02 : 0.95;

    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 5);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setActiveProduct(product);
    playFeedbackSound('click');

    // Scroll smoothly to panel section
    const panelEl = document.getElementById('product-panel-section');
    if (panelEl) {
      panelEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
        playFeedbackSound('swatch');
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <group ref={groupRef}>
        <group scale={[0.65, 0.65, 0.65]}>
          <GarmentModel
            modelPath={product.modelPath}
            activeColor={product.colors[0]}
            type={product.type}
          />
        </group>
      </group>

      {/* Holographic Pedestal / Ring */}
      <mesh position={[0, -0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.76, 32]} />
        <meshBasicMaterial
          color={hovered || isSelected ? '#d4ff00' : '#334155'}
          transparent
          opacity={hovered ? 0.9 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glow dot */}
      <mesh position={[0, -0.9, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color={isSelected ? '#00ff87' : hovered ? '#d4ff00' : '#475569'} />
      </mesh>
    </group>
  );
};

export const CollectionCarousel3D: React.FC = () => {
  const carouselGroupRef = useRef<THREE.Group>(null);

  // Position products horizontally spaced with slight arc
  const spacing = 2.4;
  const total = PRODUCTS.length;
  const startX = -((total - 1) * spacing) / 2;

  useFrame(({ clock }) => {
    if (!carouselGroupRef.current) return;
    // Subtle wave floating
    carouselGroupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.05;
  });

  return (
    <group ref={carouselGroupRef}>
      {PRODUCTS.map((prod, idx) => {
        const x = startX + idx * spacing;
        // subtle curvature
        const z = -Math.abs(x) * 0.25;
        return (
          <CarouselItem
            key={prod.id}
            product={prod}
            position={[x, 0, z]}
            index={idx}
          />
        );
      })}
    </group>
  );
};
