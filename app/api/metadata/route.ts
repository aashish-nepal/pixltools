import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, jsonResponse, validateUpload } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "metadata");
    if (limited) return limited;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await file.arrayBuffer());

    const err = await validateUpload(buffer, file.type);
    if (err) return errorResponse(err);

    const meta = await sharp(buffer).metadata();

    let exifData: Record<string, unknown> = {};
    try {
        const exifr = (await import("exifr")).default;
        exifData = (await exifr.parse(buffer, { gps: true, exif: true, iptc: true })) ?? {};
    } catch { /* exifr is optional */ }

    const result = {
        // Technical
        format: meta.format,
        width: meta.width,
        height: meta.height,
        channels: meta.channels,
        depth: meta.depth,
        density: meta.density,
        colorspace: meta.space,
        hasAlpha: meta.hasAlpha,
        hasProfile: meta.hasProfile,
        isProgressive: meta.isProgressive,
        orientation: meta.orientation,
        fileSizeBytes: buffer.length,
        fileSizeKB: (buffer.length / 1024).toFixed(1),
        megapixels: meta.width && meta.height ? ((meta.width * meta.height) / 1_000_000).toFixed(2) : null,
        // EXIF
        ...Object.fromEntries(
            Object.entries(exifData)
                .filter(([, v]) => v !== null && v !== undefined && typeof v !== "object")
        ),
    };

    return jsonResponse(result);
}
