"use client";

import { ArrowRight } from "lucide-react";
import { MotionCard } from "@/components/motion-card";

type InquiryFormCopy = {
  formFields: string[];
  formMessage: string;
  formPlaceholder: string;
  submit: string;
  submitReady: string;
};

const fieldNames = ["name", "company", "email", "whatsapp", "country", "interested_product"];
const inquiryEmail = "sales@batumaccess.com";
const formSubmitEndpoint = `https://formsubmit.co/${inquiryEmail}`;

export function InquiryForm({ copy }: { copy: InquiryFormCopy }) {
  return (
    <MotionCard className="p-6 sm:p-8">
      <form action={formSubmitEndpoint} className="grid gap-4 md:grid-cols-2" method="POST">
        <input name="_subject" type="hidden" value="Batum Technology website inquiry" />
        <input name="_template" type="hidden" value="table" />
        <input name="_captcha" type="hidden" value="false" />
        <input name="_next" type="hidden" value="https://batumaccess.com/?inquiry=sent" />
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
            name="project_requirements"
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
        <p className="md:col-span-2 rounded-2xl border border-wood/30 bg-wood/10 px-4 py-3 text-sm text-wood">
          First submission may require confirming the FormSubmit email sent to {inquiryEmail}.
        </p>
      </form>
    </MotionCard>
  );
}
