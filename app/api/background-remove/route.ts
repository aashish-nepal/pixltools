import { NextRequest } from "next/server";
import sharp from "sharp";
import { parseFormFile, validateUpload, errorResponse, imageResponse } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "background-remove");
    if (limited) return limited;

    const file = await parseFormFile(req);
    if (!file) return errorResponse("No file uploaded");

    const err = await validateUpload(file.buffer, file.mime);
    if (err) return errorResponse(err);

    const apiKey = process.env.REMOVE_BG_API_KEY;

    // ── Strategy 1: remove.bg API ─────────────────────────────────────────────
    if (apiKey) {
        try {
            const form = new FormData();
            form.append("image_file", new Blob([new Uint8Array(file.buffer)], { type: file.mime }), file.filename);
            form.append("size", "auto");

            const res = await fetch("https://api.remove.bg/v1.0/removebg", {
                method: "POST",
                headers: { "X-Api-Key": apiKey },
                body: form,
            });

            if (res.ok) {
                const resultBuffer = Buffer.from(await res.arrayBuffer());
                const response = imageResponse(resultBuffer, "image/png");
                response.headers.set("X-BG-Method", "ai");
                return response;
            }

            // #7 fix: Tell the user explicitly when the remove.bg API fails
            const errText = await res.text();
            console.error("remove.bg error:", errText);
            return errorResponse(
                "Background removal service is unavailable. Please try again later or use an image with a solid-color background.",
                503
            );
        } catch (e) {
            console.error("remove.bg fetch failed:", e);
            return errorResponse("Network error contacting background removal service. Please try again.", 503);
        }
    }


    // ── Strategy 2: Sharp threshold fallback ─────────────────────────────────
    // Works well for solid-color backgrounds (white, green screen, etc.)
    const { data, info } = await sharp(file.buffer)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const w = info.width;
    const h = info.height;
    const channels = info.channels;

    // Sample 4 corners to estimate background color
    const samplePixel = (x: number, y: number) => {
        const i = (y * w + x) * channels;
        return { r: data[i], g: data[i + 1], b: data[i + 2] };
    };
    const corners = [
        samplePixel(0, 0), samplePixel(w - 1, 0),
        samplePixel(0, h - 1), samplePixel(w - 1, h - 1),
    ];
    const bg = {
        r: Math.round(corners.reduce((s, c) => s + c.r, 0) / 4),
        g: Math.round(corners.reduce((s, c) => s + c.g, 0) / 4),
        b: Math.round(corners.reduce((s, c) => s + c.b, 0) / 4),
    };

    const THRESHOLD = 45;
    const output = Buffer.from(data);
    for (let i = 0; i < output.length; i += channels) {
        const dr = Math.abs(output[i] - bg.r);
        const dg = Math.abs(output[i + 1] - bg.g);
        const db = Math.abs(output[i + 2] - bg.b);
        if (dr + dg + db < THRESHOLD * 3) {
            output[i + 3] = 0; // transparent
        }
    }

    const out = await sharp(output, { raw: { width: w, height: h, channels: 4 } })
        .png()
        .toBuffer();

    // Tell the client which method was used
    const response = imageResponse(out, "image/png");
    response.headers.set("X-BG-Method", apiKey ? "ai-fallback" : "threshold");
    return response;
}
