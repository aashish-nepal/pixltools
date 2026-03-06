import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/api-utils";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    if (file.type !== "application/pdf") return errorResponse("Please upload a PDF file");
    // Return a helpful message since PDF rendering requires native deps not available on Vercel
    return new NextResponse(
        JSON.stringify({ error: "PDF rendering requires server-side renderer. Use Adobe Acrobat or a local PDF tool." }),
        { status: 501, headers: { "Content-Type": "application/json" } }
    );
}
