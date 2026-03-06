import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, imageResponse, validateUpload } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "crop");
    if (limited) return limited;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await file.arrayBuffer());

    const err = await validateUpload(buffer, file.type);
    if (err) return errorResponse(err);

    const meta = await sharp(buffer).metadata();
    const imgW = meta.width ?? 0;
    const imgH = meta.height ?? 0;

    const left = Math.max(0, parseInt(formData.get("left") as string) || 0);
    const top = Math.max(0, parseInt(formData.get("top") as string) || 0);
    const width = Math.min(parseInt(formData.get("width") as string) || 400, imgW - left);
    const height = Math.min(parseInt(formData.get("height") as string) || 300, imgH - top);

    if (width <= 0 || height <= 0) return errorResponse("Crop region is outside image bounds");

    const fmt = (meta.format || "jpeg") as "jpeg" | "png" | "webp";
    const mimeMap: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

    const out = await sharp(buffer)
        .extract({ left, top, width, height })
        .toFormat(fmt)
        .toBuffer();

    return imageResponse(out, mimeMap[fmt] || "image/jpeg");
}
