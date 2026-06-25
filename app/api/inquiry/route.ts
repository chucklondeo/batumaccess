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

type Inquiry = ReturnType<typeof sanitizeInquiry>;

export async function GET() {
  return NextResponse.json({
    ok: true,
    smtp: {
      host: getSmtpHost(),
      port: Number(process.env.SMTP_PORT || 465),
      user: getEnvValue("SMTP_USER") || salesEmail,
      passwordConfigured: Boolean(process.env.SMTP_PASS)
    },
    delivery: {
      primary: "formsubmit",
      fallback: "smtp"
    }
  });
}

export async function POST(request: NextRequest) {
  try {
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

    const emailResult = await sendInquiryViaFormSubmit(inquiry);
    const storageResult = await saveInquirySafely(inquiry, emailResult);

    if (!emailResult.ok) {
      return NextResponse.json(
        {
          ok: false,
          stored: storageResult.ok,
          storageError: storageResult.error,
          emailForwarded: false,
          error: emailResult.error
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true, stored: storageResult.ok, storageError: storageResult.error, emailForwarded: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        stored: false,
        emailForwarded: false,
        error: `Inquiry service failed: ${formatUnknownError(error)}`
      },
      { status: 500 }
    );
  }
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

async function saveInquiry(inquiry: Inquiry, emailResult: { ok: boolean; provider?: string; error?: string }) {
  const dataDir = join(process.cwd(), ".data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(join(dataDir, "inquiries.jsonl"), `${JSON.stringify({ ...inquiry, emailResult })}\n`, "utf8");
}

async function saveInquirySafely(inquiry: Inquiry, emailResult: { ok: boolean; provider?: string; error?: string }) {
  try {
    await saveInquiry(inquiry, emailResult);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: formatUnknownError(error) };
  }
}

async function sendInquiryViaFormSubmit(inquiry: Inquiry): Promise<{ ok: boolean; provider?: string; error?: string }> {
  const formSubmitUrl = `https://formsubmit.co/ajax/${salesEmail}`;
  const subject = `Batum Technology inquiry - ${inquiry.company || inquiry.name}`;

  try {
    const response = await fetch(formSubmitUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        name: inquiry.name,
        company: inquiry.company,
        email: inquiry.email,
        _replyto: inquiry.email,
        whatsapp: inquiry.whatsapp,
        country: inquiry.country,
        interested_product: inquiry.product,
        submitted_at: inquiry.createdAt,
        project_requirements: inquiry.message
      })
    });

    const responseText = await response.text();

    if (response.ok) {
      return { ok: true, provider: "formsubmit" };
    }

    const fallbackResult = await sendInquiryEmail(inquiry);
    if (fallbackResult.ok) {
      return { ok: true, provider: "smtp" };
    }

    return {
      ok: false,
      provider: "formsubmit+smtp",
      error: `FormSubmit delivery failed (${response.status}): ${responseText || response.statusText}. SMTP fallback: ${
        fallbackResult.error || "failed"
      }`
    };
  } catch (error) {
    const fallbackResult = await sendInquiryEmail(inquiry);
    if (fallbackResult.ok) {
      return { ok: true, provider: "smtp" };
    }

    return {
      ok: false,
      provider: "formsubmit+smtp",
      error: `FormSubmit delivery failed: ${formatUnknownError(error)}. SMTP fallback: ${fallbackResult.error || "failed"}`
    };
  }
}

async function sendInquiryEmail(inquiry: Inquiry): Promise<{ ok: boolean; provider?: string; error?: string }> {
  const smtpHost = getSmtpHost();
  const smtpUser = getEnvValue("SMTP_USER") || salesEmail;
  const smtpPass = getEnvValue("SMTP_PASS");

  if (!smtpPass) {
    return {
      ok: false,
      error: "SMTP_PASS is missing. Configure the sales@batumaccess.com mailbox password in Hostinger environment variables."
    };
  }

  const configuredPort = Number(getEnvValue("SMTP_PORT") || 465);
  const ports = Array.from(new Set([configuredPort, 465, 587]));
  const errors: string[] = [];

  for (const port of ports) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure: port === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      connectionTimeout: 12000,
      greetingTimeout: 12000,
      socketTimeout: 16000
    });

    try {
      await transporter.verify();
      await transporter.sendMail({
        from: `"Batum Website" <${smtpUser}>`,
        to: salesEmail,
        replyTo: inquiry.email,
        subject: `Batum Technology inquiry - ${inquiry.company || inquiry.name}`,
        text: buildPlainTextEmail(inquiry),
        html: buildHtmlEmail(inquiry)
      });

      return { ok: true, provider: "smtp" };
    } catch (error) {
      errors.push(error instanceof Error ? `Port ${port}: ${error.message}` : `Port ${port}: SMTP delivery failed.`);
    }
  }

  return {
    ok: false,
    error: formatSmtpError(errors)
  };
}

function buildPlainTextEmail(inquiry: Inquiry) {
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

function buildHtmlEmail(inquiry: Inquiry) {
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

function getEnvValue(name: string) {
  const value = process.env[name];
  if (!value) return "";
  return value.trim().replace(/^["']|["']$/g, "");
}

function getSmtpHost() {
  const host = getEnvValue("SMTP_HOST") || "smtp.hostinger.com";
  return host === "smtp.hostinger.co" ? "smtp.hostinger.com" : host;
}

function formatSmtpError(errors: string[]) {
  const message = errors.join(" | ");
  if (/535|Invalid login|authentication failed/i.test(message)) {
    return "SMTP login failed. Please set the correct Hostinger mailbox password for sales@batumaccess.com in SMTP_PASS.";
  }
  return `SMTP delivery failed: ${message}`;
}

function formatUnknownError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unexpected server error.";
}
