import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CAREER_JOBS } from "@/data/careers";

export const runtime = "nodejs";

const PRODUCT_MAP: Record<string, string> = {
  maestro: "Maestro™",
  twinlnk: "TwinLnk™",
  samchat: "SamChat",
  "automate-ai": "AutoMATE.ai",
  "sam-sanvaad": "Sam-Sanvaad",
  "driver-health": "Driver Health & Wellness Monitoring",
  sdv: "Software Defined Vehicle (SDV)",
  "stafd-in": "STAFD.IN",
  vemeego: "Vemeego",
  pikniknow: "PiknikNow",
  refacto: "RefactoFlow",
  "digital-cockpit-solution": "Digital Cockpit Solution",
  "dms-edge": "DMS Edge",
  cabiniq: "CabinIQ™",
  vseva: "vSeva",
};

const requestWindows = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const MAX_RESUME_BYTES = 4 * 1024 * 1024;

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char] ?? char);
}

function field(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isRateLimited(request: Request) {
  const now = Date.now();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  const entry = requestWindows.get(ip);
  if (!entry || entry.resetAt <= now) {
    requestWindows.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

function istTimestamp() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "long",
  }).format(new Date());
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 5 * 1024 * 1024) return jsonError("Submission is too large.", 413);

  let form: FormData;
  try {
    if (request.headers.get("content-type")?.includes("application/json")) {
      const json = await request.json() as Record<string, unknown>;
      if (json.type !== "brochure_request") return jsonError("Unsupported submission format.", 400);
      form = new FormData();
      for (const key of ["name", "email", "company", "phone", "message", "product", "productDisplayName", "type"]) {
        if (typeof json[key] === "string") form.set(key, json[key] as string);
      }
      form.set("interest", "Product brochure");
      form.set("website", typeof json.website === "string" ? json.website : "");
    } else {
      form = await request.formData();
    }
  } catch {
    return jsonError("Invalid form submission.", 400);
  }

  // Honeypot submissions are intentionally acknowledged without sending mail.
  if (field(form, "website")) return NextResponse.json({ ok: true });
  if (isRateLimited(request)) return jsonError("Too many requests. Please try again later.", 429);

  const name = field(form, "name");
  const email = field(form, "email");
  const company = field(form, "company");
  const phone = field(form, "phone");
  const interest = field(form, "interest");
  const message = field(form, "message");
  const type = field(form, "type").toLowerCase();
  const productSlug = field(form, "product").toLowerCase();
  const requestedRoleSlug = field(form, "roleSlug").toLowerCase();
  const experience = field(form, "experience");
  const linkedin = field(form, "linkedin");
  const coverNote = field(form, "coverNote");
  const submittedProductName = field(form, "productDisplayName");
  const submittedRoleTitle = field(form, "roleTitle");
  const applicationMode = type === "careers" || productSlug === "careers";

  if (name.length < 2 || name.length > 120) return jsonError("Please enter your full name.", 400);
  if (company.length > 160 || phone.length > 30 || interest.length > 120 || message.length > 5000 || type.length > 30 || productSlug.length > 100 || requestedRoleSlug.length > 100 || experience.length > 40 || linkedin.length > 500 || coverNote.length > 1000 || submittedProductName.length > 150 || submittedRoleTitle.length > 120) return jsonError("One or more fields exceed the allowed length.", 400);
  if (!validEmail(email)) return jsonError("Please enter a valid email address.", 400);
  const allowedInterests = new Set(["Cockpit", "SDV", "Telematics", "AI Engineering", "Staffing", "Investor Discussion", "Partnership", "Careers", "Product brochure"]);
  if (!allowedInterests.has(interest)) return jsonError("Please select a valid interest area.", 400);
  if (message.length > 5000) return jsonError("Message is too long.", 400);

  let roleTitle = "";
  let roleSlug = "";
  if (applicationMode) {
    if (!/^\d{7,15}$/.test(phone.replace(/[\s()+-]/g, ""))) return jsonError("Please enter a phone number with 7 to 15 digits.", 400);
    if (interest !== "Careers") return jsonError("Invalid application interest.", 400);
    if (!/^(?:\d{1,2})(?:\.\d{1,2})?$/.test(experience) || Number(experience) > 70) return jsonError("Please enter valid total experience in years.", 400);
    if (linkedin) {
      try {
        const url = new URL(linkedin);
        if (!/^https?:$/.test(url.protocol)) return jsonError("Please enter a valid LinkedIn URL.", 400);
      } catch {
        return jsonError("Please enter a valid LinkedIn URL.", 400);
      }
    }
    const matchingRole = CAREER_JOBS.find(job => job.slug === requestedRoleSlug);
    if (matchingRole) {
      roleTitle = matchingRole.title;
      roleSlug = matchingRole.slug;
    }
  } else {
    if (!company) return jsonError("Please enter your company name.", 400);
    if (phone && !/^\d{7,15}$/.test(phone.replace(/[\s()+-]/g, ""))) return jsonError("Please enter a valid phone number.", 400);
    if (message.length < 10) return jsonError("Please add a message of at least 10 characters.", 400);
  }

  const resumeValue = form.get("resume");
  let attachment: { filename: string; content: Buffer; contentType: string }[] | undefined;
  if (applicationMode && resumeValue instanceof File && resumeValue.size > 0) {
    const filename = resumeValue.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 150);
    const extension = filename.toLowerCase().split(".").pop();
    const allowed: Record<string, string[]> = {
      pdf: ["application/pdf"],
      doc: ["application/msword", "application/octet-stream"],
      docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/octet-stream"],
    };
    if (resumeValue.size > MAX_RESUME_BYTES) return jsonError("Resume must be 4 MB or smaller.", 400);
    if (!extension || !allowed[extension] || (resumeValue.type && !allowed[extension].includes(resumeValue.type))) {
      return jsonError("Resume must be a PDF, DOC, or DOCX file.", 400);
    }
    attachment = [{ filename, content: Buffer.from(await resumeValue.arrayBuffer()), contentType: resumeValue.type || "application/octet-stream" }];
  } else if (applicationMode && resumeValue && typeof resumeValue !== "string") {
    return jsonError("Invalid resume file.", 400);
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM;
  const recipients = (applicationMode ? process.env.MAIL_TO_CAREERS : process.env.MAIL_TO_ENQUIRIES)
    ?.split(",").map(value => value.trim()).filter(Boolean);
  const secureSetting = process.env.SMTP_SECURE;
  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !pass || !from || !recipients?.length || !["true", "false"].includes(secureSetting || "")) {
    console.error("CONTACT_MAIL_CONFIG_MISSING");
    return jsonError("Email delivery is not configured.", 503);
  }

  const productName = PRODUCT_MAP[productSlug] || submittedProductName;
  const topic = applicationMode ? "Careers Application" : (productName || interest || "General enquiry");
  const date = istTimestamp();
  const pageUrl = request.headers.get("referer") || `${new URL(request.url).origin}/contact`;
  const data: Array<[string, string]> = [
    ["Name", name], ["Email", email], ["Phone", phone || "—"],
    ["Company", company || "—"], ["Interest", interest], ["Message", message || "—"],
  ];
  if (!applicationMode && productName) data.push(["Product", productName]);
  if (applicationMode) {
    data.push(["Role", roleTitle || "General Application"], ["Role slug", roleSlug || "—"], ["Total experience", experience], ["Current company", company || "—"], ["LinkedIn", linkedin || "—"], ["Cover note", coverNote || "—"], ["Resume", attachment?.length ? attachment[0].filename || "Attached" : "Not provided"]);
  }
  data.push(["Submitted (IST)", date], ["Page URL", pageUrl]);

  const safeRows = data.map(([label, value]) => `<tr><th style="text-align:left;padding:8px;border:1px solid #dbe3ec">${escapeHtml(label)}</th><td style="padding:8px;border:1px solid #dbe3ec;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("");
  const textBody = data.map(([label, value]) => `${label}: ${value}`).join("\n");
  const safeSubjectName = name.replace(/[\r\n]+/g, " ");
  const safeTopic = topic.replace(/[\r\n]+/g, " ");
  const subject = applicationMode
    ? `[Careers] Application: ${roleTitle || "General Application"} - ${safeSubjectName}`
    : `[Enquiry] ${safeTopic} - ${safeSubjectName}`;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: secureSetting === "true",
      auth: { user, pass },
    });
    await transporter.sendMail({
      from,
      to: recipients,
      replyTo: email,
      subject,
      text: textBody,
      html: `<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif">${safeRows}</table>`,
      attachments: attachment,
    });
    return NextResponse.json({ ok: true, success: true, message: "Your message has been sent." });
  } catch {
    console.error("CONTACT_MAIL_SEND_FAILED");
    return jsonError("Unable to send the message right now.", 502);
  }
}
