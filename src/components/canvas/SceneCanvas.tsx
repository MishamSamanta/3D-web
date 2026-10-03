import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, Float, OrbitControls, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { GarmentModel } from './GarmentModel';
import { CollectionCarousel3D } from './CollectionCarousel3D';
import { useScene } from '../../context/SceneContext';

interface SceneRigProps {
  scrollProgress: number;
}

const FloatingShard: React.FC<{ position: [number, number, number]; rotationSpeed: number }> = ({ position, rotationSpeed }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed;
    meshRef.current.rotation.y += delta * (rotationSpeed * 1.2);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.15, 0]} />
      <meshStandardMaterial
        color="#d4ff00"
        emissive="#d4ff00"
        emissiveIntensity={0.3}
        wireframe
      />
    </mesh>
  );
};

const SceneRig: React.FC<SceneRigProps> = ({ scrollProgress }) => {
  const { camera, pointer, size } = useThree();
  const { activeProduct, activeColor, isInspectMode, isMobile } = useScene();
  const heroGroupRef = useRef<THREE.Group>(null);

  // Dynamic aspect ratio calculation
  const aspect = size.width / Math.max(size.height, 1);
  const isPortrait = aspect < 1 || isMobile;

  // Responsive camera distance multiplier:
  // On desktop 16:9 (aspect ~1.77), distanceMult is 1.0.
  // On mobile portrait (aspect ~0.45), distanceMult scales up to ~1.85 so the garment fits with comfortable padding.
  const distanceMult = isPortrait ? Math.min(Math.max(1 / (aspect * 1.12), 1.6), 2.2) : 1;

  useFrame((_, delta) => {
    const factor = Math.min(delta * 4.5, 1);

    // Target vectors
    let targetCamPos = new THREE.Vector3(0, 0, 4.4 * distanceMult);
    let targetLookAt = new THREE.Vector3(0, 0, 0);

    // Hero garment transforms
    let heroPos = new THREE.Vector3(0, isPortrait ? 0.35 : 0, 0);
    let heroScale = isPortrait ? 0.82 : 1;
    let heroRotY = 0;

    // Stage 1: Hero (0 - 0.15)
    if (scrollProgress < 0.15) {
      targetCamPos.set(0, isPortrait ? 0.2 : 0, 4.4 * distanceMult);
      targetLookAt.set(0, isPortrait ? 0.2 : 0, 0);
      heroPos.set(0, isPortrait ? 0.35 : 0, 0);
      heroScale = isPortrait ? 0.82 : 1;
      heroRotY = pointer.x * (isPortrait ? 0.12 : 0.25);
    }
    // Stage 2: Zoom-in Dolly (0.15 - 0.32)
    else if (scrollProgress < 0.32) {
      const p = (scrollProgress - 0.15) / 0.17;
      const startZ = 4.4 * distanceMult;
      const endZ = isPortrait ? 3.3 : 1.6; // On mobile, zoom in without clipping through chest

      targetCamPos.set(
        isPortrait ? 0 : THREE.MathUtils.lerp(0, 0.1, p),
        isPortrait ? 0.3 : THREE.MathUtils.lerp(0, 0.2, p),
        THREE.MathUtils.lerp(startZ, endZ, p)
      );
      targetLookAt.set(0, isPortrait ? 0.3 : 0.2, 0);
      heroPos.set(0, isPortrait ? 0.35 : 0, 0);
      heroScale = isPortrait ? 0.88 : 1;
      heroRotY = p * 0.35;
    }
    // Stage 3: Panel Opens (0.32 - 0.50)
    else if (scrollProgress < 0.50) {
      const p = (scrollProgress - 0.32) / 0.18;
      if (isPortrait) {
        // On mobile: elevate garment smoothly into the upper half of screen
        const posY = THREE.MathUtils.lerp(0.35, 1.25, p);
        heroPos.set(0, posY, 0);
        heroScale = THREE.MathUtils.lerp(0.88, 0.62, p);
        targetCamPos.set(0, 0.35, THREE.MathUtils.lerp(3.3, 5.6, p));
        targetLookAt.set(0, 0.35, 0);
        heroRotY = THREE.MathUtils.lerp(0.35, 0.65, p);
      } else {
        // On desktop: shift garment left so the unfolding panel can occupy the right side
        const offsetX = THREE.MathUtils.lerp(0, -1.2, p);
        targetCamPos.set(0, 0.1, THREE.MathUtils.lerp(1.6, 3.4, p));
        targetLookAt.set(offsetX * 0.3, 0.1, 0);
        heroPos.set(offsetX, 0, 0);
        heroScale = 1;
        heroRotY = THREE.MathUtils.lerp(0.3, 0.6, p);
      }
    }
    // Stage 4: Collection 3D Carousel (0.50 - 0.68)
    else if (scrollProgress < 0.68) {
      const p = (scrollProgress - 0.50) / 0.18;
      const startCamZ = isPortrait ? 5.6 : 3.4;
      const endCamZ = isPortrait ? 8.6 : 6.2;
      targetCamPos.set(0, 0.3, THREE.MathUtils.lerp(startCamZ, endCamZ, p));
      targetLookAt.set(0, 0, 0);
      heroPos.set(0, -15, 0); // Hide single hero garment, show carousel
    }
    // Stage 5: Technical Details 360° (0.68 - 0.85)
    else if (scrollProgress < 0.85) {
      const p = (scrollProgress - 0.68) / 0.17;
      if (isPortrait) {
        targetCamPos.set(0, 0.3, 3.2 * distanceMult);
        targetLookAt.set(0, 0.3, 0);
        heroPos.set(0, 0.95, 0);
        heroScale = 0.68;
      } else {
        targetCamPos.set(0.8, 0.1, 3.1);
        targetLookAt.set(0, 0, 0);
        heroPos.set(-0.7, 0, 0);
        heroScale = 1.05;
      }
      // Complete 360 degree rotation synchronized to scroll
      heroRotY = p * Math.PI * 2;
    }
    // Stage 6 & 7: Brand Story & Footer (0.85 - 1.0)
    else {
      const p = (scrollProgress - 0.85) / 0.15;
      targetCamPos.set(
        isPortrait ? 0 : THREE.MathUtils.lerp(0.8, 0, p),
        isPortrait ? 0.2 : THREE.MathUtils.lerp(0.1, 0.2, p),
        THREE.MathUtils.lerp(3.2 * distanceMult, 4.4 * distanceMult, p)
      );
      targetLookAt.set(0, 0, 0);
      heroPos.set(0, isPortrait ? 0.25 : 0, 0);
      heroScale = THREE.MathUtils.lerp(isPortrait ? 0.68 : 1.05, isPortrait ? 0.78 : 0.95, p);
      heroRotY = Math.PI * 2 + p * 0.5;
    }

    if (!isInspectMode) {
      camera.position.lerp(targetCamPos, factor);
      camera.lookAt(targetLookAt);
    }

    if (heroGroupRef.current && !isInspectMode) {
      heroGroupRef.current.position.lerp(heroPos, factor);
      heroGroupRef.current.scale.lerp(new THREE.Vector3(heroScale, heroScale, heroScale), factor);
      heroGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        heroGroupRef.current.rotation.y,
        heroRotY,
        factor
      );
      // Mouse/tilt parallax (gentle on mobile)
      heroGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        heroGroupRef.current.rotation.x,
        -pointer.y * (isPortrait ? 0.05 : 0.12),
        factor
      );
      heroGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        heroGroupRef.current.rotation.z,
        -pointer.x * (isPortrait ? 0.04 : 0.08),
        factor
      );
    }
  });

  const showCarousel = scrollProgress >= 0.48 && scrollProgress <= 0.70;
  const showHeroGarment = scrollProgress < 0.48 || scrollProgress > 0.70;
  const showShards = scrollProgress >= 0.82;

  return (
    <>
      {/* Hero & Details Garment */}
      {showHeroGarment && (
        <group ref={heroGroupRef}>
          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.3}>
            <GarmentModel
              modelPath={activeProduct.modelPath}
              activeColor={activeColor}
              type={activeProduct.type}
            />
          </Float>
        </group>
      )}

      {/* 3D Collection Carousel */}
      {showCarousel && (
        <group position={[0, 0, 0]}>
          <CollectionCarousel3D />
        </group>
      )}

      {/* Floating 3D Geometric Shards in Brand Story */}
      {showShards && (
        <group>
          <FloatingShard position={[-2.5, 1.2, -1]} rotationSpeed={0.5} />
          <FloatingShard position={[2.6, -0.8, -0.5]} rotationSpeed={-0.6} />
          <FloatingShard position={[-1.8, -1.5, 0.5]} rotationSpeed={0.8} />
          <FloatingShard position={[2.1, 1.6, -1.2]} rotationSpeed={-0.4} />
        </group>
      )}
    </>
  );
};

interface SceneCanvasProps {
  scrollProgress: number;
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({ scrollProgress }) => {
  const { isInspectMode, isMobile } = useScene();

  // ONLY allow canvas to capture pointer events when user actively toggles 3D inspection mode!
  // This guarantees touch gestures on mobile phones NEVER get trapped and animations scroll smoothly.
  const isInteractive = isInspectMode;

  return (
    <div
      className={`fixed inset-0 z-0 transition-colors duration-700 ${
        isInteractive ? 'pointer-events-auto touch-none' : 'pointer-events-none'
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        shadows={!isMobile}
      >
        <Suspense fallback={null}>
          {/* Lighting Rig: Soft Key, Rim, and Fill */}
          <ambientLight intensity={0.45} />
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.8}
            castShadow={!isMobile}
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />
          {/* Cyber Lime Rim Light */}
          <directionalLight position={[-4, 3, -3]} intensity={1.4} color="#d4ff00" />
          {/* Soft Arctic Back Fill */}
          <directionalLight position={[0, -3, -4]} intensity={0.6} color="#60a5fa" />
          <spotLight
            position={[0, 5, 2]}
            intensity={0.8}
            angle={0.6}
            penumbra={0.8}
            color="#ffffff"
          />

          {/* HDR Environment */}
          <Environment preset="city" />

          {/* Contact Shadows Grounding */}
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.65}
            scale={8}
            blur={2.2}
            far={4}
            color="#000000"
          />

          {/* Main 3D Rig with Responsive Aspect Scaling */}
          <SceneRig scrollProgress={scrollProgress} />

          {/* OrbitControls when user wants manual 3D drag inspection */}
          {isInspectMode && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={(Math.PI * 2) / 3}
              rotateSpeed={0.8}
              dampingFactor={0.05}
            />
          )}

          {/* Post Processing on Desktop */}
          {!isMobile && (
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={0.3}
                luminanceThreshold={0.85}
                luminanceSmoothing={0.3}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.12} darkness={0.85} />
            </EffectComposer>
          )}

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};
