export interface ProductColor {
  name: string;
  hex: string;
  accentHex?: string;
}

export interface TechnicalSpecs {
  material: string;
  weight: string;
  fit: string;
  care: string;
  origin: string;
  hardware?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  currency: string;
  modelPath: string;
  type: 'hoodie' | 'tshirt' | 'jacket' | 'cargo';
  description: string;
  badge?: string;
  colors: ProductColor[];
  sizes: string[];
  technicalSpecs: TechnicalSpecs;
  features: string[];
  stripePaymentUrl: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'nova-cyber-hoodie',
    name: 'OBLIVION // 01 HOODIE',
    tagline: 'Heavyweight Architectural Oversized Hoodie',
    category: 'Outerwear / Heavy Fleece',
    price: 240,
    currency: '$',
    modelPath: '/models/hoodie.glb',
    type: 'hoodie',
    badge: 'ARCHIVE ESSENTIAL',
    description:
      'Engineered with an ultra-dense 520 GSM organic French terry, the Oblivion 01 represents technical minimalism. Featuring a sculpted double-layered hood, dropped articulation seams, and custom matte-anodized aglets.',
    colors: [
      { name: 'Void Obsidian', hex: '#161619', accentHex: '#d4ff00' },
      { name: 'Arctic Ghost', hex: '#d2d5dc', accentHex: '#00ff87' },
      { name: 'Acid Phosphor', hex: '#5b6b15', accentHex: '#d4ff00' },
      { name: 'Cobalt Spec', hex: '#1b2234', accentHex: '#38bdf8' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    technicalSpecs: {
      material: '100% Organic Heavyweight French Terry',
      weight: '520 GSM',
      fit: 'Relaxed Architectural Drop-Shoulder',
      care: 'Cold wash inside out / Lay flat to dry',
      origin: 'Kobe, Japan / Assembled in Portugal',
      hardware: 'Custom CNC Aluminum Aglets with Laser-Etched Serial',
    },
    features: [
      'Ergonomic multi-panel hood geometry',
      'Concealed storm seam pockets with magnetic latch',
      'Ribbed side expansion gussets for anatomical mobility',
      'Dual-pass silicone heat-seal logo typography',
    ],
    // Replace with your real Stripe Payment Link (e.g., https://buy.stripe.com/...)
    stripePaymentUrl: 'https://buy.stripe.com/test_hoodie_placeholder_link',
  },
  {
    id: 'nova-stealth-tee',
    name: 'KINETIC // 02 TEE',
    tagline: 'Technical Structured Box-Cut T-Shirt',
    category: 'Tops / Heavy Jersey',
    price: 110,
    currency: '$',
    modelPath: '/models/tshirt.glb',
    type: 'tshirt',
    badge: 'NEW RELEASE',
    description:
      'A dense 310 GSM combed cotton silhouette designed with a structured crew-collar that resists deformation. Reinforced double-needle coverstitch with subtle high-density typography.',
    colors: [
      { name: 'Core Pitch', hex: '#121215', accentHex: '#00ff87' },
      { name: 'Chalk Bone', hex: '#e8e8e6', accentHex: '#121215' },
      { name: 'Stealth Olive', hex: '#262c23', accentHex: '#d4ff00' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    technicalSpecs: {
      material: '100% Combed Compact Cotton',
      weight: '310 GSM High-Density Jersey',
      fit: 'Boxy Cropped Modular Fit',
      care: 'Cold gentle cycle / Do not tumble dry',
      origin: 'Osaka, Japan',
      hardware: 'Woven Jacquard Internal Specification Label',
    },
    features: [
      'Double-ribbed anti-stretch neckline',
      'Ultrasonic bonded interior seams for zero friction',
      'Micro-reflective reflective hem tag',
      'High-contrast technical typography chest strip',
    ],
    stripePaymentUrl: 'https://buy.stripe.com/test_tee_placeholder_link',
  },
  {
    id: 'nova-exo-windbreaker',
    name: 'EXO-SHELL // 03 PARKA',
    tagline: '3-Layer Modular Stormproof Membrane',
    category: 'Outerwear / Technical Shell',
    price: 420,
    currency: '$',
    modelPath: '/models/hoodie.glb', // Fallback or shares hoodie geometry until custom glb added
    type: 'jacket',
    badge: 'LIMITED EDITION',
    description:
      'Engineered for unpredictable urban climates. Features a breathable 20,000mm hydrostatic head membrane, Fidlock magnetic cinch closures, and articulated storm visor.',
    colors: [
      { name: 'Stealth Black', hex: '#0f1013', accentHex: '#d4ff00' },
      { name: 'Glacier Silver', hex: '#8e96a4', accentHex: '#00ff87' },
    ],
    sizes: ['M', 'L', 'XL'],
    technicalSpecs: {
      material: '3-Layer eVent® Ripstop Nylon Membrane',
      weight: '20,000mm Waterproof / 15,000g Breathability',
      fit: 'Modular Anatomical Shell',
      care: 'DWR reactivation wash only',
      origin: 'Munich, Germany',
      hardware: 'YKK Aquaguard® Matte Zippers + Fidlock® V-Buckles',
    },
    features: [
      'Fully taped 13mm micro-seams',
      'Deployable concealed storm hood with 3-point pull',
      'Laser-perforated underarm ventilation ports',
      'Internal sling harness system for hands-free carry',
    ],
    stripePaymentUrl: 'https://buy.stripe.com/test_windbreaker_placeholder_link',
  },
  {
    id: 'nova-cargo-pant',
    name: 'VECTOR // 04 PANT',
    tagline: 'Articulated Technical Cordura Cargo Trousers',
    category: 'Bottoms / Technical Twill',
    price: 290,
    currency: '$',
    modelPath: '/models/hoodie.glb', // Fallback or shares model until pants glb added
    type: 'cargo',
    badge: 'TECHNICAL LAB',
    description:
      'Constructed with Cordura® 4-way stretch ripstop. Engineered with articulated knee darts, modular MOLLE webbing channels, and magnetic expandable cargo bellows.',
    colors: [
      { name: 'Dark Slate', hex: '#14161b', accentHex: '#d4ff00' },
      { name: 'Titanium Olive', hex: '#1c221c', accentHex: '#00ff87' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    technicalSpecs: {
      material: 'Cordura® Combat Wool & Stretch Ripstop',
      weight: '340 GSM',
      fit: 'Tapered Ergonomic Knee Contour',
      care: 'Machine wash 30°C / Hang dry',
      origin: 'Seoul, South Korea',
      hardware: 'Cobra® Style Quick-Release Buckles',
    },
    features: [
      'Gusseted crotch diamond panel for 180° leg extension',
      'Dual magnetic flap cargo compartments',
      'Reinforced heel scuff guards',
      'Adjustable cinch cuffs with snap tensioners',
    ],
    stripePaymentUrl: 'https://buy.stripe.com/test_pant_placeholder_link',
  },
];

export const BRAND_INFO = {
  name: 'NOVA // ARCHIVE',
  shortName: 'NOVA',
  season: 'FALL / WINTER 2026',
  tagline: 'AVANT-GARDE TECHNICAL COUTURE FOR THE METAVERSE & PHYSICAL SPHERE',
  coordinates: '34°41\'24.8"N 135°11\'44.2"E // LAB-09',
  contactEmail: 'atelier@nova-archive.io',
  socials: {
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    discord: 'https://discord.com',
  },
};
