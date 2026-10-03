import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';

if (!globalThis.FileReader) {
  globalThis.FileReader = class FileReader {
    async readAsArrayBuffer(blob) {
      const buffer = await blob.arrayBuffer();
      this.result = buffer;
      if (this.onloadend) this.onloadend();
    }
  };
}

const outDir = path.resolve('public', 'models');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function exportSceneToGLB(scene, outputPath) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (gltf) => {
        if (gltf instanceof ArrayBuffer) {
          fs.writeFileSync(outputPath, Buffer.from(gltf));
          console.log(`Saved GLB to: ${outputPath} (${(gltf.byteLength / 1024).toFixed(1)} KB)`);
          resolve();
        } else {
          const output = JSON.stringify(gltf, null, 2);
          fs.writeFileSync(outputPath, output);
          console.log(`Saved GLTF to: ${outputPath}`);
          resolve();
        }
      },
      (error) => {
        console.error('An error happened during parsing:', error);
        reject(error);
      },
      { binary: true }
    );
  });
}

function createHoodieModel() {
  const root = new THREE.Group();
  root.name = 'Hoodie_Model';

  // Base Fabric Material
  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x18181c,
    roughness: 0.85,
    metalness: 0.06,
    name: 'FabricMaterial',
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: 0xd4ff00,
    roughness: 0.3,
    metalness: 0.8,
    name: 'AccentMaterial',
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x0c0c0e,
    roughness: 0.9,
    metalness: 0.04,
    name: 'RibbedMaterial',
  });

  // 1. Torso
  const torsoGeo = new THREE.CylinderGeometry(0.72, 0.68, 1.45, 32, 8);
  torsoGeo.scale(1.15, 1, 0.75); // Flatter depth
  const torso = new THREE.Mesh(torsoGeo, fabricMat);
  torso.name = 'Torso';
  torso.position.y = 0;
  root.add(torso);

  // Ribbed Hem at bottom
  const hemGeo = new THREE.CylinderGeometry(0.67, 0.65, 0.16, 32);
  hemGeo.scale(1.16, 1, 0.76);
  const hem = new THREE.Mesh(hemGeo, darkMat);
  hem.position.y = -0.76;
  root.add(hem);

  // 2. Kangaroo Pocket (Front)
  const pocketGeo = new THREE.BoxGeometry(0.85, 0.45, 0.15);
  const pocket = new THREE.Mesh(pocketGeo, fabricMat);
  pocket.name = 'Pocket';
  pocket.position.set(0, -0.32, 0.48);
  pocket.rotation.x = -0.06;
  root.add(pocket);

  // 3. Sleeves (Left & Right)
  const createSleeve = (isLeft) => {
    const sleeveGroup = new THREE.Group();
    const sign = isLeft ? -1 : 1;

    // Upper arm
    const upperGeo = new THREE.CylinderGeometry(0.26, 0.22, 0.9, 24);
    const upper = new THREE.Mesh(upperGeo, fabricMat);
    upper.position.set(0, -0.35, 0);
    sleeveGroup.add(upper);

    // Forearm
    const foreGeo = new THREE.CylinderGeometry(0.22, 0.19, 0.85, 24);
    const fore = new THREE.Mesh(foreGeo, fabricMat);
    fore.position.set(sign * 0.06, -1.05, 0.05);
    fore.rotation.z = sign * -0.1;
    sleeveGroup.add(fore);

    // Cuff
    const cuffGeo = new THREE.CylinderGeometry(0.18, 0.17, 0.18, 24);
    const cuff = new THREE.Mesh(cuffGeo, darkMat);
    cuff.position.set(sign * 0.12, -1.48, 0.08);
    sleeveGroup.add(cuff);

    sleeveGroup.position.set(sign * 0.95, 0.58, 0);
    sleeveGroup.rotation.z = sign * -0.35;
    sleeveGroup.rotation.y = sign * 0.08;
    return sleeveGroup;
  };

  root.add(createSleeve(true));
  root.add(createSleeve(false));

  // 4. Hood (Spherical geometry with open front)
  const hoodGroup = new THREE.Group();
  hoodGroup.position.set(0, 0.85, -0.08);

  const hoodOuterGeo = new THREE.SphereGeometry(0.52, 28, 20, 0, Math.PI * 2, 0, Math.PI * 0.72);
  hoodOuterGeo.scale(0.9, 1.1, 1.05);
  const hoodOuter = new THREE.Mesh(hoodOuterGeo, fabricMat);
  hoodOuter.name = 'Hood';
  hoodGroup.add(hoodOuter);

  // Hood Rim
  const rimGeo = new THREE.TorusGeometry(0.44, 0.06, 16, 32, Math.PI * 1.3);
  const rim = new THREE.Mesh(rimGeo, darkMat);
  rim.rotation.x = Math.PI * 0.42;
  rim.position.set(0, 0.1, 0.22);
  hoodGroup.add(rim);

  root.add(hoodGroup);

  // 5. Drawstrings
  const createDrawstring = (isLeft) => {
    const sign = isLeft ? -1 : 1;
    const stringGroup = new THREE.Group();

    // Cord
    const cordGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.65, 12);
    const cord = new THREE.Mesh(cordGeo, fabricMat);
    cord.position.y = -0.32;
    stringGroup.add(cord);

    // Aglet (Metal tip in cyber lime)
    const tipGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.12, 12);
    const tip = new THREE.Mesh(tipGeo, accentMat);
    tip.position.y = -0.66;
    stringGroup.add(tip);

    stringGroup.position.set(sign * 0.14, 0.65, 0.48);
    stringGroup.rotation.z = sign * -0.05;
    stringGroup.rotation.x = 0.06;
    return stringGroup;
  };

  root.add(createDrawstring(true));
  root.add(createDrawstring(false));

  // 6. Chest Graphic / Technical Patch
  const patchGeo = new THREE.BoxGeometry(0.32, 0.18, 0.03);
  const patch = new THREE.Mesh(patchGeo, accentMat);
  patch.position.set(-0.35, 0.28, 0.46);
  patch.rotation.y = -0.15;
  root.add(patch);

  // Scale and center entire garment
  root.scale.set(1.4, 1.4, 1.4);
  root.position.y = 0.2;

  const scene = new THREE.Scene();
  scene.add(root);
  return scene;
}

function createTshirtModel() {
  const root = new THREE.Group();
  root.name = 'Tshirt_Model';

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x141416,
    roughness: 0.88,
    metalness: 0.04,
    name: 'FabricMaterial',
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: 0x00ff87,
    roughness: 0.35,
    metalness: 0.6,
    name: 'AccentMaterial',
  });

  const ribMat = new THREE.MeshStandardMaterial({
    color: 0x0f0f12,
    roughness: 0.9,
    metalness: 0.02,
    name: 'RibbedMaterial',
  });

  // Torso
  const torsoGeo = new THREE.CylinderGeometry(0.68, 0.66, 1.42, 32);
  torsoGeo.scale(1.15, 1, 0.7);
  const torso = new THREE.Mesh(torsoGeo, fabricMat);
  torso.position.y = 0;
  root.add(torso);

  // Collar Ring
  const collarGeo = new THREE.TorusGeometry(0.3, 0.045, 16, 32);
  const collar = new THREE.Mesh(collarGeo, ribMat);
  collar.rotation.x = Math.PI / 2;
  collar.position.set(0, 0.71, 0);
  root.add(collar);

  // Short Sleeves
  const createShortSleeve = (isLeft) => {
    const sign = isLeft ? -1 : 1;
    const sleeve = new THREE.Group();

    const armGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.55, 24);
    const arm = new THREE.Mesh(armGeo, fabricMat);
    arm.position.y = -0.22;
    sleeve.add(arm);

    // Sleeve Cuff
    const cuffGeo = new THREE.TorusGeometry(0.22, 0.02, 16, 24);
    const cuff = new THREE.Mesh(cuffGeo, ribMat);
    cuff.rotation.x = Math.PI / 2;
    cuff.position.y = -0.48;
    sleeve.add(cuff);

    sleeve.position.set(sign * 0.85, 0.58, 0);
    sleeve.rotation.z = sign * -0.55;
    return sleeve;
  };

  root.add(createShortSleeve(true));
  root.add(createShortSleeve(false));

  // Chest Graphic / Typography Strip
  const graphicGeo = new THREE.BoxGeometry(0.48, 0.06, 0.02);
  const graphic = new THREE.Mesh(graphicGeo, accentMat);
  graphic.position.set(0, 0.25, 0.45);
  root.add(graphic);

  root.scale.set(1.4, 1.4, 1.4);
  root.position.y = 0.2;

  const scene = new THREE.Scene();
  scene.add(root);
  return scene;
}

async function main() {
  console.log('Generating production 3D garment models...');
  const hoodieScene = createHoodieModel();
  await exportSceneToGLB(hoodieScene, path.join(outDir, 'hoodie.glb'));

  const tshirtScene = createTshirtModel();
  await exportSceneToGLB(tshirtScene, path.join(outDir, 'tshirt.glb'));

  console.log('Finished 3D model generation successfully!');
}

main().catch(err => {
  console.error('Model generation failed:', err);
  process.exit(1);
});
