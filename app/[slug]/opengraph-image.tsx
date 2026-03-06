import { ImageResponse } from "next/og";
import { TOOLS } from "@/lib/tools-data";

export const runtime = "edge";
export const alt = "PixlTools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function OgImage({ params }: Props) {
    const { slug } = await params;
    const tool = TOOLS.find((t) => t.slug === slug);
    const name = tool?.name ?? "Image Tool";
    const desc = tool?.shortDesc ?? "Free online image processing tool";
    const icon = tool?.icon ?? "🖼️";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 60%, #0a1a0f 100%)",
                    padding: "60px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                }}
            >
                {/* Top: PIXL | TOOLS badge */}
                <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
                    <div
                        style={{
                            background: "#10b981",
                            padding: "8px 18px",
                            borderRadius: "8px 0 0 8px",
                            fontSize: 22,
                            fontWeight: 900,
                            color: "#ffffff",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        PIXL
                    </div>
                    <div
                        style={{
                            background: "#0a0f1e",
                            border: "2px solid #1e293b",
                            borderLeft: "none",
                            padding: "8px 18px",
                            borderRadius: "0 8px 8px 0",
                            fontSize: 22,
                            fontWeight: 900,
                            color: "#ffffff",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        TOOLS
                    </div>
                </div>

                {/* Middle: Icon + Tool name + description */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ fontSize: 64 }}>{icon}</div>
                    <div style={{ width: 60, height: 4, background: "#10b981", borderRadius: 4 }} />
                    <h1
                        style={{
                            fontSize: name.length > 20 ? 60 : 76,
                            fontWeight: 900,
                            color: "#ffffff",
                            lineHeight: 1.1,
                            margin: 0,
                            letterSpacing: "-2px",
                        }}
                    >
                        {name}
                    </h1>
                    <p style={{ fontSize: 26, color: "#94a3b8", margin: 0, maxWidth: 800, lineHeight: 1.4 }}>
                        {desc}
                    </p>
                </div>

                {/* Bottom: free badge + domain */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div
                        style={{
                            background: "rgba(16,185,129,0.15)",
                            border: "1px solid rgba(16,185,129,0.4)",
                            color: "#34d399",
                            padding: "8px 20px",
                            borderRadius: 100,
                            fontSize: 18,
                            fontWeight: 700,
                        }}
                    >
                        ✓ 100% Free · No Signup Required
                    </div>
                    <span style={{ color: "#475569", fontSize: 16 }}>pixltools.com</span>
                </div>
            </div>
        ),
        { ...size }
    );
}
