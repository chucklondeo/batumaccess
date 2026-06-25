"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { MotionCard } from "@/components/motion-card";

type InquiryFormCopy = {
  formFields: string[];
  formMessage: string;
  formPlaceholder: string;
  submit: string;
  submitReady: string;
};

const fieldNames = ["name", "company", "email", "whatsapp", "country", "product"];

export function InquiryForm({ copy }: { copy: InquiryFormCopy }) {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      company: String(formData.get("company") || ""),
      email: String(formData.get("email") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
      country: String(formData.get("country") || ""),
      product: String(formData.get("product") || ""),
      message: String(formData.get("message") || "")
    };

    setStatus("Sending inquiry...");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Inquiry service rejected the request.");
      }

      setStatus(copy.submitReady);
      form.reset();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? `${error.message} You can also contact sales@batumaccess.com or WhatsApp +86 135 3425 3195.`
          : "Inquiry could not be submitted. Please contact sales@batumaccess.com or WhatsApp +86 135 3425 3195."
      );
    }
  }

  return (
    <MotionCard className="p-6 sm:p-8">
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        {copy.formFields.map((field, index) => (
          <label key={field} className="grid gap-2 text-sm font-semibold text-white">
            {field}
            <input
              name={fieldNames[index]}
              required={fieldNames[index] === "name" || fieldNames[index] === "email"}
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-steel focus:border-water"
              placeholder={field}
              type={fieldNames[index] === "email" ? "email" : "text"}
            />
          </label>
        ))}
        <label className="grid gap-2 text-sm font-semibold text-white md:col-span-2">
          {copy.formMessage}
          <textarea
            name="message"
            required
            className="min-h-36 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-steel focus:border-water"
            placeholder={copy.formPlaceholder}
          />
        </label>
        <button
          type="submit"
          className="group md:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-water to-gold px-6 py-4 text-sm font-black text-void transition hover:shadow-gold"
        >
          {copy.submit}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
        {status ? <p className="md:col-span-2 rounded-2xl border border-wood/30 bg-wood/10 px-4 py-3 text-sm text-wood">{status}</p> : null}
      </form>
    </MotionCard>
  );
}
