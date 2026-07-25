"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { products, seoTopics } from "@/data/site";

type AdminProduct = {
  id: string;
  category: string;
  name: string;
  summary: string;
  keywords: string;
  documentName?: string;
  documentUrl?: string;
};

const storageKey = "batum-content-hub-v1";

const initialProducts: AdminProduct[] = products.map((product) => ({
  id: product.id,
  category: product.category,
  name: product.name.en,
  summary: product.summary.en,
  keywords: product.keywords.join(", "),
  documentName: product.document.split("/").pop(),
  documentUrl: product.document
}));

export function AdminPanel() {
  const [items, setItems] = useState<AdminProduct[]>(initialProducts);
  const [seoSeed, setSeoSeed] = useState(seoTopics.join("\n"));

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { products?: AdminProduct[]; seoSeed?: string };
        if (parsed.products) setItems(parsed.products);
        if (parsed.seoSeed) setSeoSeed(parsed.seoSeed);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ products: items, seoSeed }));
  }, [items, seoSeed]);

  const seoDraft = useMemo(() => {
    const date = new Date().toISOString().slice(0, 10);
    return seoSeed
      .split("\n")
      .map((keyword) => keyword.trim())
      .filter(Boolean)
      .map((keyword, index) => ({
        title: `${keyword} | Batum Technology ${date}-${index + 1}`,
        description: `Batum Technology provides ${keyword} for international smart parking, access control and safety-focused low-voltage servo projects.`
      }));
  }, [seoSeed]);

  function updateProduct(id: string, patch: Partial<AdminProduct>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addProduct() {
    const id = `product-${Date.now()}`;
    setItems((current) => [
      ...current,
      { id, category: "accessory", name: "New product", summary: "Product summary", keywords: "parking access control" }
    ]);
  }

  function removeProduct(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function uploadDocument(id: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateProduct(id, { documentName: file.name, documentUrl: url });
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify({ products: items, seoSeed }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "batum-content-export.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as { products?: AdminProduct[]; seoSeed?: string };
        if (parsed.products) setItems(parsed.products);
        if (parsed.seoSeed) setSeoSeed(parsed.seoSeed);
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <main className="min-h-screen px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-water">Batum Content Hub</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-6xl">
          Product, document and search content manager
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-steel">
          Manage product drafts, document links and search content ideas for the current static Hostinger deployment. Data is saved in this browser. Export JSON after editing and publish it with the project when ready.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={addProduct} className="rounded-full bg-water px-5 py-3 text-sm font-bold text-void">Add product</button>
          <button onClick={exportJson} className="rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-bold text-white">Export JSON</button>
          <label className="rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-bold text-white">
            Import JSON
            <input className="hidden" type="file" accept="application/json" onChange={importJson} />
          </label>
        </div>

        <section className="mt-10 grid gap-5">
          {items.map((item) => (
            <article key={item.id} className="glass-card grid gap-4 rounded-3xl p-5 lg:grid-cols-[1fr_1fr_1fr_auto]">
              <Input label="Product name" value={item.name} onChange={(value) => updateProduct(item.id, { name: value })} />
              <Input label="Category" value={item.category} onChange={(value) => updateProduct(item.id, { category: value })} />
              <Input label="Keywords" value={item.keywords} onChange={(value) => updateProduct(item.id, { keywords: value })} />
              <button onClick={() => removeProduct(item.id)} className="self-end rounded-2xl border border-fire/40 px-4 py-3 text-sm font-bold text-fire">
                Delete
              </button>
              <label className="grid gap-2 text-sm font-semibold text-white lg:col-span-2">
                Summary
                <textarea className="min-h-24 rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-sm text-white" value={item.summary} onChange={(event) => updateProduct(item.id, { summary: event.target.value })} />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-white">
                Product document
                <input type="file" onChange={(event) => uploadDocument(item.id, event)} />
                {item.documentUrl ? <a className="text-water underline" href={item.documentUrl} download={item.documentName}>{item.documentName}</a> : null}
              </label>
            </article>
          ))}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <label className="grid gap-3 text-sm font-semibold text-white">
            Search content seed list
            <textarea className="min-h-80 rounded-3xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-7 text-white" value={seoSeed} onChange={(event) => setSeoSeed(event.target.value)} />
          </label>
          <div className="glass-card rounded-3xl p-6">
            <h2 className="text-2xl font-semibold text-white">Daily content draft queue</h2>
            <div className="mt-5 grid gap-4">
              {seoDraft.map((draft) => (
                <article key={draft.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <h3 className="font-semibold text-white">{draft.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-steel">{draft.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-white">
      {label}
      <input className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
