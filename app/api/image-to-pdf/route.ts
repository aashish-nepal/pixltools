import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { errorResponse } from "@/lib/api-utils";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return errorResponse("No file uploaded");
    const buffer = Buffer.from(await file.arrayBuffer());

    const jpgBuffer = await sharp(buffer).jpeg({ quality: 90 }).toBuffer();
    const meta = await sharp(buffer).metadata();
    const w = meta.width || 800;
    const h = meta.height || 600;

    const pdfDoc = await PDFDocument.create();
    // A4 at 72dpi: 595x842 pt
    const page = pdfDoc.addPage([595, 842]);
    const jpgImage = await pdfDoc.embedJpg(jpgBuffer);
    const scale = Math.min(595 / w, 842 / h);
    const scaledW = w * scale;
    const scaledH = h * scale;
    page.drawImage(jpgImage, {
        x: (595 - scaledW) / 2,
        y: (842 - scaledH) / 2,
        width: scaledW,
        height: scaledH,
    });

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(Buffer.from(pdfBytes), {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="output.pdf"',
            "Cache-Control": "no-store",
        },
    });
}
