import Link from "next/link";
import Image from "next/image";
import { Shield, FileText, Map, BookOpen, Lock, Clock, ShieldCheck, Info } from "lucide-react";

const POPULAR_TOOLS = [
    { name: "Compress Image", slug: "compress-image" },
    { name: "Resize Image", slug: "resize-image" },
    { name: "Crop Image", slug: "crop-image" },
    { name: "JPG to PNG", slug: "jpg-to-png" },
    { name: "PNG to WEBP", slug: "png-to-webp" },
    { name: "Background Remover", slug: "remove-image-background" },
    { name: "Watermark Image", slug: "watermark-image" },
    { name: "Image Upscaler", slug: "image-upscaler" },
];

const CONVERT_TOOLS = [
    { name: "JPG to WEBP", slug: "jpg-to-webp" },
    { name: "PNG to JPG", slug: "png-to-jpg" },
    { name: "WEBP to JPG", slug: "webp-to-jpg" },
    { name: "WEBP to PNG", slug: "webp-to-png" },
    { name: "Image to PDF", slug: "image-to-pdf" },
    { name: "PDF to Image", slug: "pdf-to-image" },
];

const TRUST_BADGES = [
    { icon: ShieldCheck, label: "No data stored" },
    { icon: Lock, label: "No account needed" },
    { icon: Clock, label: "Instant processing" },
];

export default function Footer() {
    return (
        <footer className="bg-[#0b0816] border-t border-violet-500/10">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8">

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-10 sm:py-14 border-b border-violet-500/10">

                    {/* Brand */}
                    <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-4">
                        <Link href="/" className="inline-flex items-center w-fit">
                            <Image
                                src="/logo.jpg"
                                alt="PixlTools"
                                width={110}
                                height={30}
                                className="h-7 w-auto object-contain"
                            />
                        </Link>

                        <p className="text-xs text-gray-300 leading-relaxed">
                            Professional image processing, free forever. Powered by Sharp — trusted by Netflix, Canva, and more.
                        </p>

                        {/* Trust */}
                        <div className="flex flex-col gap-1.5 pt-1">
                            {TRUST_BADGES.map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-center gap-1.5 text-xs text-gray-300">
                                    <Icon size={11} className="text-violet-400 flex-shrink-0" strokeWidth={2} />
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Popular Tools */}
                    <div>
                        <p className="text-[11px] font-semibold text-violet-600 uppercase tracking-widest mb-4">Popular Tools</p>
                        <ul className="flex flex-col gap-2.5">
                            {POPULAR_TOOLS.map(({ name, slug }) => (
                                <li key={slug}>
                                    <Link href={`/${slug}`} className="text-xs text-gray-300 hover:text-violet-300 transition-colors">
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Convert */}
                    <div>
                        <p className="text-[11px] font-semibold text-violet-600 uppercase tracking-widest mb-4">Convert</p>
                        <ul className="flex flex-col gap-2.5">
                            {CONVERT_TOOLS.map(({ name, slug }) => (
                                <li key={slug}>
                                    <Link href={`/${slug}`} className="text-xs text-gray-300 hover:text-violet-300 transition-colors">
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources & Legal */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <p className="text-[11px] font-semibold text-violet-600 uppercase tracking-widest mb-4">Resources</p>
                            <ul className="flex flex-col gap-2.5">
                                <li>
                                    <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-violet-300 transition-colors">
                                        <BookOpen size={11} /> Image Guides Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-violet-300 transition-colors">
                                        <Info size={11} /> About PixlTools
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/compress-image" className="text-xs text-gray-300 hover:text-violet-300 transition-colors">
                                        Compress Image Free
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/resize-image" className="text-xs text-gray-300 hover:text-violet-300 transition-colors">
                                        Resize Image Online
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-[11px] font-semibold text-violet-600 uppercase tracking-widest mb-4">Legal</p>
                            <ul className="flex flex-col gap-2.5">
                                <li>
                                    <Link href="/privacy-policy" className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-violet-300 transition-colors">
                                        <Shield size={11} /> Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-violet-300 transition-colors">
                                        <FileText size={11} /> Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sitemap.xml" className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-violet-300 transition-colors">
                                        <Map size={11} /> Sitemap
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-[11px] text-violet-300/30">
                    <p>© {new Date().getFullYear()} PixlTools. All rights reserved.</p>
                    <p>Built with <span className="text-gray-300">Sharp</span> &amp; <span className="text-gray-300">Next.js</span> · 100% free, always.</p>
                </div>

            </div>
        </footer>
    );
}
