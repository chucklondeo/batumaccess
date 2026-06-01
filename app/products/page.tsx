import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { products } from "@/data/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Batum Technology smart parking and access control products including barrier gate, AFC gate, platform screen door, LPR camera, radar sensor and parking cloud box.",
  keywords: [
    "barrier gate",
    "AFC gate",
    "platform screen door",
    "LPR camera",
    "radar sensor",
    "parking cloud box",
    "smart parking products"
  ]
};

export default function ProductsPage() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: `${product.tag}. ${product.specs.join(", ")}.`,
        brand: { "@type": "Brand", name: "Batum Technology" },
        keywords: product.seo
      }
    }))
  };

  return (
    <main className="min-h-screen px-5 py-24 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.34em] text-water">Product Center</p>
        <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.04em] text-white sm:text-7xl">
          Upload-ready product architecture for smart parking and access control
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-steel">
          This page is driven by structured product data. Replace or extend the product array now, then connect it to a CMS or admin API when your product library grows.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="glass-card rounded-3xl p-6">
              <div className="mb-7 grid h-16 w-16 place-items-center rounded-2xl border border-water/20 bg-water/10">
                <product.icon className="h-8 w-8 text-water" />
              </div>
              <h2 className="text-2xl font-semibold text-white">{product.name}</h2>
              <p className="mt-3 text-sm leading-7 text-steel">{product.tag}</p>
              <div className="mt-6 space-y-3">
                {product.specs.map((spec) => (
                  <div key={spec} className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-wood" />
                    {spec}
                  </div>
                ))}
              </div>
              <div className="mt-7 rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm text-gold">
                Google keyword: {product.seo}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

