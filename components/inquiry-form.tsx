import { ArrowRight } from "lucide-react";
import { contact, LocaleKey, messages } from "@/data/site";

export function InquiryForm({
  copy,
  locale
}: {
  copy: (typeof messages)[LocaleKey];
  locale: LocaleKey;
}) {
  const form = copy.form;
  return (
    <form action={`https://formsubmit.co/${contact.email}`} className="glass-card grid gap-4 rounded-3xl p-6 sm:p-8 md:grid-cols-2" method="POST">
      <input name="_subject" type="hidden" value={`Batum Technology website inquiry (${locale})`} />
      <input name="_template" type="hidden" value="table" />
      <input name="_captcha" type="hidden" value="false" />
      <input name="_next" type="hidden" value="https://batumaccess.com/?inquiry=sent" />
      <Field label={form.name} name="name" required />
      <Field label={form.company} name="company" />
      <Field label={form.email} name="email" required type="email" />
      <Field label={form.whatsapp} name="whatsapp" />
      <Field label={form.country} name="country" />
      <Field label={form.product} name="interested_product" />
      <label className="grid gap-2 text-sm font-semibold text-white md:col-span-2">
        {form.message}
        <textarea
          name="project_requirements"
          required
          className="min-h-36 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none placeholder:text-steel focus:border-water"
        />
      </label>
      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-water to-gold px-6 py-4 text-sm font-black text-void md:col-span-2"
      >
        {form.submit}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
      <p className="rounded-2xl border border-wood/30 bg-wood/10 px-4 py-3 text-sm text-wood md:col-span-2">
        {copy.firstSubmitNote}
      </p>
    </form>
  );
}

function Field({ label, name, required = false, type = "text" }: { label: string; name: string; required?: boolean; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-white">
      {label}
      <input
        name={name}
        required={required}
        type={type}
        className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none placeholder:text-steel focus:border-water"
      />
    </label>
  );
}
