import { NextRequest } from "next/server";
import { validateUpload, errorResponse, jsonResponse } from "@/lib/api-utils";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const limited = rateLimit(req, "base64");
    if (limited) return limited;

    const formData = await req.formData();
    const fileEntry = formData.get("file") as File | null;
    if (!fileEntry) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await fileEntry.arrayBuffer());

    const err = await validateUpload(buffer, fileEntry.type);
    if (err) return errorResponse(err);

    const base64 = buffer.toString("base64");
    const dataUrl = `data:${fileEntry.type};base64,${base64}`;

    return jsonResponse({
        base64: dataUrl,
        rawBase64: base64,
        mimeType: fileEntry.type,
        sizeBytes: buffer.length,
        sizeKB: (buffer.length / 1024).toFixed(1),
    });
}
