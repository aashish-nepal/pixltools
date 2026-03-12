import { NextRequest } from "next/server";
import heicConvert from "heic-convert";
import { errorResponse, imageResponse } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "heic-to-jpg");
    if (limited) return limited;

    const formData = await req.formData();
    const fileEntry = formData.get("file") as File | null;
    if (!fileEntry) return errorResponse("No file uploaded");

    // Check file type — accept heic/heif
    const name = fileEntry.name.toLowerCase();
    const isHeic =
        fileEntry.type === "image/heic" ||
        fileEntry.type === "image/heif" ||
        name.endsWith(".heic") ||
        name.endsWith(".heif");

    if (!isHeic) {
        return errorResponse("Only HEIC/HEIF files are supported by this endpoint");
    }

    if (fileEntry.size > 50 * 1024 * 1024) {
        return errorResponse("File too large. Maximum size is 50MB for HEIC files.");
    }

    const inputBuffer = Buffer.from(await fileEntry.arrayBuffer());

    // heic-convert: convert to JPEG
    const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: "JPEG",
        quality: 0.90,
    });

    return imageResponse(Buffer.from(outputBuffer), "image/jpeg");
}
