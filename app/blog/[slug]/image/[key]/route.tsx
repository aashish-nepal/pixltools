import { ImageResponse } from "next/og";
import {
    getChartConfig,
    getChartDimensions,
    type BarChartConfig,
    type TableChartConfig,
    type StepsChartConfig,
} from "@/lib/blog-chart-data";

export const runtime = "edge";

interface Props {
    params: Promise<{ slug: string; key: string }>;
}

const FONT_STACK = "system-ui, -apple-system, sans-serif";

function Frame({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(135deg, #0b0816 0%, #150f2e 100%)",
                padding: "56px 64px",
                fontFamily: FONT_STACK,
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", marginBottom: "36px" }}>
                <div style={{ width: 48, height: 4, background: "#8b5cf6", borderRadius: 4, marginBottom: 18 }} />
                <h1 style={{ fontSize: 38, fontWeight: 800, color: "#ede9fe", margin: 0, letterSpacing: "-1px" }}>
                    {title}
                </h1>
                {subtitle && (
                    <p style={{ fontSize: 19, color: "#a1a1aa", margin: "10px 0 0" }}>{subtitle}</p>
                )}
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
                <span style={{ color: "#52525b", fontSize: 16 }}>pixltools.com/blog</span>
            </div>
        </div>
    );
}

function BarChartView({ config }: { config: BarChartConfig }) {
    const max = Math.max(...config.bars.map((b) => b.value));
    const TRACK_WIDTH = 760;

    return (
        <Frame title={config.title} subtitle={config.subtitle}>
            <div style={{ display: "flex", flexDirection: "column", gap: "26px", justifyContent: "center", flex: 1 }}>
                {config.bars.map((bar) => {
                    const width = Math.max(24, Math.round((bar.value / max) * TRACK_WIDTH));
                    return (
                        <div key={bar.label} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{ fontSize: 22, fontWeight: 700, color: bar.highlight ? "#c4b5fd" : "#d4d4d8" }}>
                                        {bar.label}
                                    </span>
                                    {bar.highlight && (
                                        <span
                                            style={{
                                                display: "flex",
                                                fontSize: 13,
                                                fontWeight: 800,
                                                letterSpacing: "0.5px",
                                                color: "#c4b5fd",
                                                background: "rgba(139,92,246,0.15)",
                                                border: "1px solid rgba(196,181,253,0.4)",
                                                borderRadius: 999,
                                                padding: "3px 10px",
                                            }}
                                        >
                                            BEST
                                        </span>
                                    )}
                                </div>
                                <span style={{ fontSize: 20, fontWeight: 600, color: "#a1a1aa" }}>{bar.displayValue}</span>
                            </div>
                            <div style={{ display: "flex", width: TRACK_WIDTH, height: 26, background: "rgba(139,92,246,0.08)", borderRadius: 8 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        width,
                                        height: 26,
                                        borderRadius: 8,
                                        background: bar.highlight
                                            ? "linear-gradient(90deg, #a78bfa, #c4b5fd)"
                                            : "linear-gradient(90deg, #6d28d9, #7c3aed)",
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Frame>
    );
}

function TableView({ config }: { config: TableChartConfig }) {
    return (
        <Frame title={config.title} subtitle={config.subtitle}>
            <div style={{ display: "flex", flexDirection: "column", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(139,92,246,0.15)" }}>
                <div style={{ display: "flex", background: "rgba(139,92,246,0.12)" }}>
                    <div style={{ display: "flex", width: "34%", padding: "18px 22px", fontSize: 18, fontWeight: 700, color: "#ddd6fe" }}>
                        {config.rowHeader}
                    </div>
                    {config.columns.map((col) => (
                        <div key={col} style={{ display: "flex", width: `${66 / config.columns.length}%`, padding: "18px 22px", fontSize: 18, fontWeight: 700, color: "#ddd6fe" }}>
                            {col}
                        </div>
                    ))}
                </div>
                {config.rows.map((row, i) => (
                    <div
                        key={row.label}
                        style={{
                            display: "flex",
                            background: i % 2 === 0 ? "#15112a" : "#120f23",
                            borderTop: "1px solid rgba(139,92,246,0.08)",
                        }}
                    >
                        <div style={{ display: "flex", width: "34%", padding: "16px 22px", fontSize: 18, fontWeight: 600, color: "#e4e4e7" }}>
                            {row.label}
                        </div>
                        {row.cols.map((cell, ci) => (
                            <div key={ci} style={{ display: "flex", width: `${66 / config.columns.length}%`, padding: "16px 22px", fontSize: 18, color: "#a1a1aa" }}>
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Frame>
    );
}

function StepsView({ config }: { config: StepsChartConfig }) {
    return (
        <Frame title={config.title} subtitle={config.subtitle}>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px", justifyContent: "center", flex: 1 }}>
                {config.steps.map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 44,
                                height: 44,
                                borderRadius: 999,
                                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                                color: "#ffffff",
                                fontSize: 20,
                                fontWeight: 800,
                                flexShrink: 0,
                            }}
                        >
                            {i + 1}
                        </div>
                        <span style={{ fontSize: 23, color: "#e4e4e7", fontWeight: 500 }}>{step}</span>
                    </div>
                ))}
            </div>
        </Frame>
    );
}

export async function GET(_req: Request, { params }: Props) {
    const { slug, key } = await params;
    const config = getChartConfig(slug, key);
    if (!config) {
        return new Response("Not found", { status: 404 });
    }

    const { width, height } = getChartDimensions(config);

    let element: React.ReactElement;
    if (config.type === "bar") {
        element = <BarChartView config={config} />;
    } else if (config.type === "steps") {
        element = <StepsView config={config} />;
    } else {
        element = <TableView config={config} />;
    }

    const response = new ImageResponse(element, { width, height });
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return response;
}
