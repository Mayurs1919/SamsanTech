import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Handle form submission (e.g. email or database log)
        console.log("Contact form submission:", { name, email, message });

        return NextResponse.json({ success: true, message: "Thank you for contacting Samsan Labs. We will reach out to you shortly." });
    } catch (err) {
        console.error("Error handling contact submission:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
