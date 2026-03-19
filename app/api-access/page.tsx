import { Metadata } from "next";
import Link from "next/link";
import { Code2, Zap, ShieldCheck, ArrowRight, CheckCircle2, Terminal } from "lucide-react";

export const metadata: Metadata = {
    title: "PixlTools API Access — Integrate Image Processing into Your App",
    description: "Use the PixlTools image processing API to compress, resize, convert, and enhance images programmatically. JSON & binary responses. Works with any language.",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
    },
    alternates: {
        canonical: "https://www.pixltools.com/api-access",
        languages: { "en": "https://www.pixltools.com/api-access", "x-default": "https://www.pixltools.com/api-access" },
    },
    openGraph: {
        title: "PixlTools API Access — Integrate Image Processing into Your App",
        description: "Use the PixlTools image processing API to compress, resize, convert, and enhance images programmatically.",
        url: "https://www.pixltools.com/api-access",
        type: "website",
        locale: "en_US",
        siteName: "PixlTools",
        images: [{ url: "https://www.pixltools.com/opengraph-image", width: 1200, height: 630, alt: "PixlTools API Access – Image Processing API" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "PixlTools API Access — Integrate Image Processing into Your App",
        description: "Use the PixlTools image processing API to compress, resize, convert, and enhance images programmatically.",
        images: ["https://www.pixltools.com/opengraph-image"],
    },
};

const ENDPOINTS = [
    { method: "POST", path: "/api/compress", desc: "Compress JPG, PNG, or WEBP with custom quality (10–100)" },
    { method: "POST", path: "/api/resize", desc: "Resize image to specific pixel dimensions" },
    { method: "POST", path: "/api/convert", desc: "Convert between JPEG, PNG, and WEBP" },
    { method: "POST", path: "/api/grayscale", desc: "Convert to grayscale / black & white" },
    { method: "POST", path: "/api/rotate", desc: "Rotate image by any angle" },
    { method: "POST", path: "/api/background-remove", desc: "Remove image background" },
];

const CURL_EXAMPLE = `curl -X POST https://pixltools.com/api/compress \\
  -F "file=@your-image.jpg" \\
  -F "quality=80" \\
  --output compressed.jpg`;

const JS_EXAMPLE = `const formData = new FormData();
formData.append('file', fileBlob, 'image.jpg');
formData.append('quality', '80');

const response = await fetch('https://pixltools.com/api/compress', {
  method: 'POST',
  body: formData,
});

const blob = await response.blob();
const url = URL.createObjectURL(blob);`;

export default function ApiAccessPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 mb-6">
                        <Code2 size={12} />
                        Developer API
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-4 tracking-tight">
                        PixlTools <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">API Access</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Integrate professional image processing directly into your app.
                        Compress, resize, convert, and enhance images programmatically — no UI required.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 space-y-16">

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {[
                        { icon: Zap, title: "No auth required", desc: "All endpoints work without API keys or tokens (fair use limits apply)", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                        { icon: ShieldCheck, title: "Zero data retention", desc: "Uploaded files are processed and deleted immediately. No logs.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
                        { icon: Code2, title: "Standard multipart", desc: "Submit as multipart/form-data. Works with fetch, axios, curl, or any HTTP library.", color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
                    ].map(({ icon: Icon, title, desc, color, bg, border }) => (
                        <div key={title} className={`${bg} border ${border} rounded-2xl p-5`}>
                            <Icon size={18} className={`${color} mb-3`} />
                            <h3 className={`font-bold ${color} mb-1`}>{title}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* Endpoints */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Available Endpoints</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="rounded-2xl border border-violet-500/15 overflow-hidden">
                        {ENDPOINTS.map(({ method, path, desc }, i) => (
                            <div key={path} className={`flex items-center gap-4 px-5 py-4 ${i !== ENDPOINTS.length - 1 ? "border-b border-violet-500/10" : ""} ${i % 2 === 0 ? "bg-[#16122a]" : "bg-[#130f25]"}`}>
                                <span className="inline-flex items-center px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold rounded-md flex-shrink-0">
                                    {method}
                                </span>
                                <code className="text-violet-400 text-sm font-mono flex-shrink-0">{path}</code>
                                <p className="text-gray-400 text-sm">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Request format */}
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Request Format</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        All endpoints accept <code className="text-violet-400 bg-[#16122a] px-1 py-0.5 rounded text-xs">multipart/form-data</code> POST requests.
                        Include your image as <code className="text-violet-400 bg-[#16122a] px-1 py-0.5 rounded text-xs">file</code> field and any tool-specific params as additional fields.
                    </p>

                    <h3 className="text-sm font-bold text-violet-400/60 mb-2 flex items-center gap-2"><Terminal size={14} /> cURL Example</h3>
                    <pre className="bg-[#0d0a1f] border border-violet-500/15 rounded-xl p-5 overflow-x-auto text-sm text-emerald-400 font-mono leading-relaxed mb-5">
                        {CURL_EXAMPLE}
                    </pre>

                    <h3 className="text-sm font-bold text-violet-400/60 mb-2 flex items-center gap-2"><Code2 size={14} /> JavaScript / Fetch Example</h3>
                    <pre className="bg-[#0d0a1f] border border-violet-500/15 rounded-xl p-5 overflow-x-auto text-sm text-violet-300 font-mono leading-relaxed">
                        {JS_EXAMPLE}
                    </pre>
                </div>

                {/* Response format */}
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Response Format</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#16122a] border border-violet-500/15 rounded-xl p-5">
                            <h3 className="font-bold text-violet-400 text-sm mb-2">Image endpoints</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">Returns the processed image as binary <code className="text-violet-400">image/jpeg</code>, <code className="text-violet-400">image/png</code>, or <code className="text-violet-400">image/webp</code> with a <code className="text-violet-400">Content-Disposition: attachment</code> header.</p>
                        </div>
                        <div className="bg-[#16122a] border border-violet-500/15 rounded-xl p-5">
                            <h3 className="font-bold text-sky-400 text-sm mb-2">Data endpoints</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">Color picker, metadata, and Base64 tools return <code className="text-violet-400">application/json</code>. Error responses are always <code className="text-violet-400">{"{ error: string }"}</code>.</p>
                        </div>
                    </div>
                </div>

                {/* Limits */}
                <div className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Rate Limits & Fair Use</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                        {[
                            "Maximum file size: 25MB per request",
                            "Rate limit: 30 requests per minute per IP (returns 429 with Retry-After header)",
                            "Max image dimensions: 8000×8000px (32 megapixels)",
                            "Supported formats: JPEG, PNG, WEBP, TIFF (input); JPEG, PNG, WEBP (output)",
                            "No monthly quota — fair use policy applies",
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-violet-400 flex-shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <p className="text-gray-400 text-sm mb-6">Need higher rate limits, SLA guarantees, or a dedicated endpoint? Let us know:</p>
                    <div className="flex justify-center gap-3">
                        <Link href="/" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-2xl transition-all text-sm shadow-lg shadow-violet-900/40">
                            Try the Free Tools
                        </Link>
                        <a href="mailto:api@pixltools.com" className="inline-flex items-center gap-2 border border-violet-500/25 hover:border-violet-500/50 text-violet-300/60 hover:text-violet-300 font-semibold px-6 py-3 rounded-2xl transition-all text-sm">
                            Contact for API Plans <ArrowRight size={13} />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
