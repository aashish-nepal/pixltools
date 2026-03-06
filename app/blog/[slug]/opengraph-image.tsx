import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog-data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props { params: Promise<{ slug: string }> }

export default async function BlogOgImage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    const title = post?.title ?? "PixlTools Blog";
    const category = post?.category ?? "Guide";
    const date = post?.date
        ? new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : "";
    const readTime = post?.readTime ?? 5;

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
                {/* Top: Logo + category badge */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* PIXL | TOOLS badge */}
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

                    {/* Category pill */}
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
                        {category}
                    </div>
                </div>

                {/* Middle: Title */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {/* Decorative line */}
                    <div style={{ width: 60, height: 4, background: "#10b981", borderRadius: 4 }} />

                    <h1
                        style={{
                            fontSize: title.length > 60 ? 42 : 52,
                            fontWeight: 900,
                            color: "#ffffff",
                            lineHeight: 1.15,
                            margin: 0,
                            letterSpacing: "-1.5px",
                            maxWidth: 900,
                        }}
                    >
                        {title}
                    </h1>
                </div>

                {/* Bottom: Meta info */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: "24px" }}>
                        {date && (
                            <span style={{ color: "#64748b", fontSize: 18, fontWeight: 500 }}>
                                📅 {date}
                            </span>
                        )}
                        <span style={{ color: "#64748b", fontSize: 18, fontWeight: 500 }}>
                            ⏱ {readTime} min read
                        </span>
                    </div>
                    <span style={{ color: "#475569", fontSize: 16 }}>pixltools.com/blog</span>
                </div>
            </div>
        ),
        { ...size }
    );
}
