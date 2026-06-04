import { mkdir, appendFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
  const emailForwarded = await sendInquiryEmail(inquiry);

  if (!emailForwarded) {
    return NextResponse.json(
      {
        ok: false,
        stored: true,
        emailForwarded: false,
        error: "Inquiry was stored, but SMTP email is not configured yet."
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, stored: true, emailForwarded: true });
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

async function sendInquiryEmail(inquiry: ReturnType<typeof sanitizeInquiry>) {
  const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER || salesEmail;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpPass) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  try {
    await transporter.sendMail({
      from: `"Batum Website" <${smtpUser}>`,
      to: salesEmail,
      replyTo: inquiry.email,
      subject: `Batum Technology inquiry - ${inquiry.company || inquiry.name}`,
      text: buildPlainTextEmail(inquiry),
      html: buildHtmlEmail(inquiry)
    });

    return true;
  } catch {
    return false;
  }
}

function buildPlainTextEmail(inquiry: ReturnType<typeof sanitizeInquiry>) {
  return [
    "Batum Technology Website Inquiry",
    "",
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company}`,
    `Email: ${inquiry.email}`,
    `WhatsApp: ${inquiry.whatsapp}`,
    `Country: ${inquiry.country}`,
    `Interested Product: ${inquiry.product}`,
    `Submitted At: ${inquiry.createdAt}`,
    "",
    "Project Requirements:",
    inquiry.message
  ].join("\n");
}

function buildHtmlEmail(inquiry: ReturnType<typeof sanitizeInquiry>) {
  const rows = [
    ["Name", inquiry.name],
    ["Company", inquiry.company],
    ["Email", inquiry.email],
    ["WhatsApp", inquiry.whatsapp],
    ["Country", inquiry.country],
    ["Interested Product", inquiry.product],
    ["Submitted At", inquiry.createdAt],
    ["Project Requirements", inquiry.message]
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.6">
      <h2>Batum Technology Website Inquiry</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #e5e7eb;background:#f9fafb;font-weight:700;width:180px">${escapeHtml(label)}</td>
                <td style="border:1px solid #e5e7eb;white-space:pre-wrap">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
