import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, imageResponse, validateUpload } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "contrast");
    if (limited) return limited;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await file.arrayBuffer());

    const err = await validateUpload(buffer, file.type);
    if (err) return errorResponse(err);

    const contrast = Math.min(Math.max(parseFloat(formData.get("contrast") as string) || 1.3, 0.1), 5);
    const meta = await sharp(buffer).metadata();
    const fmt = (meta.format || "jpeg") as "jpeg" | "png" | "webp";
    const mimeMap: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

    // Linear contrast: output = a*input + b
    const a = contrast;
    const b = 128 * (1 - contrast); // shift to keep midpoint fixed
    const out = await sharp(buffer).linear(a, b).toFormat(fmt).toBuffer();
    return imageResponse(out, mimeMap[fmt] || "image/jpeg");
}
