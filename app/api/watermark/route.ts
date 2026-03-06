import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, imageResponse, validateUpload } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

/** Escape characters that would break SVG XML structure */
function escapeSvgText(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "watermark");
  if (limited) return limited;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return errorResponse("No file uploaded");
  const buffer = Buffer.from(await file.arrayBuffer());

  const err = await validateUpload(buffer, file.type);
  if (err) return errorResponse(err);

  // Sanitize text before SVG interpolation (#2 fix)
  const rawText = ((formData.get("text") as string) || "PixlTools").slice(0, 80);
  const text = escapeSvgText(rawText);

  const meta = await sharp(buffer).metadata();
  const w = meta.width ?? 800;
  const h = meta.height ?? 600;
  const fontSize = Math.max(20, Math.round(w / 12));

  const svg = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="50%" y="50%"
        dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        fill="rgba(255,255,255,0.45)"
        transform="rotate(-30, ${w / 2}, ${h / 2})"
      >${text}</text>
    </svg>`);

  const fmt = (meta.format || "jpeg") as "jpeg" | "png" | "webp";
  const mimeMap: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

  const out = await sharp(buffer)
    .composite([{ input: svg, tile: false, blend: "over" }])
    .toFormat(fmt)
    .toBuffer();

  return imageResponse(out, mimeMap[fmt] || "image/jpeg");
}

