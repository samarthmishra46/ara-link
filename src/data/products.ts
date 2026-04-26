import type { Product, AddOn } from "@/types";

export const products: Product[] = [
  {
    id: "ara-ice-bowl",
    name: "ARA Ice Bowl",
    slug: "ara-ice-bowl",
    description: "The Last Ice Bowl You'll Ever Argue About. ARA doesn't compete for shelf space with your 12-step routine. It either becomes the first thing you do every morning — or it doesn't belong in your life.",
    shortDescription: "Premium cold therapy skincare bowl for professional ice facials",
    price: 1499,
    originalPrice: 1999,
    images: ["/products/ara-ice-bowl-1.jpg", "/products/ara-ice-bowl-2.jpg", "/products/ara-ice-bowl-3.jpg"],
    category: "Cold Therapy",
    stock: 17,
    sku: "ARA-001",
    features: [
      "Medical-grade silicone rim for perfect seal",
      "Ergonomic design for comfortable use",
      "Built-in ice tray compartment",
      "Food-grade materials",
      "Easy to clean and maintain",
      "Perfect for daily skincare rituals"
    ],
    variants: [
      { id: "glacier-white", name: "Glacier White", colorCode: "linear-gradient(135deg, #e8f4f8, #a8d5e0)", additionalPrice: 0, stock: 8 },
      { id: "midnight-frost", name: "Midnight Frost", colorCode: "linear-gradient(135deg, #1a1a2e, #0a0a18)", additionalPrice: 0, stock: 5 },
      { id: "arctic-sage", name: "Arctic Sage", colorCode: "linear-gradient(135deg, #b8d4c8, #6a9e8e)", additionalPrice: 0, stock: 4 },
    ],
    rating: 4.9,
    reviewCount: 847,
    badges: ["Cold Therapy", "Limited Stock"],
    isFeatured: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "ara-ritual-kit",
    name: "ARA Complete Ritual Kit",
    slug: "ara-ritual-kit",
    description: "Everything you need to start your cold therapy journey. Includes the ARA Ice Bowl, Rose Water Concentrate, and Microfibre Pat Towel.",
    shortDescription: "Complete cold therapy starter kit",
    price: 2199,
    originalPrice: 2847,
    images: ["/products/ara-kit-1.jpg", "/products/ara-kit-2.jpg"],
    category: "Kits",
    stock: 12,
    sku: "ARA-KIT-001",
    features: [
      "ARA Ice Bowl included",
      "Rose Water Concentrate (50ml)",
      "Microfibre Pat Towel",
      "Digital ritual guide",
      "Premium packaging"
    ],
    rating: 5.0,
    reviewCount: 234,
    badges: ["Best Value", "Limited Edition"],
    isFeatured: true,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "rose-water-concentrate",
    name: "Rose Water Concentrate",
    slug: "rose-water-concentrate",
    description: "Add to your ARA bowl. Rose water reduces redness, tones skin, and amplifies the cold therapy effect. The professionals don't dip plain water.",
    shortDescription: "Premium rose water for enhanced cold therapy",
    price: 299,
    originalPrice: 499,
    images: ["/products/rose-water-1.jpg"],
    category: "Add-ons",
    stock: 45,
    sku: "ARA-RW-001",
    features: [
      "100% pure rose water",
      "No artificial preservatives",
      "50ml bottle",
      "Perfect for cold therapy",
      "Reduces redness and inflammation"
    ],
    rating: 4.8,
    reviewCount: 156,
    badges: ["Best Seller"],
    isFeatured: false,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "microfibre-towel",
    name: "ARA Microfibre Pat Towel",
    slug: "microfibre-towel",
    description: "Rubbing your face after cold therapy undoes half the work. This ultra-soft microfibre towel pats dry without friction. The right finish to the right ritual.",
    shortDescription: "Ultra-soft microfibre towel for post-therapy care",
    price: 199,
    originalPrice: 349,
    images: ["/products/towel-1.jpg"],
    category: "Add-ons",
    stock: 67,
    sku: "ARA-MT-001",
    features: [
      "Ultra-soft microfibre material",
      "No friction drying",
      "Quick-dry technology",
      "Gentle on sensitive skin",
      "Machine washable"
    ],
    rating: 4.7,
    reviewCount: 89,
    badges: [],
    isFeatured: false,
    createdAt: new Date("2024-01-25"),
  },
];

export const otoProducts: AddOn[] = [
  {
    id: "beetroot-powder",
    name: "Beetroot Powder",
    description: "Rich in betalains and natural nitrates. Dissolve in your ice bowl water for a deep-red anti-inflammatory soak that visibly brightens dull skin.",
    price: 249,
    originalPrice: 399,
    icon: "◉",
  },
  {
    id: "orange-peel-powder",
    name: "Orange Peel Powder",
    description: "Cold-pressed orange peel — dense with Vitamin C and natural AHAs. Pairs with ice therapy to tighten pores and even out skin tone in one step.",
    price: 199,
    originalPrice: 349,
    icon: "◌",
  },
  {
    id: "rose-powder",
    name: "Rose Powder",
    description: "Whole dried rose petals, finely milled. Add to your bowl for a calming, anti-inflammatory ritual. Reduces redness faster when combined with cold exposure.",
    price: 299,
    originalPrice: 449,
    icon: "✿",
  },
  {
    id: "mint-powder",
    name: "Mint Powder",
    description: "Cooling menthol meets cold therapy. Dissolve in ice water before dipping — the dual-cooling effect tightens capillaries and leaves skin visibly awake.",
    price: 199,
    originalPrice: 349,
    icon: "❋",
  },
];

export const addOns: AddOn[] = [
  {
    id: "rose-water",
    name: "Rose Water Concentrate (50ml)",
    description: "Add to your ARA bowl. Rose water reduces redness, tones skin, and amplifies the cold therapy effect.",
    price: 299,
    originalPrice: 499,
    icon: "🌹",
  },
  {
    id: "microfibre-towel",
    name: "ARA Ritual Kit — Microfibre Pat Towel",
    description: "Rubbing your face after cold therapy undoes half the work. This ultra-soft microfibre towel pats dry without friction.",
    price: 199,
    originalPrice: 349,
    icon: "🧖",
  },
  {
    id: "green-tea-bags",
    name: "Green Tea Ice Infusion Bags (30-pack)",
    description: "Freeze green tea instead of plain water. Antioxidants hit the skin during cold exposure for maximum absorption.",
    price: 499,
    originalPrice: 799,
    icon: "🌿",
    amazonLink: "https://amazon.in",
  },
];

export const reviews = [
  {
    id: 1,
    rating: 5,
    text: "I've been using a salad bowl for ice facials for two years. The difference is embarrassing. ARA's rim seals properly — I was losing 20 seconds every session. Now I don't.",
    author: "Rhea M.",
    role: "Dermatology Nurse, Mumbai",
    verified: true,
  },
  {
    id: 2,
    rating: 5,
    text: "My skincare spend dropped 40% the month after I started this consistently. My serums finally have clean, prepped skin to work on. First time in years they're actually doing their job.",
    author: "Arjun S.",
    role: "Athlete & Biohacker, Bangalore",
    verified: true,
  },
  {
    id: 3,
    rating: 5,
    text: "Gifted one to my mother. She called me three days later asking for two more for her friends. That's the only review ARA needs.",
    author: "Zara K.",
    role: "Brand Director, Delhi",
    verified: true,
  },
];

export const benefits = [
  {
    icon: "◎",
    title: "Pores Constrict Immediately",
    description: "Cold triggers vasoconstriction. Pores tighten in seconds. Your skin looks smoother before you've touched a single product.",
  },
  {
    icon: "↓",
    title: "Inflammation Drops",
    description: "Puffiness, redness, post-sleep swelling — dispersed. The face that looked tired at 7am looks intentional by 7:15.",
  },
  {
    icon: "↑",
    title: "Circulation Surges",
    description: "After cold comes the rebound. Blood rushes back. Oxygen floods the skin. That glow people attribute to expensive serums? This is where it actually comes from.",
  },
  {
    icon: "⬡",
    title: "Absorption Increases",
    description: "Cold-prepped skin absorbs actives at a measurably higher rate. Every product that follows gets a better shot at doing its job.",
  },
  {
    icon: "∅",
    title: "Zero Chemicals. Zero Side Effects.",
    description: "Water. Ice. Temperature. No retinol purge. No patch testing. Results on day one.",
  },
];

export const ritualSteps = [
  {
    step: "01",
    title: "Fill & Freeze Overnight",
    description: "Add water. Add ice — or use the built-in tray. The bowl does the prep work. You wake up, it's ready.",
  },
  {
    step: "02",
    title: "Clean Face First",
    description: "Blank canvas. Cold therapy on clean skin hits different. 30 seconds. Nothing more.",
  },
  {
    step: "03",
    title: "Dip. 15 Seconds. Twice.",
    description: "The soft silicone rim seals against your face. No hard edges. No coming up early. The science starts before you lift your head.",
  },
  {
    step: "04",
    title: "Pat Dry. Apply Serum.",
    description: "Cold-prepped, pore-tightened skin absorbs actives at a higher rate. Your ₹3,000 serum just got its first real shot.",
  },
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}
