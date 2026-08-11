import { supabase } from "../lib/supabase/client";

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getPublishedCollections(): Promise<Collection[]> {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("is_published", true)
    .order("name");

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getPublishedCollectionBySlug(
  slug: string,
): Promise<Collection | null> {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
