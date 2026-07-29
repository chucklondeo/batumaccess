export type ContentStatus = "draft" | "published";

export type Bilingual<T = string> = { en: T; zh: T };

export type Category = {
  id: string;
  slug: string;
  name_en: string;
  name_zh: string;
  sort_order: number;
};

export type ProductSpec = { label: Bilingual; value: Bilingual<string | null> | null };
export type ProductHighlight = { title: Bilingual; desc: Bilingual };
export type ProductFaq = { q: Bilingual; a: Bilingual };

export type Product = {
  id: string;
  slug: string;
  category_id: string | null;
  name_en: string;
  name_zh: string;
  model: string | null;
  tagline_en: string;
  tagline_zh: string;
  key_points: Bilingual<string[]>;
  highlights: ProductHighlight[];
  specs: ProductSpec[];
  compatibility_en: string;
  compatibility_zh: string;
  applications: Bilingual<string[]>;
  datasheet_url: string | null;
  video_url: string | null;
  faqs: ProductFaq[];
  related_slugs: string[];
  seo_title_en: string | null;
  seo_title_zh: string | null;
  seo_description_en: string | null;
  seo_description_zh: string | null;
  seo_keywords_en: string | null;
  seo_keywords_zh: string | null;
  status: ContentStatus;
  sort_order: number;
};

export type ProductImage = {
  id: string;
  product_id: string;
  storage_path: string;
  alt_en: string;
  alt_zh: string;
  is_hero: boolean;
  sort_order: number;
};

export type Solution = {
  id: string;
  slug: string;
  category_id: string | null;
  name_en: string;
  name_zh: string;
  hero_subtitle_en: string;
  hero_subtitle_zh: string;
  pain_points: Bilingual<string[]>;
  architecture_en: string;
  architecture_zh: string;
  recommended_product_slugs: string[];
  payment_methods_en: string;
  payment_methods_zh: string;
  vehicle_flow_en: string;
  vehicle_flow_zh: string;
  permits_visitors_en: string;
  permits_visitors_zh: string;
  compatibility_en: string;
  compatibility_zh: string;
  implementation_steps: Bilingual<string[]>;
  local_support_en: string;
  local_support_zh: string;
  related_slugs: string[];
  seo_title_en: string | null;
  seo_title_zh: string | null;
  seo_description_en: string | null;
  seo_description_zh: string | null;
  seo_keywords_en: string | null;
  seo_keywords_zh: string | null;
  status: ContentStatus;
  sort_order: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title_en: string;
  title_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  body_en: string;
  body_zh: string;
  cover_image_path: string | null;
  tags: string[];
  seo_title_en: string | null;
  seo_title_zh: string | null;
  seo_description_en: string | null;
  seo_description_zh: string | null;
  seo_keywords_en: string | null;
  seo_keywords_zh: string | null;
  status: ContentStatus;
  published_at: string | null;
};

export type Project = {
  id: string;
  slug: string;
  title_en: string;
  title_zh: string;
  summary_en: string;
  summary_zh: string;
  body_en: string;
  body_zh: string;
  site_type: string | null;
  cover_image_path: string | null;
  gallery: Array<{ path: string; alt_en?: string; alt_zh?: string }>;
  related_product_slugs: string[];
  related_solution_slugs: string[];
  seo_title_en: string | null;
  seo_title_zh: string | null;
  seo_description_en: string | null;
  seo_description_zh: string | null;
  seo_keywords_en: string | null;
  seo_keywords_zh: string | null;
  status: ContentStatus;
};

export type Download = {
  id: string;
  title_en: string;
  title_zh: string;
  description_en: string;
  description_zh: string;
  category: string;
  file_path: string;
  related_product_slug: string | null;
  status: ContentStatus;
  sort_order: number;
};
