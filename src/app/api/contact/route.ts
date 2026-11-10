import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Email delivery ─────────────────────────────────────────────────────────
// Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your .env.local
// to enable real email delivery. Without them the submission is logged only.
const smtpConfigured =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS;

async function sendBrochureEmails(fields: {
    name: string;
    email: string;
    company: string;
    phone?: string;
    message: string;
    product: string;
    productDisplayName: string;
}) {
    if (!smtpConfigured) {
        // Graceful fallback — log in development when SMTP isn't set up yet
        console.log("=== BROCHURE ENQUIRY (email delivery not configured) ===");
        console.log(JSON.stringify(fields, null, 2));
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const htmlBody = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
            <h2 style="color:#0F172A;margin-bottom:4px;">📄 Brochure Enquiry — ${fields.productDisplayName}</h2>
            <p style="color:#64748B;font-size:13px;margin-bottom:24px;">Submitted via SAMSAN Technische Labs website</p>
            <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#64748B;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${fields.name}</td></tr>
                <tr><td style="padding:8px 0;color:#64748B;">Company</td><td style="padding:8px 0;font-weight:600;">${fields.company}</td></tr>
                <tr><td style="padding:8px 0;color:#64748B;">Email</td><td style="padding:8px 0;"><a href="mailto:${fields.email}">${fields.email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#64748B;">Phone</td><td style="padding:8px 0;">${fields.phone || "—"}</td></tr>
                <tr><td style="padding:8px 0;color:#64748B;">Product</td><td style="padding:8px 0;">${fields.productDisplayName}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#F8FAFC;border-radius:8px;">
                <strong style="display:block;margin-bottom:8px;color:#0F172A;">Message</strong>
                <p style="color:#334155;white-space:pre-wrap;margin:0;">${fields.message}</p>
            </div>
        </div>
    `;

    const mailOptions = {
        from: `"SAMSAN Website" <${process.env.SMTP_USER}>`,
        to: ["info@samsanlabs.com", "india@samsanlabs.com"],
        replyTo: fields.email,
        subject: `[Brochure Request] ${fields.productDisplayName} — ${fields.name} @ ${fields.company}`,
        html: htmlBody,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Brochure enquiry email sent for ${fields.productDisplayName} to info@samsanlabs.com & india@samsanlabs.com`);
}

// ── API Handler ────────────────────────────────────────────────────────────
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, company, phone, message, product, productDisplayName, type } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        // Send brochure enquiry emails (to both recipients)
        if (type === "brochure_request") {
            await sendBrochureEmails({
                name,
                email,
                company: company || "—",
                phone,
                message,
                product: product || "",
                productDisplayName: productDisplayName || product || "SAMSAN Product",
            });

            return NextResponse.json({
                success: true,
                message: "Brochure access granted. Your enquiry has been sent to the SAMSAN team.",
            });
        }

        // General contact form fallback
        console.log("General contact submission:", { name, email, company, phone, message });
        return NextResponse.json({
            success: true,
            message: "Thank you for contacting SAMSAN Technische Labs Pvt. Ltd. We will reach out to you shortly.",
        });
    } catch (err) {
        console.error("Error handling contact submission:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
