import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

// ─── Constants ───────────────────────────────────────────────────────────────
export const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/tiff"];
export const MAX_FILE_BYTES = 10 * 1024 * 1024;       // 10 MB (matches UI / FAQ advertised limit)
export const MAX_WIDTH = 8000;
export const MAX_HEIGHT = 8000;
export const MAX_MEGAPIXELS = 32;                       // 32 MP (~5600x5600)

// ─── Magic Bytes Signatures ───────────────────────────────────────────────────
const MAGIC_BYTES: { mime: string; bytes: number[]; offset?: number }[] = [
    { mime: "image/jpeg", bytes: [0xFF, 0xD8, 0xFF] },
    { mime: "image/png", bytes: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A] },
    { mime: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46], offset: 0 }, // RIFF header
    { mime: "image/tiff", bytes: [0x49, 0x49, 0x2A, 0x00] },             // Little-endian TIFF
    { mime: "image/tiff", bytes: [0x4D, 0x4D, 0x00, 0x2A] },             // Big-endian TIFF
];

function detectMagicBytes(buffer: Buffer): string | null {
    for (const sig of MAGIC_BYTES) {
        const offset = sig.offset ?? 0;
        const matches = sig.bytes.every((b, i) => buffer[offset + i] === b);
        if (matches) {
            // Extra check for WEBP: bytes 8-11 must be "WEBP"
            if (sig.mime === "image/webp") {
                const webp = buffer.slice(8, 12).toString("ascii");
                if (webp !== "WEBP") continue;
            }
            return sig.mime;
        }
    }
    return null;
}

// ─── Validators ───────────────────────────────────────────────────────────────
export function validateMimeType(mime: string): string | null {
    if (!ALLOWED_MIMES.includes(mime)) {
        return `Unsupported file type: ${mime}. Allowed: JPEG, PNG, WEBP, TIFF`;
    }
    return null;
}

export function validateFileSize(bytes: number): string | null {
    if (bytes > MAX_FILE_BYTES) {
        return `File too large (${(bytes / 1024 / 1024).toFixed(1)} MB). Max: 25 MB`;
    }
    return null;
}

export function validateMagicBytes(buffer: Buffer, claimedMime: string): string | null {
    const detected = detectMagicBytes(buffer);
    if (!detected) {
        return "File content does not match a supported image format";
    }
    if (detected !== claimedMime) {
        return `File extension mismatch: claimed ${claimedMime} but file is ${detected}`;
    }
    return null;
}

export async function validateDimensions(buffer: Buffer): Promise<string | null> {
    try {
        const meta = await sharp(buffer).metadata();
        const w = meta.width ?? 0;
        const h = meta.height ?? 0;
        if (w > MAX_WIDTH || h > MAX_HEIGHT) {
            return `Image too large: ${w}×${h}px. Maximum: ${MAX_WIDTH}×${MAX_HEIGHT}px`;
        }
        const mp = (w * h) / 1_000_000;
        if (mp > MAX_MEGAPIXELS) {
            return `Image exceeds ${MAX_MEGAPIXELS} megapixels (${mp.toFixed(1)} MP). Please downscale first.`;
        }
        return null;
    } catch {
        return "Could not read image dimensions";
    }
}

/** Full validation pipeline: size → MIME → magic bytes → dimensions */
export async function validateUpload(
    buffer: Buffer,
    mime: string
): Promise<string | null> {
    return (
        validateFileSize(buffer.length) ??
        validateMimeType(mime) ??
        validateMagicBytes(buffer, mime) ??
        (await validateDimensions(buffer))
    );
}

// ─── File Parsing ────────────────────────────────────────────────────────────
export async function parseFormFile(
    req: NextRequest
): Promise<{ buffer: Buffer; mime: string; filename: string } | null> {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        if (!file) return null;
        const arrayBuffer = await file.arrayBuffer();
        return {
            buffer: Buffer.from(arrayBuffer),
            mime: file.type,
            filename: file.name,
        };
    } catch {
        return null;
    }
}

// ─── Response Helpers ─────────────────────────────────────────────────────────
export function errorResponse(msg: string, status = 400): NextResponse {
    return new NextResponse(JSON.stringify({ error: msg }), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export function imageResponse(
    buffer: Buffer,
    mime: string,
    filename = "pixltools-result"
): NextResponse {
    const ext = mime.split("/")[1] || "jpg";
    return new NextResponse(new Uint8Array(buffer), {
        status: 200,
        headers: {
            "Content-Type": mime,
            "Content-Disposition": `attachment; filename="${filename}.${ext}"`,
            // Processed images are unique per upload — no caching
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "X-Content-Type-Options": "nosniff",
        },
    });
}

/** For non-binary JSON responses (color-picker, metadata) */
export function jsonResponse(data: unknown, status = 200): NextResponse {
    return NextResponse.json(data, {
        status,
        headers: {
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff",
        },
    });
}

// validateImage was removed — use validateUpload() directly.
