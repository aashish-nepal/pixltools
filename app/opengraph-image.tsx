import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PixlTools – Free Online Image Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0a0f1e 100%)",
                    padding: "60px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                }}
            >
                {/* Logo row — PIXL | TOOLS two-tone badge */}
                <div style={{ display: "flex", alignItems: "center", gap: "0px", marginBottom: "40px" }}>
                    <div
                        style={{
                            background: "#10b981",
                            padding: "12px 28px",
                            borderRadius: "12px 0 0 12px",
                            fontSize: 40,
                            fontWeight: 900,
                            color: "#ffffff",
                            letterSpacing: "-1px",
                        }}
                    >
                        PIXL
                    </div>
                    <div
                        style={{
                            background: "#0a0f1e",
                            border: "2px solid #1e293b",
                            borderLeft: "none",
                            padding: "12px 28px",
                            borderRadius: "0 12px 12px 0",
                            fontSize: 40,
                            fontWeight: 900,
                            color: "#ffffff",
                            letterSpacing: "-1px",
                        }}
                    >
                        TOOLS
                    </div>
                </div>

                {/* Headline */}
                <h1
                    style={{
                        fontSize: 68,
                        fontWeight: 900,
                        color: "#ffffff",
                        textAlign: "center",
                        lineHeight: 1.1,
                        margin: "0 0 24px",
                        letterSpacing: "-2px",
                    }}
                >
                    30+ Free Image Tools
                </h1>

                <p
                    style={{
                        fontSize: 26,
                        color: "#94a3b8",
                        textAlign: "center",
                        margin: "0 0 48px",
                        maxWidth: 800,
                        lineHeight: 1.4,
                    }}
                >
                    Compress, Resize, Convert & Enhance — No Signup Required
                </p>

                {/* Tag pills */}
                <div style={{ display: "flex", gap: "12px" }}>
                    {["100% Free", "No Watermarks", "Privacy First", "Sharp Powered"].map((tag) => (
                        <div
                            key={tag}
                            style={{
                                background: "rgba(16,185,129,0.15)",
                                border: "1px solid rgba(16,185,129,0.35)",
                                color: "#34d399",
                                padding: "10px 20px",
                                borderRadius: 100,
                                fontSize: 18,
                                fontWeight: 600,
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size }
    );
}
