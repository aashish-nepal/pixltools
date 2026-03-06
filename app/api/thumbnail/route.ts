import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, imageResponse, validateUpload } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

const PRESETS: Record<string, { w: number; h: number }> = {
    small: { w: 150, h: 150 },
    medium: { w: 300, h: 300 },
    large: { w: 600, h: 600 },
    youtube: { w: 1280, h: 720 },
    twitter: { w: 1600, h: 900 },
    square: { w: 512, h: 512 },
};

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "thumbnail");
    if (limited) return limited;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await file.arrayBuffer());

    const err = await validateUpload(buffer, file.type);
    if (err) return errorResponse(err);

    const preset = (formData.get("preset") as string) || "medium";
    const dim = PRESETS[preset] || PRESETS.medium;
    const width = Math.min(parseInt(formData.get("width") as string) || dim.w, 3000);
    const height = Math.min(parseInt(formData.get("height") as string) || dim.h, 3000);

    const out = await sharp(buffer)
        .resize(width, height, { fit: "cover", position: "centre" })
        .jpeg({ quality: 85 })
        .toBuffer();

    return imageResponse(out, "image/jpeg");
}
