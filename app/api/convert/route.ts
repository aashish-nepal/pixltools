import { NextRequest } from "next/server";
import sharp from "sharp";
import { parseFormFile, validateUpload, errorResponse, imageResponse } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

type Format = "jpeg" | "png" | "webp";

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "convert");
    if (limited) return limited;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await file.arrayBuffer());

    const err = await validateUpload(buffer, file.type);
    if (err) return errorResponse(err);

    const to = (formData.get("to") as Format) || "jpeg";
    const mimeMap: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

    let out: Buffer;
    if (to === "jpeg") {
        out = await sharp(buffer).flatten({ background: { r: 255, g: 255, b: 255 } }).jpeg({ quality: 90 }).toBuffer();
    } else if (to === "png") {
        out = await sharp(buffer).png({ compressionLevel: 8 }).toBuffer();
    } else {
        out = await sharp(buffer).webp({ quality: 85 }).toBuffer();
    }

    return imageResponse(out, mimeMap[to] || "image/jpeg");
}
