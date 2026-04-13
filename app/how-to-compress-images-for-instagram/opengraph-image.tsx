import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "How to Compress Images for Instagram (2026 Guide) – PixlTools";
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
                    background: "linear-gradient(135deg, #0a0f1e 0%, #1a0a2e 60%, #0a0f1e 100%)",
                    padding: "60px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                }}
            >
                {/* Badge */}
                <div
                    style={{
                        fontSize: 14,
                        fontWeight: 700,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "#e879f9",
                        marginBottom: "28px",
                    }}
                >
                    PLATFORM GUIDE · PIXLTOOLS
                </div>

                {/* Instagram logo pill */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        marginBottom: "32px",
                    }}
                >
                    <div
                        style={{
                            background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                            color: "#fff",
                            padding: "14px 32px",
                            borderRadius: "16px",
                            fontSize: 40,
                            fontWeight: 900,
                            letterSpacing: "-1px",
                        }}
                    >
                        Instagram
                    </div>
                    <div style={{ fontSize: 36, fontWeight: 900, color: "#6b7280" }}>+</div>
                    <div
                        style={{
                            background: "#5b21b6",
                            color: "#ddd6fe",
                            padding: "14px 32px",
                            borderRadius: "16px",
                            fontSize: 40,
                            fontWeight: 900,
                            letterSpacing: "-1px",
                        }}
                    >
                        PixlTools
                    </div>
                </div>

                <h1
                    style={{
                        fontSize: 36,
                        fontWeight: 700,
                        color: "#e2e8f0",
                        textAlign: "center",
                        margin: "0 0 16px",
                        maxWidth: 820,
                        lineHeight: 1.3,
                    }}
                >
                    How to Compress Images for Instagram
                </h1>

                <p
                    style={{
                        fontSize: 20,
                        color: "#64748b",
                        textAlign: "center",
                        margin: 0,
                        maxWidth: 700,
                    }}
                >
                    Exact sizes, formats &amp; compression settings — 2026 Guide
                </p>
            </div>
        ),
        { ...size }
    );
}
