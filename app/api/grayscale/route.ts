import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, imageResponse, validateUpload } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "grayscale");
    if (limited) return limited;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await file.arrayBuffer());

    const err = await validateUpload(buffer, file.type);
    if (err) return errorResponse(err);

    const meta = await sharp(buffer).metadata();
    const fmt = (meta.format || "jpeg") as "jpeg" | "png" | "webp";
    const mimeMap: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

    const out = await sharp(buffer).grayscale(true).toFormat(fmt).toBuffer();
    return imageResponse(out, mimeMap[fmt] || "image/jpeg");
}
