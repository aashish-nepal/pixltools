import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, jsonResponse, validateUpload } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

function rgbToHex(r: number, g: number, b: number): string {
    return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "color-picker");
    if (limited) return limited;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await file.arrayBuffer());

    const err = await validateUpload(buffer, file.type);
    if (err) return errorResponse(err);

    // Resize to small thumbnail first for performance
    const thumb = await sharp(buffer).resize(100, 100, { fit: "cover" }).removeAlpha().raw().toBuffer();
    const pixels: { r: number; g: number; b: number; count: number }[] = [];

    // Sample every pixel of the thumbnail — 30×30 = 900 sample points max
    const tiny = await sharp(buffer)
        .resize(30, 30, { fit: "cover" })
        .removeAlpha()
        .raw()
        .toBuffer();

    const colorMap = new Map<string, { r: number; g: number; b: number; count: number }>();
    for (let i = 0; i < tiny.length; i += 3) {
        const r = tiny[i], g = tiny[i + 1], b = tiny[i + 2];
        // Quantize to reduce colour clusters
        const qr = Math.round(r / 16) * 16;
        const qg = Math.round(g / 16) * 16;
        const qb = Math.round(b / 16) * 16;
        const key = `${qr},${qg},${qb}`;
        const entry = colorMap.get(key) || { r: qr, g: qg, b: qb, count: 0 };
        entry.count++;
        colorMap.set(key, entry);
    }

    const palette = Array.from(colorMap.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)
        .map((c) => ({ ...c, hex: rgbToHex(c.r, c.g, c.b) }));

    // Channel stats from Sharp
    const stats = await sharp(buffer).stats();
    const channels = stats.channels.map((ch, i) => ({
        channel: ["Red", "Green", "Blue", "Alpha"][i] || `Ch${i}`,
        mean: Math.round(ch.mean),
        min: ch.min,
        max: ch.max,
    }));

    void thumb; // used earlier for performance reference
    return jsonResponse({ palette, channels, dominant: palette[0]?.hex ?? "#000000" });
}
