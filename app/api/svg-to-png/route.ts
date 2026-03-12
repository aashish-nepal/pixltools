import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, imageResponse } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "svg-to-png");
    if (limited) return limited;

    const formData = await req.formData();
    const fileEntry = formData.get("file") as File | null;
    if (!fileEntry) return errorResponse("No file uploaded");

    const buffer = Buffer.from(await fileEntry.arrayBuffer());

    // Accept SVG mime type or text/plain for SVG files
    if (!fileEntry.type.includes("svg") && !fileEntry.name.toLowerCase().endsWith(".svg")) {
        return errorResponse("Only SVG files are supported");
    }

    if (buffer.length > 10 * 1024 * 1024) {
        return errorResponse("File too large. Maximum 10MB for SVG files.");
    }

    const out = await sharp(buffer)
        .png({ compressionLevel: 9 })
        .toBuffer();

    return imageResponse(out, "image/png");
}
