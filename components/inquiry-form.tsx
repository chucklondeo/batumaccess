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
const inquiryEmail = "sales@batumaccess.com";
const formSubmitEndpoint = `https://formsubmit.co/ajax/${inquiryEmail}`;

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
      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _subject: `Batum Technology inquiry - ${payload.company || payload.name}`,
          _template: "table",
          _captcha: "false",
          _replyto: payload.email,
          name: payload.name,
          company: payload.company,
          email: payload.email,
          whatsapp: payload.whatsapp,
          country: payload.country,
          interested_product: payload.product,
          project_requirements: payload.message
        })
      });

      if (!response.ok) {
        const responseText = await response.text();
        const result = parseJsonResponse(responseText);
        throw new Error(result?.error || responseText || `Inquiry service rejected the request (${response.status}).`);
      }

      setStatus(`${copy.submitReady} If this is the first submission, please confirm the FormSubmit email sent to ${inquiryEmail}.`);
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

function parseJsonResponse(text: string): { error?: string } | null {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
