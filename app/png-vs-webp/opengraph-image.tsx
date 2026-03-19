import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PNG vs WebP: Which Image Format is Better?";
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
                    background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 60%, #0a0f1e 100%)",
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
                        color: "#a78bfa",
                        marginBottom: "28px",
                    }}
                >
                    FORMAT GUIDE · PIXLTOOLS
                </div>

                {/* Headline row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "32px",
                        marginBottom: "40px",
                    }}
                >
                    {/* PNG pill */}
                    <div
                        style={{
                            background: "#5b21b6",
                            color: "#ddd6fe",
                            padding: "16px 36px",
                            borderRadius: "16px",
                            fontSize: 52,
                            fontWeight: 900,
                            letterSpacing: "-1px",
                        }}
                    >
                        PNG
                    </div>

                    <div style={{ fontSize: 48, fontWeight: 900, color: "#6b7280" }}>vs</div>

                    {/* WebP pill */}
                    <div
                        style={{
                            background: "#065f46",
                            color: "#a7f3d0",
                            padding: "16px 36px",
                            borderRadius: "16px",
                            fontSize: 52,
                            fontWeight: 900,
                            letterSpacing: "-1px",
                        }}
                    >
                        WebP
                    </div>
                </div>

                <h1
                    style={{
                        fontSize: 34,
                        fontWeight: 700,
                        color: "#e2e8f0",
                        textAlign: "center",
                        margin: "0 0 16px",
                        maxWidth: 820,
                        lineHeight: 1.3,
                    }}
                >
                    Is WebP Better Than PNG for the Web?
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
                    File size, transparency, browser support & when to switch to WebP
                </p>
            </div>
        ),
        { ...size }
    );
}
