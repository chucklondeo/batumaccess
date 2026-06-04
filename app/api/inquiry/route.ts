import { mkdir, appendFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const salesEmail = "sales@batumaccess.com";

type InquiryPayload = {
  name?: string;
  company?: string;
  email?: string;
  whatsapp?: string;
  country?: string;
  product?: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  let payload: InquiryPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid inquiry payload." }, { status: 400 });
  }

  const inquiry = sanitizeInquiry(payload);

  if (!inquiry.name || !inquiry.email || !inquiry.message) {
    return NextResponse.json({ ok: false, error: "Name, email and project requirements are required." }, { status: 400 });
  }

  await saveInquiry(inquiry);
  const emailForwarded = await forwardInquiry(inquiry);

  return NextResponse.json({
    ok: true,
    stored: true,
    emailForwarded
  });
}

function sanitizeInquiry(payload: InquiryPayload) {
  return {
    createdAt: new Date().toISOString(),
    name: clean(payload.name),
    company: clean(payload.company),
    email: clean(payload.email),
    whatsapp: clean(payload.whatsapp),
    country: clean(payload.country),
    product: clean(payload.product),
    message: clean(payload.message, 4000)
  };
}

function clean(value?: string, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

async function saveInquiry(inquiry: ReturnType<typeof sanitizeInquiry>) {
  const dataDir = join(process.cwd(), ".data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(join(dataDir, "inquiries.jsonl"), `${JSON.stringify(inquiry)}\n`, "utf8");
}

async function forwardInquiry(inquiry: ReturnType<typeof sanitizeInquiry>) {
  const formData = new FormData();
  formData.append("_subject", `Batum Technology inquiry - ${inquiry.company || inquiry.name}`);
  formData.append("_template", "table");
  formData.append("_captcha", "false");
  formData.append("Name", inquiry.name);
  formData.append("Company", inquiry.company);
  formData.append("Email", inquiry.email);
  formData.append("WhatsApp", inquiry.whatsapp);
  formData.append("Country", inquiry.country);
  formData.append("Interested Product", inquiry.product);
  formData.append("Project Requirements", inquiry.message);

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${salesEmail}`, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    });

    return response.ok;
  } catch {
    return false;
  }
}
