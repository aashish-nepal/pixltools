import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, imageResponse, validateUpload } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "border");
    if (limited) return limited;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await file.arrayBuffer());

    const err = await validateUpload(buffer, file.type);
    if (err) return errorResponse(err);

    const borderWidth = Math.min(Math.max(parseInt(formData.get("width") as string) || 10, 1), 200);
    const colorHex = ((formData.get("color") as string) || "#ffffff").replace("#", "");
    const r = parseInt(colorHex.slice(0, 2), 16) || 255;
    const g = parseInt(colorHex.slice(2, 4), 16) || 255;
    const b = parseInt(colorHex.slice(4, 6), 16) || 255;

    const meta = await sharp(buffer).metadata();
    const fmt = (meta.format || "jpeg") as "jpeg" | "png" | "webp";
    const mimeMap: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

    const out = await sharp(buffer)
        .extend({ top: borderWidth, bottom: borderWidth, left: borderWidth, right: borderWidth, background: { r, g, b } })
        .toFormat(fmt)
        .toBuffer();

    return imageResponse(out, mimeMap[fmt] || "image/jpeg");
}
