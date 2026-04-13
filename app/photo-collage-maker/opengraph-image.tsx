import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Free Photo Collage Maker – Combine Images Online | PixlTools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TILE_COLORS = [
    "#1e1b4b", "#2d1b69", "#312e81", "#1e3a5f",
    "#1a2744", "#2d1b69", "#1e1b4b", "#312e81",
    "#1e3a5f", "#2d1b69", "#1e1b4b", "#1a2744",
];

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
                    background: "linear-gradient(135deg, #0a0f1e 0%, #0f0d1f 60%, #0a0f1e 100%)",
                    padding: "60px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    position: "relative",
                }}
            >
                {/* Decorative collage grid in background */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: 220,
                        height: 220,
                        gap: 6,
                        position: "absolute",
                        right: 80,
                        top: "50%",
                        transform: "translateY(-50%) rotate(8deg)",
                        opacity: 0.35,
                    }}
                >
                    {TILE_COLORS.map((color, i) => (
                        <div
                            key={i}
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 8,
                                background: color,
                                border: "1px solid rgba(139,92,246,0.3)",
                            }}
                        />
                    ))}
                </div>

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
                    FREE TOOL · PIXLTOOLS
                </div>

                {/* Icon + title row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 24,
                        marginBottom: 32,
                    }}
                >
                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 20,
                            background: "rgba(139,92,246,0.2)",
                            border: "2px solid rgba(139,92,246,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 40,
                        }}
                    >
                        🖼️
                    </div>
                </div>

                <h1
                    style={{
                        fontSize: 40,
                        fontWeight: 800,
                        color: "#e2e8f0",
                        textAlign: "center",
                        margin: "0 0 16px",
                        maxWidth: 740,
                        lineHeight: 1.25,
                    }}
                >
                    Free Photo Collage Maker
                </h1>

                <p
                    style={{
                        fontSize: 20,
                        color: "#64748b",
                        textAlign: "center",
                        margin: 0,
                        maxWidth: 680,
                    }}
                >
                    Combine up to 16 images into a custom grid — no signup, no watermarks
                </p>
            </div>
        ),
        { ...size }
    );
}
