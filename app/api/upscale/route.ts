import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, imageResponse, validateUpload } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "upscale");
    if (limited) return limited;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await file.arrayBuffer());

    const err = await validateUpload(buffer, file.type);
    if (err) return errorResponse(err);

    const scale = Math.min(Math.max(parseFloat(formData.get("scale") as string) || 2, 1.1), 4);
    const meta = await sharp(buffer).metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    const newW = Math.round(w * scale);
    const newH = Math.round(h * scale);

    if (newW > 8000 || newH > 8000) {
        return errorResponse(`Upscaled size (${newW}×${newH}) exceeds maximum 8000×8000px. Try a lower scale factor.`);
    }

    const fmt = (meta.format || "jpeg") as "jpeg" | "png" | "webp";
    const mimeMap: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

    const out = await sharp(buffer)
        .resize(newW, newH, { kernel: "lanczos3" })
        .toFormat(fmt)
        .toBuffer();

    return imageResponse(out, mimeMap[fmt] || "image/jpeg");
}
