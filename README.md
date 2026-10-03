# NOVA // ARCHIVE — 3D Cinematic E-Commerce Showcase

An immersive, production-grade 3D e-commerce experience built for avant-garde streetwear. Engineered with a single full-screen WebGL Canvas orchestrated with Lenis smooth scrolling, GSAP ScrollTrigger, React Three Fiber, and Tailwind CSS.

---

## Architecture & Technology Stack

- **Framework**: Vite + React 18/19 + TypeScript
- **3D Engine**: Three.js (`three`), `@react-three/fiber`, `@react-three/drei`
- **Post-Processing**: `@react-three/postprocessing` (Selective Bloom & Cinematic Vignette)
- **Smooth Scrolling & Motion**: Lenis + GSAP with `ScrollTrigger`
- **Styling**: Tailwind CSS + Custom Glassmorphism & Cyberpunk Design System
- **Icons**: `lucide-react`
- **Audio Feedback**: Procedural Web Audio API synthesizer (no MP3 files required)
- **State Management**: React Context (`CartContext` & `SceneContext`)
- **Deploy Target**: Vercel (zero-config static Vite build)

---

## 7 Interactive Scroll Stages

1. **HERO SECTION**: Atmospheric dark void scene with floating hero garment (`drei <Float>`), responsive cursor-follow parallax tilt, huge background brand typography, and live telemetry coordinates.
2. **MACRO ZOOM-IN**: Smooth camera dolly in on the garment until the fabric fills the screen, revealing knit density, double-pass seams, and technical HUD callouts.
3. **3D UNFOLDING PRODUCT PANEL**: Perspective 3D unfolding card with live colorway swatches modulating Three.js materials in real-time, size selector, "Add to Bag" action, direct Stripe link, and interactive **Drag to Rotate 3D Model** toggle (`OrbitControls`).
4. **3D COLLECTION CAROUSEL**: Smooth transition into a 3D carousel of archive garments. Hovering lifts and elevates any model; clicking loads its full specifications.
5. **360° ANATOMICAL BREAKDOWN**: Scroll-synchronized 360-degree rotation of the garment with technical callout cards for fabric, fit, care, and origin.
6. **BRAND MANIFESTO**: High-contrast editorial narrative with floating geometric 3D shards responding to scroll inertia.
7. **FOOTER & ORDER DISPATCH**: Bag summary, one-click checkout trigger, newsletter signup with instant validation, atelier contacts, and social channels.

---

## 3D Asset Management & Swapping Models

### 1. File Location
All 3D models are served from:
```
public/models/
├── hoodie.glb    # Default hero garment model
└── tshirt.glb    # Alternate tee silhouette
```

### 2. Swapping In Your Own Models
To replace the placeholder models with your custom garments:
1. Export your 3D clothing as a standard **GLB** (`.glb`) file from Blender, CLO3D, Marvelous Designer, Sketchfab, or Fab.
2. Rename your file to `hoodie.glb` or `tshirt.glb` and drop it into `public/models/`.
3. If you want to add new garments with different names (e.g. `jacket.glb`), simply open `src/data/products.ts` and update the `modelPath`:
   ```ts
   modelPath: '/models/jacket.glb',
   ```
4. **No code changes are required** to switch models.

### 3. Procedural Fallback Engine
If a `.glb` file is missing, corrupt, or fails network loading, the engine will **never crash**. Instead, it automatically logs a descriptive console warning and displays an animated procedural 3D wireframe garment with holographic measurement rings.

---

## Compressing 3D Models with `gltf-transform`

To guarantee 60 FPS performance and fast loading on mobile networks, compress your raw `.glb` files using the `gltf-transform` CLI:

```bash
# 1. Install gltf-transform CLI globally or use npx
npx @gltf-transform/cli --help

# 2. Run deduplication, Draco geometry compression, WebP texture conversion, and quantization:
npx @gltf-transform/cli optimize input.glb public/models/hoodie.glb \
  --draco \
  --texture-compress webp \
  --quantize
```

This typically reduces file size by **70% to 90%** with imperceptible visual loss.

---

## Editing Products & Stripe Checkout Links

All products, pricing, sizes, colorways, and Stripe links live in a single file:
👉 **[`src/data/products.ts`](file:///src/data/products.ts)**

```ts
export const PRODUCTS: Product[] = [
  {
    id: 'nova-cyber-hoodie',
    name: 'OBLIVION // 01 HOODIE',
    tagline: 'Heavyweight Architectural Oversized Hoodie',
    price: 240,
    currency: '$',
    modelPath: '/models/hoodie.glb',
    colors: [
      { name: 'Void Obsidian', hex: '#161619', accentHex: '#d4ff00' },
      { name: 'Arctic Ghost', hex: '#d2d5dc', accentHex: '#00ff87' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    // REPLACE THIS WITH YOUR STRIPE PAYMENT LINK:
    stripePaymentUrl: 'https://buy.stripe.com/your_live_link_here',
  },
  // ...
];
```

---

## Deploying to Vercel

This project is a static React Vite single-page application and deploys to Vercel in 1 click:

1. Push your repository to GitHub.
2. In Vercel, click **"Add New Project"** and import the repository.
3. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.
