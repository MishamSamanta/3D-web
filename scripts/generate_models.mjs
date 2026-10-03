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

// -------------------------------------------------------------
// CYBERPUNK TECHWEAR AURA HOODIE // JACKET MODEL BUILDER
// -------------------------------------------------------------
function createAuraTechJacketModel() {
  const root = new THREE.Group();
  root.name = 'Aura_Tech_Hoodie_Model';

  // --- High-tech Materials ---
  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x14151a,
    roughness: 0.78,
    metalness: 0.12,
    name: 'FabricMaterial',
  });

  const secondaryMat = new THREE.MeshStandardMaterial({
    color: 0x1d2028,
    roughness: 0.65,
    metalness: 0.18,
    name: 'SecondaryFabric',
  });

  const neonPipingMat = new THREE.MeshStandardMaterial({
    color: 0xd4ff00,
    emissive: 0xd4ff00,
    emissiveIntensity: 1.8,
    roughness: 0.2,
    metalness: 0.1,
    name: 'NeonPiping',
  });

  const hardwareMat = new THREE.MeshStandardMaterial({
    color: 0x1e2025,
    roughness: 0.28,
    metalness: 0.92,
    name: 'HardwareMaterial',
  });

  const webbingMat = new THREE.MeshStandardMaterial({
    color: 0x0c0d10,
    roughness: 0.88,
    metalness: 0.05,
    name: 'WebbingMaterial',
  });

  const zipperTrackMat = new THREE.MeshStandardMaterial({
    color: 0x101114,
    roughness: 0.4,
    metalness: 0.8,
    name: 'ZipperTrack',
  });

  const insigniaMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.5,
    roughness: 0.3,
    metalness: 0.3,
    name: 'InsigniaMaterial',
  });

  // --- 1. Anatomical Torso Silhouette ---
  // Main upper body
  const torsoGroup = new THREE.Group();

  const upperTorsoGeo = new THREE.CylinderGeometry(0.74, 0.70, 0.85, 32);
  upperTorsoGeo.scale(1.22, 1, 0.82);
  const upperTorso = new THREE.Mesh(upperTorsoGeo, fabricMat);
  upperTorso.position.y = 0.25;
  upperTorso.castShadow = true;
  upperTorso.receiveShadow = true;
  torsoGroup.add(upperTorso);

  // Lower waist/body
  const lowerTorsoGeo = new THREE.CylinderGeometry(0.70, 0.68, 0.75, 32);
  lowerTorsoGeo.scale(1.2, 1, 0.8);
  const lowerTorso = new THREE.Mesh(lowerTorsoGeo, fabricMat);
  lowerTorso.position.y = -0.45;
  lowerTorso.castShadow = true;
  torsoGroup.add(lowerTorso);

  // Tactical Ribbed Bottom Hem
  const hemGeo = new THREE.CylinderGeometry(0.67, 0.66, 0.18, 32);
  hemGeo.scale(1.2, 1, 0.8);
  const hem = new THREE.Mesh(hemGeo, secondaryMat);
  hem.position.y = -0.88;
  torsoGroup.add(hem);

  // Neon piping running along the bottom hem border
  const hemPipingGeo = new THREE.TorusGeometry(0.75, 0.016, 12, 48);
  hemPipingGeo.scale(1.08, 0.72, 1);
  const hemPiping = new THREE.Mesh(hemPipingGeo, neonPipingMat);
  hemPiping.rotation.x = Math.PI / 2;
  hemPiping.position.y = -0.88;
  torsoGroup.add(hemPiping);

  // --- 2. Shoulder Yokes & Tactical Pauldron Plates ---
  const createShoulderYoke = (isLeft) => {
    const sign = isLeft ? -1 : 1;
    const yoke = new THREE.Group();

    const yokeGeo = new THREE.BoxGeometry(0.48, 0.15, 0.55);
    const yokeMesh = new THREE.Mesh(yokeGeo, secondaryMat);
    yokeMesh.castShadow = true;
    yoke.add(yokeMesh);

    // Glowing neon border trim on shoulder yoke
    const trimGeo = new THREE.BoxGeometry(0.5, 0.02, 0.57);
    const trim = new THREE.Mesh(trimGeo, neonPipingMat);
    yoke.add(trim);

    yoke.position.set(sign * 0.76, 0.66, 0.02);
    yoke.rotation.z = sign * -0.22;
    return yoke;
  };
  torsoGroup.add(createShoulderYoke(true));
  torsoGroup.add(createShoulderYoke(false));

  // --- 3. Tactical Chest Webbing Harness & Buckles ---
  const harnessGroup = new THREE.Group();

  // Vertical harness straps over shoulders
  const createVerticalHarness = (isLeft) => {
    const sign = isLeft ? -1 : 1;
    const strapGroup = new THREE.Group();

    // Front vertical strap
    const strapGeo = new THREE.BoxGeometry(0.09, 0.75, 0.025);
    const strap = new THREE.Mesh(strapGeo, webbingMat);
    strap.position.set(0, 0, 0);
    strapGroup.add(strap);

    // Neon piping along outer edge of strap
    const edgePipingGeo = new THREE.BoxGeometry(0.015, 0.76, 0.03);
    const edgePiping = new THREE.Mesh(edgePipingGeo, neonPipingMat);
    edgePiping.position.set(sign * 0.048, 0, 0);
    strapGroup.add(edgePiping);

    // Metal D-Ring near clavicle
    const dRingGeo = new THREE.TorusGeometry(0.045, 0.012, 10, 20, Math.PI);
    const dRing = new THREE.Mesh(dRingGeo, hardwareMat);
    dRing.position.set(0, 0.22, 0.02);
    dRing.rotation.z = Math.PI;
    strapGroup.add(dRing);

    strapGroup.position.set(sign * 0.44, 0.35, 0.49);
    strapGroup.rotation.x = -0.05;
    return strapGroup;
  };

  harnessGroup.add(createVerticalHarness(true));
  harnessGroup.add(createVerticalHarness(false));

  // Horizontal Cross-Chest Strap
  const crossStrapGeo = new THREE.BoxGeometry(0.88, 0.09, 0.025);
  const crossStrap = new THREE.Mesh(crossStrapGeo, webbingMat);
  crossStrap.position.set(0, 0.16, 0.51);
  harnessGroup.add(crossStrap);

  // Center Quick-Release Cobra / Tactical Buckle
  const buckleGroup = new THREE.Group();
  const buckleBaseGeo = new THREE.BoxGeometry(0.18, 0.12, 0.05);
  const buckleBase = new THREE.Mesh(buckleBaseGeo, hardwareMat);
  buckleGroup.add(buckleBase);

  // Buckle release latch tabs
  const latchL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.05, 0.06), neonPipingMat);
  latchL.position.set(-0.09, 0, 0);
  buckleGroup.add(latchL);
  const latchR = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.05, 0.06), neonPipingMat);
  latchR.position.set(0.09, 0, 0);
  buckleGroup.add(latchR);

  // Hanging tactical cinch strap below buckle
  const hangingStrapGeo = new THREE.BoxGeometry(0.07, 0.42, 0.02);
  const hangingStrap = new THREE.Mesh(hangingStrapGeo, webbingMat);
  hangingStrap.position.set(0, -0.25, 0.01);
  hangingStrap.rotation.x = 0.08;
  buckleGroup.add(hangingStrap);

  // Aglet tip on hanging strap
  const strapTipGeo = new THREE.BoxGeometry(0.08, 0.03, 0.03);
  const strapTip = new THREE.Mesh(strapTipGeo, hardwareMat);
  strapTip.position.set(0, -0.46, 0.02);
  buckleGroup.add(strapTip);

  buckleGroup.position.set(0, 0.16, 0.54);
  harnessGroup.add(buckleGroup);

  torsoGroup.add(harnessGroup);

  // --- 4. Central Asymmetric Storm Zipper with Glowing Neon Trim ---
  const zipperGroup = new THREE.Group();

  // Full length zipper track
  const trackGeo = new THREE.BoxGeometry(0.045, 1.48, 0.02);
  const track = new THREE.Mesh(trackGeo, zipperTrackMat);
  zipperGroup.add(track);

  // Left neon glow piping along zipper
  const zipNeonL = new THREE.Mesh(new THREE.BoxGeometry(0.015, 1.48, 0.025), neonPipingMat);
  zipNeonL.position.set(-0.03, 0, 0);
  zipperGroup.add(zipNeonL);

  // Right neon glow piping along zipper
  const zipNeonR = new THREE.Mesh(new THREE.BoxGeometry(0.015, 1.48, 0.025), neonPipingMat);
  zipNeonR.position.set(0.03, 0, 0);
  zipperGroup.add(zipNeonR);

  // Heavy Metal Zipper Slider & Pull Tab
  const slider = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.1, 0.05), hardwareMat);
  slider.position.set(0, 0.48, 0.02);
  zipperGroup.add(slider);

  const pullTab = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.16, 0.015), neonPipingMat);
  pullTab.position.set(0, 0.38, 0.045);
  pullTab.rotation.x = 0.15;
  zipperGroup.add(pullTab);

  zipperGroup.position.set(0, 0, 0.50);
  torsoGroup.add(zipperGroup);

  // --- 5. "NOVA" Tactical Chest Insignia ---
  // Background patch plate
  const patchPlate = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.09, 0.02), secondaryMat);
  patchPlate.position.set(0, 0.42, 0.515);
  torsoGroup.add(patchPlate);

  // Letters "NOVA" modeled in 3D typography geometry
  const createLetterMesh = (width, height, xOffset) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.015), insigniaMat);
    m.position.set(xOffset, 0.42, 0.525);
    return m;
  };
  // N
  torsoGroup.add(createLetterMesh(0.035, 0.06, -0.075));
  // O
  torsoGroup.add(createLetterMesh(0.038, 0.06, -0.025));
  // V
  torsoGroup.add(createLetterMesh(0.035, 0.06, 0.025));
  // A
  torsoGroup.add(createLetterMesh(0.035, 0.06, 0.075));

  // --- 6. Lower Torso Tactical Storm Cargo Pockets ---
  const createStormPocket = (isLeft) => {
    const sign = isLeft ? -1 : 1;
    const pocketGroup = new THREE.Group();

    // Pocket main body
    const bodyGeo = new THREE.BoxGeometry(0.38, 0.38, 0.12);
    const body = new THREE.Mesh(bodyGeo, secondaryMat);
    body.castShadow = true;
    pocketGroup.add(body);

    // Top angled flap
    const flapGeo = new THREE.BoxGeometry(0.40, 0.12, 0.14);
    const flap = new THREE.Mesh(flapGeo, fabricMat);
    flap.position.set(0, 0.15, 0.01);
    pocketGroup.add(flap);

    // Glowing neon zipper slit across pocket
    const zipSlitGeo = new THREE.BoxGeometry(0.32, 0.018, 0.13);
    const zipSlit = new THREE.Mesh(zipSlitGeo, neonPipingMat);
    zipSlit.position.set(0, 0.04, 0.06);
    pocketGroup.add(zipSlit);

    // Cinch pull loop
    const loopGeo = new THREE.BoxGeometry(0.04, 0.12, 0.02);
    const loop = new THREE.Mesh(loopGeo, neonPipingMat);
    loop.position.set(sign * 0.1, -0.16, 0.06);
    pocketGroup.add(loop);

    pocketGroup.position.set(sign * 0.42, -0.38, 0.46);
    pocketGroup.rotation.y = sign * 0.15;
    pocketGroup.rotation.z = sign * -0.06;
    return pocketGroup;
  };
  torsoGroup.add(createStormPocket(true));
  torsoGroup.add(createStormPocket(false));

  root.add(torsoGroup);

  // --- 7. High Tactical Storm Cowl & Hood System ---
  const hoodSystem = new THREE.Group();
  hoodSystem.position.set(0, 0.74, 0.05);

  // High Storm Cowl / Inner Collar (covers neck like technical collar)
  const cowlGeo = new THREE.CylinderGeometry(0.36, 0.44, 0.38, 32, 1, true);
  cowlGeo.scale(1.15, 1, 0.95);
  const cowl = new THREE.Mesh(cowlGeo, fabricMat);
  cowl.position.set(0, 0.12, 0.06);
  hoodSystem.add(cowl);

  // Front zipper extension on collar
  const cowlZipGeo = new THREE.BoxGeometry(0.04, 0.36, 0.03);
  const cowlZip = new THREE.Mesh(cowlZipGeo, zipperTrackMat);
  cowlZip.position.set(0, 0.12, 0.48);
  hoodSystem.add(cowlZip);

  // Neon collar rim piping
  const collarPipingGeo = new THREE.TorusGeometry(0.36, 0.018, 12, 36);
  collarPipingGeo.scale(1.15, 0.95, 1);
  const collarPiping = new THREE.Mesh(collarPipingGeo, neonPipingMat);
  collarPiping.rotation.x = Math.PI / 2;
  collarPiping.position.set(0, 0.28, 0.06);
  hoodSystem.add(collarPiping);

  // Outer Aerodynamic Sculpted Hood
  const hoodGroup = new THREE.Group();
  hoodGroup.position.set(0, 0.24, -0.14);

  // Hood dome
  const hoodOuterGeo = new THREE.SphereGeometry(0.55, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.74);
  hoodOuterGeo.scale(0.96, 1.14, 1.12);
  const hoodOuter = new THREE.Mesh(hoodOuterGeo, fabricMat);
  hoodOuter.castShadow = true;
  hoodGroup.add(hoodOuter);

  // Internal lining
  const hoodInnerGeo = new THREE.SphereGeometry(0.52, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.72);
  hoodInnerGeo.scale(0.94, 1.12, 1.10);
  const hoodInner = new THREE.Mesh(hoodInnerGeo, secondaryMat);
  hoodGroup.add(hoodInner);

  // Cyber Lime Piping tracing the hood aperture face rim
  const faceRimGeo = new THREE.TorusGeometry(0.48, 0.022, 16, 40, Math.PI * 1.35);
  const faceRim = new THREE.Mesh(faceRimGeo, neonPipingMat);
  faceRim.rotation.x = Math.PI * 0.44;
  faceRim.position.set(0, 0.06, 0.32);
  hoodGroup.add(faceRim);

  // Central racing stripe down center spine of hood
  const hoodStripeGeo = new THREE.BoxGeometry(0.04, 0.95, 0.02);
  const hoodStripe = new THREE.Mesh(hoodStripeGeo, neonPipingMat);
  hoodStripe.position.set(0, 0.28, -0.32);
  hoodStripe.rotation.x = -0.55;
  hoodGroup.add(hoodStripe);

  hoodSystem.add(hoodGroup);
  root.add(hoodSystem);

  // --- 8. Articulated Segmented Sleeves with Tactical Cargo Pouches ---
  const createArticulatedSleeve = (isLeft) => {
    const sign = isLeft ? -1 : 1;
    const sleeve = new THREE.Group();

    // Upper Arm
    const upperGeo = new THREE.CylinderGeometry(0.30, 0.25, 0.85, 24);
    const upper = new THREE.Mesh(upperGeo, fabricMat);
    upper.position.set(0, -0.36, 0);
    upper.castShadow = true;
    sleeve.add(upper);

    // Glowing Neon Vertical Seam Stripe along outer bicep
    const bicepStripeGeo = new THREE.BoxGeometry(0.02, 0.82, 0.025);
    const bicepStripe = new THREE.Mesh(bicepStripeGeo, neonPipingMat);
    bicepStripe.position.set(sign * 0.28, -0.36, 0);
    sleeve.add(bicepStripe);

    // Bicep Utility Cargo Pouch on Left Sleeve (or subtle flap on right)
    const armPouchGroup = new THREE.Group();
    const pouchBody = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.24, 0.12), secondaryMat);
    armPouchGroup.add(pouchBody);

    const pouchFlap = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.08, 0.13), fabricMat);
    pouchFlap.position.set(0, 0.1, 0.01);
    armPouchGroup.add(pouchFlap);

    const pouchNeonTrim = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.24, 0.02), neonPipingMat);
    pouchNeonTrim.position.set(0, 0, 0.065);
    armPouchGroup.add(pouchNeonTrim);

    const pouchBuckle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.03), hardwareMat);
    pouchBuckle.position.set(0, 0.02, 0.075);
    armPouchGroup.add(pouchBuckle);

    armPouchGroup.position.set(sign * 0.26, -0.28, 0.04);
    armPouchGroup.rotation.y = sign * -Math.PI / 2;
    sleeve.add(armPouchGroup);

    // Articulated Elbow Joint (Segmented ribbed accordion section)
    const elbowGeo = new THREE.CylinderGeometry(0.25, 0.23, 0.22, 24);
    const elbow = new THREE.Mesh(elbowGeo, secondaryMat);
    elbow.position.set(sign * 0.05, -0.86, 0.02);
    sleeve.add(elbow);

    const elbowRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.015, 8, 24), neonPipingMat);
    elbowRing1.rotation.x = Math.PI / 2;
    elbowRing1.position.set(sign * 0.05, -0.80, 0.02);
    sleeve.add(elbowRing1);

    // Forearm
    const foreGeo = new THREE.CylinderGeometry(0.23, 0.19, 0.82, 24);
    const fore = new THREE.Mesh(foreGeo, fabricMat);
    fore.position.set(sign * 0.12, -1.32, 0.08);
    fore.rotation.z = sign * -0.12;
    fore.castShadow = true;
    sleeve.add(fore);

    // Forearm neon accent bar
    const foreNeon = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.72, 0.025), neonPipingMat);
    foreNeon.position.set(sign * 0.32, -1.32, 0.08);
    foreNeon.rotation.z = sign * -0.12;
    sleeve.add(foreNeon);

    // Tactical Wrist Cinch Cuff with Strap & Metal Buckle
    const cuffGroup = new THREE.Group();
    const cuffGeo = new THREE.CylinderGeometry(0.19, 0.18, 0.22, 24);
    const cuff = new THREE.Mesh(cuffGeo, secondaryMat);
    cuffGroup.add(cuff);

    // Neon cuff ring
    const cuffNeon = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.018, 10, 24), neonPipingMat);
    cuffNeon.rotation.x = Math.PI / 2;
    cuffNeon.position.y = -0.06;
    cuffGroup.add(cuffNeon);

    // Velcro cinch tab with buckle
    const strapTab = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.03), webbingMat);
    strapTab.position.set(sign * 0.12, 0.02, 0.10);
    cuffGroup.add(strapTab);

    const cuffBuckle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.02), hardwareMat);
    cuffBuckle.position.set(sign * 0.19, 0.02, 0.10);
    cuffGroup.add(cuffBuckle);

    cuffGroup.position.set(sign * 0.22, -1.78, 0.14);
    cuffGroup.rotation.z = sign * -0.15;
    sleeve.add(cuffGroup);

    // Arm anchor positioning & natural drop angle
    sleeve.position.set(sign * 0.98, 0.62, 0.02);
    sleeve.rotation.z = sign * -0.32;
    sleeve.rotation.y = sign * 0.08;
    sleeve.rotation.x = 0.06;
    return sleeve;
  };

  root.add(createArticulatedSleeve(true));
  root.add(createArticulatedSleeve(false));

  // --- 9. Rear Holographic Heat-Transfer Specs ---
  const rearPatch = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.28, 0.02), secondaryMat);
  rearPatch.position.set(0, 0.25, -0.44);
  root.add(rearPatch);

  const rearNeonStrip = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.02, 0.025), neonPipingMat);
  rearNeonStrip.position.set(0, 0.36, -0.445);
  root.add(rearNeonStrip);

  // Global scale & center pivot
  root.scale.set(1.42, 1.42, 1.42);
  root.position.y = 0.22;

  const scene = new THREE.Scene();
  scene.add(root);
  return scene;
}

// -------------------------------------------------------------
// CYBERPUNK KINETIC TEE MODEL BUILDER
// -------------------------------------------------------------
function createKineticTeeModel() {
  const root = new THREE.Group();
  root.name = 'Kinetic_Tee_Model';

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x121215,
    roughness: 0.85,
    metalness: 0.06,
    name: 'FabricMaterial',
  });

  const secondaryMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a20,
    roughness: 0.72,
    metalness: 0.12,
    name: 'SecondaryFabric',
  });

  const neonPipingMat = new THREE.MeshStandardMaterial({
    color: 0x00ff87,
    emissive: 0x00ff87,
    emissiveIntensity: 1.5,
    roughness: 0.2,
    metalness: 0.1,
    name: 'NeonPiping',
  });

  const insigniaMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.4,
    roughness: 0.3,
    metalness: 0.3,
    name: 'InsigniaMaterial',
  });

  // Torso
  const torsoGeo = new THREE.CylinderGeometry(0.70, 0.68, 1.42, 32);
  torsoGeo.scale(1.18, 1, 0.72);
  const torso = new THREE.Mesh(torsoGeo, fabricMat);
  torso.castShadow = true;
  root.add(torso);

  // High structured collar with double ribbing
  const collarGeo = new THREE.TorusGeometry(0.32, 0.048, 16, 36);
  const collar = new THREE.Mesh(collarGeo, secondaryMat);
  collar.rotation.x = Math.PI / 2;
  collar.position.set(0, 0.72, 0);
  root.add(collar);

  // Neon collar piping
  const collarNeon = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.014, 12, 36), neonPipingMat);
  collarNeon.rotation.x = Math.PI / 2;
  collarNeon.position.set(0, 0.74, 0);
  root.add(collarNeon);

  // Short Boxy Sleeves with Neon Seams
  const createShortSleeve = (isLeft) => {
    const sign = isLeft ? -1 : 1;
    const sleeve = new THREE.Group();

    const armGeo = new THREE.CylinderGeometry(0.26, 0.24, 0.58, 24);
    const arm = new THREE.Mesh(armGeo, fabricMat);
    arm.position.y = -0.24;
    arm.castShadow = true;
    sleeve.add(arm);

    // Neon cuff rim
    const cuffNeon = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.015, 12, 24), neonPipingMat);
    cuffNeon.rotation.x = Math.PI / 2;
    cuffNeon.position.y = -0.52;
    sleeve.add(cuffNeon);

    sleeve.position.set(sign * 0.88, 0.58, 0);
    sleeve.rotation.z = sign * -0.52;
    return sleeve;
  };

  root.add(createShortSleeve(true));
  root.add(createShortSleeve(false));

  // Chest High-Density Typography Strip
  const chestPatch = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.08, 0.02), secondaryMat);
  chestPatch.position.set(0, 0.28, 0.46);
  root.add(chestPatch);

  const chestNeonBar = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.015, 0.025), neonPipingMat);
  chestNeonBar.position.set(0, 0.32, 0.47);
  root.add(chestNeonBar);

  const logoText = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.035, 0.025), insigniaMat);
  logoText.position.set(0, 0.26, 0.47);
  root.add(logoText);

  // Hem neon trim
  const hemNeon = new THREE.Mesh(new THREE.TorusGeometry(0.70, 0.015, 12, 36), neonPipingMat);
  hemNeon.scale.set(1.16, 0.72, 1);
  hemNeon.rotation.x = Math.PI / 2;
  hemNeon.position.y = -0.71;
  root.add(hemNeon);

  root.scale.set(1.42, 1.42, 1.42);
  root.position.y = 0.22;

  const scene = new THREE.Scene();
  scene.add(root);
  return scene;
}

async function main() {
  console.log('Generating high-end cyberpunk techwear garment models...');
  const jacketScene = createAuraTechJacketModel();
  await exportSceneToGLB(jacketScene, path.join(outDir, 'hoodie.glb'));

  const teeScene = createKineticTeeModel();
  await exportSceneToGLB(teeScene, path.join(outDir, 'tshirt.glb'));

  console.log('Cyberpunk 3D models generated and saved successfully!');
}

main().catch(err => {
  console.error('Failed to generate models:', err);
  process.exit(1);
});
