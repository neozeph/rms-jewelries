import { supabase } from "../lib/supabase/client";

export interface Jewelry {
  id: string;
  collection_id: string;
  name: string;
  slug: string;
  description: string | null;
  material: string;
  price_from: number | null;
  cover_image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const JEWELRY_COLUMNS =
  "id, collection_id, name, slug, description, material, price_from, cover_image_url, is_featured, is_published, created_at, updated_at";

export async function getPublishedJewelryByCollection(
  collectionId: string,
): Promise<Jewelry[]> {
  const { data, error } = await supabase
    .from("jewelry")
    .select(JEWELRY_COLUMNS)
    .eq("is_published", true)
    .eq("collection_id", collectionId)
    .order("name");

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getFeaturedPublishedJewelry(): Promise<Jewelry[]> {
  const { data, error } = await supabase
    .from("jewelry")
    .select(JEWELRY_COLUMNS)
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("name");

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getPublishedJewelryBySlug(
  slug: string,
): Promise<Jewelry | null> {
  const { data, error } = await supabase
    .from("jewelry")
    .select(JEWELRY_COLUMNS)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
