import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, imageResponse } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "collage");
    if (limited) return limited;

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const cols = Math.min(4, Math.max(1, parseInt((formData.get("cols") as string) || "2", 10)));
    const gap = Math.min(20, Math.max(0, parseInt((formData.get("gap") as string) || "10", 10)));
    const bg = (formData.get("bg") as string) || "#000000";

    if (files.length < 2) return errorResponse("Please upload at least 2 images");
    if (files.length > 16) return errorResponse("Maximum 16 images per collage");

    // Process each image: validate + resize to a uniform tile size
    const TILE_W = 400;
    const TILE_H = 400;

    const tiles: Buffer[] = [];
    for (const file of files) {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            return errorResponse(`Unsupported format: ${file.type}`);
        }
        if (file.size > 10 * 1024 * 1024) return errorResponse("Each image must be under 10MB");
        const buf = Buffer.from(await file.arrayBuffer());
        const tile = await sharp(buf)
            .resize(TILE_W, TILE_H, { fit: "cover", position: "centre" })
            .jpeg({ quality: 90 })
            .toBuffer();
        tiles.push(tile);
    }

    const rows = Math.ceil(tiles.length / cols);
    const totalW = cols * TILE_W + (cols + 1) * gap;
    const totalH = rows * TILE_H + (rows + 1) * gap;

    // Parse background color
    const hexToBgColor = (hex: string): { r: number; g: number; b: number } => {
        const clean = hex.replace("#", "");
        return {
            r: parseInt(clean.substring(0, 2), 16) || 0,
            g: parseInt(clean.substring(2, 4), 16) || 0,
            b: parseInt(clean.substring(4, 6), 16) || 0,
        };
    };
    const bgColor = hexToBgColor(bg);

    // Compose collage
    const composites: sharp.OverlayOptions[] = tiles.map((tile, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return {
            input: tile,
            left: gap + col * (TILE_W + gap),
            top: gap + row * (TILE_H + gap),
        };
    });

    const out = await sharp({
        create: {
            width: totalW,
            height: totalH,
            channels: 3,
            background: bgColor,
        },
    })
        .composite(composites)
        .jpeg({ quality: 92 })
        .toBuffer();

    return imageResponse(out, "image/jpeg");
}
