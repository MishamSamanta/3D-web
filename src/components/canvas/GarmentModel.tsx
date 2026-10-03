import React, { useMemo, useEffect, Component, ReactNode } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ProceduralGarment } from './ProceduralGarment';
import { ProductColor } from '../../data/products';

interface GarmentModelProps {
  modelPath: string;
  activeColor: ProductColor;
  type?: 'hoodie' | 'tshirt' | 'jacket' | 'cargo';
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  modelPath: string;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn(`[NOVA 3D Engine] Warning: Could not load 3D model at "${this.props.modelPath}". Showing procedural 3D fallback.`, error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const GLTFLoaderInner: React.FC<GarmentModelProps> = ({ modelPath, activeColor, type }) => {
  const gltf = useGLTF(modelPath);

  // Clone scene to avoid cross-component material mutation
  const sceneClone = useMemo(() => {
    return gltf.scene.clone(true);
  }, [gltf.scene]);

  // Update fabric material color reactively
  useEffect(() => {
    if (!sceneClone) return;

    const targetColor = new THREE.Color(activeColor.hex);
    const secondaryColor = targetColor.clone().offsetHSL(0, 0, -0.06);
    const accentColor = new THREE.Color(activeColor.accentHex || '#d4ff00');

    sceneClone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;

          if (mat.name === 'FabricMaterial') {
            mat.color.copy(targetColor);
            mat.roughness = 0.78;
            mat.needsUpdate = true;
          } else if (mat.name === 'SecondaryFabric') {
            mat.color.copy(secondaryColor);
            mat.roughness = 0.68;
            mat.needsUpdate = true;
          } else if (mat.name === 'NeonPiping' || mat.name === 'AccentMaterial') {
            mat.color.copy(accentColor);
            mat.emissive.copy(accentColor);
            mat.emissiveIntensity = 2.0;
            mat.needsUpdate = true;
          } else if (mat.name === 'HardwareMaterial') {
            mat.color.set(0x1e2025);
            mat.metalness = 0.92;
            mat.roughness = 0.28;
            mat.needsUpdate = true;
          } else if (mat.name === 'WebbingMaterial') {
            mat.color.set(0x0c0d10);
            mat.roughness = 0.88;
            mat.needsUpdate = true;
          }
        }
      }
    });
  }, [sceneClone, activeColor]);

  if (!sceneClone) {
    return <ProceduralGarment color={activeColor.hex} type={type} />;
  }

  return <primitive object={sceneClone} />;
};

export const GarmentModel: React.FC<GarmentModelProps> = (props) => {
  return (
    <ModelErrorBoundary
      modelPath={props.modelPath}
      fallback={<ProceduralGarment color={props.activeColor.hex} type={props.type} />}
    >
      <GLTFLoaderInner {...props} />
    </ModelErrorBoundary>
  );
};

// Preload models
try {
  useGLTF.preload('/models/hoodie.glb');
  useGLTF.preload('/models/tshirt.glb');
} catch {
  // Ignore in SSR
}
