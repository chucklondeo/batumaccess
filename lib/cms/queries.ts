import { supabase } from "@/lib/supabase";
import type { BlogPost, Category, Download, Product, ProductImage, Project, Solution } from "@/lib/cms/types";

// These queries run at build time only (this site is a static export via
// `output: "export"` — there is no server at runtime), so results are
// baked into the generated HTML at `next build` time.

export async function getProductCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("product_categories").select("*").order("sort_order");
  if (error) throw error;
  return data;
}

export async function getSolutionCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("solution_categories").select("*").order("sort_order");
  if (error) throw error;
  return data;
}

export async function getProducts(opts: { includeDrafts?: boolean } = {}): Promise<Product[]> {
  let query = supabase.from("products").select("*").order("sort_order");
  if (!opts.includeDrafts) query = query.eq("status", "published");
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string, opts: { includeDrafts?: boolean } = {}): Promise<Product | null> {
  let query = supabase.from("products").select("*").eq("slug", slug);
  if (!opts.includeDrafts) query = query.eq("status", "published");
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data;
}

export async function getProductImages(productId: string): Promise<ProductImage[]> {
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("sort_order");
  if (error) throw error;
  return data;
}

export async function getSolutions(opts: { includeDrafts?: boolean } = {}): Promise<Solution[]> {
  let query = supabase.from("solutions").select("*").order("sort_order");
  if (!opts.includeDrafts) query = query.eq("status", "published");
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getSolutionsByCategory(
  categorySlug: string,
  opts: { includeDrafts?: boolean } = {}
): Promise<Solution[]> {
  const categories = await getSolutionCategories();
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return [];
  let query = supabase.from("solutions").select("*").eq("category_id", category.id).order("sort_order");
  if (!opts.includeDrafts) query = query.eq("status", "published");
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getSolutionBySlug(slug: string, opts: { includeDrafts?: boolean } = {}): Promise<Solution | null> {
  let query = supabase.from("solutions").select("*").eq("slug", slug);
  if (!opts.includeDrafts) query = query.eq("status", "published");
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data;
}

export async function getBlogPosts(opts: { includeDrafts?: boolean } = {}): Promise<BlogPost[]> {
  let query = supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
  if (!opts.includeDrafts) query = query.eq("status", "published");
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getBlogPostBySlug(slug: string, opts: { includeDrafts?: boolean } = {}): Promise<BlogPost | null> {
  let query = supabase.from("blog_posts").select("*").eq("slug", slug);
  if (!opts.includeDrafts) query = query.eq("status", "published");
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data;
}

export async function getProjects(opts: { includeDrafts?: boolean } = {}): Promise<Project[]> {
  let query = supabase.from("projects").select("*").order("created_at", { ascending: false });
  if (!opts.includeDrafts) query = query.eq("status", "published");
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProjectBySlug(slug: string, opts: { includeDrafts?: boolean } = {}): Promise<Project | null> {
  let query = supabase.from("projects").select("*").eq("slug", slug);
  if (!opts.includeDrafts) query = query.eq("status", "published");
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data;
}

export async function getDownloads(opts: { includeDrafts?: boolean } = {}): Promise<Download[]> {
  let query = supabase.from("downloads").select("*").order("sort_order");
  if (!opts.includeDrafts) query = query.eq("status", "published");
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export function storageUrl(path: string): string {
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
