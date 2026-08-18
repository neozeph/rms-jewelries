import type { Collection } from "../repositories/collectionRepository";
import type { Jewelry } from "../repositories/jewelryRepository";

// Temporary Unsplash presentation fallbacks while Supabase media is paused.
// Remove this module once real cover_image_url values are available again.
export const TEMPORARY_UNSPLASH_IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
  about:
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
  collections: [
    "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
  ],
  jewelry: [
    "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
  ],
  services: [
    "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1000&q=80",
  ],
} as const;

export function getTemporaryJewelryImage(identifier: string, index = 0) {
  const fallbackImages = TEMPORARY_UNSPLASH_IMAGES.jewelry;
  const hash = Array.from(identifier).reduce(
    (total, character) => total + character.charCodeAt(0),
    index,
  );

  return fallbackImages[hash % fallbackImages.length];
}

export const TEMPORARY_FEATURED_COLLECTIONS: Collection[] = [
  {
    id: "temporary-collection-heirloom",
    name: "Heirloom Forms",
    slug: "heirloom-forms",
    description: "Refined silhouettes inspired by keepsake pieces and warm metals.",
    cover_image_url: TEMPORARY_UNSPLASH_IMAGES.collections[0],
    is_featured: true,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "temporary-collection-golden-hour",
    name: "Golden Hour",
    slug: "golden-hour",
    description: "Minimal pieces presented in soft light and quiet ivory settings.",
    cover_image_url: TEMPORARY_UNSPLASH_IMAGES.collections[1],
    is_featured: true,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "temporary-collection-modern-classics",
    name: "Modern Classics",
    slug: "modern-classics",
    description: "Clean, wearable jewelry compositions with a restrained luxury mood.",
    cover_image_url: TEMPORARY_UNSPLASH_IMAGES.collections[2],
    is_featured: true,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "temporary-collection-occasion",
    name: "Occasion Pieces",
    slug: "occasion-pieces",
    description: "Editorial jewelry references for ceremonies, gifts, and milestones.",
    cover_image_url: TEMPORARY_UNSPLASH_IMAGES.collections[3],
    is_featured: true,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
];

export const TEMPORARY_FEATURED_JEWELRY: Jewelry[] = [
  {
    id: "temporary-jewelry-solitaire-ring",
    collection_id: "temporary-collection-heirloom",
    name: "Solitaire Ring Study",
    slug: "solitaire-ring-study",
    description: "Temporary editorial reference for a refined ring presentation.",
    material: "Warm gold tone",
    price_from: null,
    cover_image_url: TEMPORARY_UNSPLASH_IMAGES.jewelry[0],
    is_featured: true,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "temporary-jewelry-chain-necklace",
    collection_id: "temporary-collection-golden-hour",
    name: "Chain Necklace Study",
    slug: "chain-necklace-study",
    description: "Temporary editorial reference for necklace styling.",
    material: "Polished gold tone",
    price_from: null,
    cover_image_url: TEMPORARY_UNSPLASH_IMAGES.jewelry[1],
    is_featured: true,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "temporary-jewelry-stacked-bands",
    collection_id: "temporary-collection-modern-classics",
    name: "Stacked Band Study",
    slug: "stacked-band-study",
    description: "Temporary editorial reference for layered ring compositions.",
    material: "Mixed warm metals",
    price_from: null,
    cover_image_url: TEMPORARY_UNSPLASH_IMAGES.jewelry[2],
    is_featured: true,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "temporary-jewelry-pearl-earrings",
    collection_id: "temporary-collection-occasion",
    name: "Pearl Earring Study",
    slug: "pearl-earring-study",
    description: "Temporary editorial reference for occasion jewelry.",
    material: "Pearl and gold tone",
    price_from: null,
    cover_image_url: TEMPORARY_UNSPLASH_IMAGES.jewelry[3],
    is_featured: true,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
];
