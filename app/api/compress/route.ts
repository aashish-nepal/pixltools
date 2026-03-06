import { NextRequest } from "next/server";
import sharp from "sharp";
import { validateUpload, errorResponse, imageResponse } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "compress");
    if (limited) return limited;

    // Parse once — extract both file and format from the same formData
    const formData = await req.formData();
    const fileEntry = formData.get("file") as File | null;
    if (!fileEntry) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await fileEntry.arrayBuffer());
    const format = (formData.get("format") as string) || null;

    const err = await validateUpload(buffer, fileEntry.type);
    if (err) return errorResponse(err);

    const meta = await sharp(buffer).metadata();
    const fmt = (format || meta.format || "jpeg") as "jpeg" | "png" | "webp";

    let out: Buffer;
    if (fmt === "jpeg") {
        out = await sharp(buffer).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    } else if (fmt === "png") {
        out = await sharp(buffer).png({ compressionLevel: 9, palette: true }).toBuffer();
    } else {
        out = await sharp(buffer).webp({ quality: 80 }).toBuffer();
    }

    const mimeMap: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };
    return imageResponse(out, mimeMap[fmt] || "image/jpeg");
}
