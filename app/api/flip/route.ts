import { NextRequest } from "next/server";
import sharp from "sharp";
import { errorResponse, imageResponse, validateUpload } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "flip");
    if (limited) return limited;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await file.arrayBuffer());

    const err = await validateUpload(buffer, file.type);
    if (err) return errorResponse(err);

    const direction = (formData.get("direction") as string) || "horizontal";
    const meta = await sharp(buffer).metadata();
    const fmt = (meta.format || "jpeg") as "jpeg" | "png" | "webp";
    const mimeMap: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };
    const quality = 82;

    const img = direction === "horizontal" ? sharp(buffer).flop() : sharp(buffer).flip();
    let out: Buffer;
    if (fmt === "png") {
        out = await img.png().toBuffer();
    } else if (fmt === "webp") {
        out = await img.webp({ quality }).toBuffer();
    } else {
        out = await img.jpeg({ quality }).toBuffer();
    }
    return imageResponse(out, mimeMap[fmt] || "image/jpeg");
}
