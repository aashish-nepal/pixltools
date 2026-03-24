import { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import ToolGridClient from "@/components/ui/ToolGridClient";
import { buildJsonLdFAQ } from "@/lib/utils";
import { TOOLS } from "@/lib/tools-data";
import {
  ShieldCheck, Zap, Star, ArrowRight, Upload, Settings2, Download,
  Globe, Lock, TrendingUp,
} from "lucide-react";

// Lazy-load below-fold components — keeps them out of the critical JS bundle
const TrustBar = dynamic(() => import("@/components/ui/TrustBar"), { loading: () => null });
const AdBanner = dynamic(() => import("@/components/ui/AdBanner"), { loading: () => null });
const FAQSection = dynamic(() => import("@/components/ui/FAQSection"), { loading: () => null });

/** Reusable aurora + grid-lines atmosphere used across multiple sections */
function SectionAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Mobile: single cheap CSS gradient — no blur() cost */}
      <div className="sm:hidden absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 50% at 50% 0%, rgba(109,40,217,0.12) 0%, transparent 70%)" }} />

      {/* Desktop: full aurora */}
      <div className="hidden sm:block absolute -top-24 left-1/2 -translate-x-1/2 w-[70%] h-[60%] rounded-full bg-violet-600/12 blur-[170px]" />
      <div className="hidden sm:block absolute -bottom-28 right-[-5%] w-[55%] h-[55%] rounded-full bg-fuchsia-600/06 blur-[160px]" />
      <div className="hidden sm:block absolute inset-0 hero-grid-lines opacity-14" />
      <div className="hidden sm:block absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 0%, rgba(139,92,246,0.07), transparent 60%)" }} />
      <div className="hidden sm:block absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,5,15,0.2) 0%, rgba(7,5,15,0.8) 85%, rgba(7,5,15,0.95) 100%)" }} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Free Online Image Tools – Compress, Resize & Convert | PixlTools",
  description: "30+ free online image tools. Compress JPG, PNG, WEBP, resize images, convert formats, add watermarks, and more. No signup. 100% free.",
  alternates: {
    canonical: "https://www.pixltools.com",
  },
};


const homeFaqs = [
  { question: "Are these image tools really free?", answer: "Yes, all 30+ image tools on PixlTools are completely free to use. No signup, no watermarks, no hidden fees." },
  { question: "Is my image data stored on your servers?", answer: "No. Your images are processed in real-time and immediately deleted. We never store or share your images." },
  { question: "What image formats are supported?", answer: "We support JPEG, PNG, WEBP, and more. Each tool specifies the formats it accepts." },
  { question: "Is there a file size limit?", answer: "Yes, the maximum file size is 10MB per image. This covers the vast majority of use cases." },
  { question: "Do these tools work on mobile?", answer: "Yes! PixlTools is fully responsive and works perfectly on any smartphone or tablet." },
];

const STATS = [
  { value: "30+", label: "Free Tools" },
  { value: "10MB", label: "Max File Size" },
  { value: "0", label: "Accounts\u00A0Needed" },
  { value: "100%", label: "Private & Secure" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    desc: "Server-side Sharp processing delivers results in milliseconds. No queues, no waiting.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Lock,
    title: "Zero Data Retention",
    desc: "Your images are processed and deleted immediately. We never store, log, or share your files.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Star,
    title: "Professional Quality",
    desc: "Powered by Sharp — the same library used by Netflix, Canva, and major tech companies.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    desc: "Fully responsive and tested across all modern browsers, desktops, tablets, and phones.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  {
    icon: ShieldCheck,
    title: "No Registration Required",
    desc: "Jump straight to your tools. No account, no email, no credit card — ever.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    icon: TrendingUp,
    title: "SEO & Performance Ready",
    desc: "Optimized images mean faster websites, better Core Web Vitals, and higher Google rankings.",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
];

export default function HomePage() {
  const faqSchema = buildJsonLdFAQ(homeFaqs);
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PixlTools",
    url: "https://www.pixltools.com",
    description: "30+ free online image tools. Compress, resize, convert, and optimize images instantly.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.pixltools.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PixlTools",
    url: "https://www.pixltools.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.pixltools.com/logo.jpg",
      width: 512,
      height: 512,
    },
    description: "Free online image tools — compress, resize, crop, convert, and optimize images instantly.",
    sameAs: [
      "https://twitter.com/pixltools",
      "https://www.linkedin.com/company/pixltools",
      "https://www.youtube.com/@pixltools",
      "https://www.producthunt.com/products/pixltools",
    ],
  };

  return (
    <main className="bg-[#0b0816]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden" style={{ background: "#07050f" }}>
        {/* Aurora orbs — hidden on mobile (blur() is GPU-expensive on low-end phones) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Mobile: single cheap CSS gradient, no blur */}
          <div className="sm:hidden absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(109,40,217,0.22) 0%, transparent 70%)" }} />

          {/* Desktop: full aurora blur suite */}
          {/* Structural grid */}
          <div className="hidden sm:block absolute inset-0 hero-grid-lines opacity-55" />
          {/* Primary centre violet bloom */}
          <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] h-[540px] rounded-full blur-[150px]" style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.42) 0%, rgba(76,29,149,0.22) 45%, transparent 72%)" }} />
          {/* Top-left indigo leak */}
          <div className="hidden sm:block absolute -top-24 -left-40 w-[520px] h-[520px] rounded-full blur-[110px]" style={{ background: "radial-gradient(ellipse, rgba(79,70,229,0.28) 0%, transparent 65%)" }} />
          {/* Bottom-right fuchsia accent */}
          <div className="hidden sm:block absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full blur-[120px]" style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.2) 0%, transparent 68%)" }} />
          {/* Dot grid overlay */}
          <div className="hidden sm:block absolute inset-0 tool-hero-pattern opacity-60" />
          {/* Edge vignette */}
          <div className="hidden sm:block absolute inset-0" style={{ background: "radial-gradient(ellipse 85% 85% at 50% 45%, transparent 35%, #07050f 100%)" }} />
          {/* Thin top specular line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.45) 50%, transparent)" }} />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-14 md:py-24">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            {/* Copy */}
            <div className="text-left">
              {/* Mobile-only animated badge */}
              <div className="sm:hidden mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 badge-shimmer">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-[11px] font-bold text-violet-300 tracking-wide">30+ Free Image Tools</span>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-violet-300/70 hero-reveal" style={{ animationDelay: "0ms" }}>
                <span className="h-px w-8 bg-violet-500/70" />
                Pro-Grade Image Toolkit
              </div>

              <h1 className="font-display text-gray-100 leading-[1.02] text-4xl sm:text-5xl lg:text-6xl mt-4 sm:mt-6 hero-reveal" style={{ animationDelay: "140ms" }}>
                Pixel-perfect images
                <span className="text-violet-300"> at production speed</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl mt-4 sm:mt-6 leading-relaxed hero-reveal" style={{ animationDelay: "200ms" }}>
                Compress, resize, convert, and enhance images in seconds. Zero data retention, no signup,
                and no watermarks. Powered by Sharp.
              </p>

              <div className="flex flex-wrap gap-2 mt-4 sm:mt-6 hero-reveal" style={{ animationDelay: "260ms" }}>
                {[
                  { icon: Lock, label: "Zero retention" },
                  { icon: Zap, label: "Instant results" },
                  { icon: Globe, label: "Works on any device" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    <Icon size={12} className="text-violet-300" />
                    {label}
                  </div>
                ))}
              </div>

              {/* CTAs — vertical on mobile, horizontal on sm+ */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 hero-reveal" style={{ animationDelay: "320ms" }}>
                <Link
                  href="#tools"
                  className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-bold px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-violet-900/50 hover:shadow-violet-800/60 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  <Zap size={16} />
                  Explore All Tools
                </Link>
                <Link
                  href="/compress-image"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/15 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all backdrop-blur-sm hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  Compress Image
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Stats — 2×2 glassmorphism grid on mobile, 4-col on sm+ */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 sm:mt-10 max-w-xl hero-reveal" style={{ animationDelay: "380ms" }}>
                {STATS.map(({ value, label }) => (
                  <div key={label} className="group rounded-2xl border border-violet-500/20 bg-[#0f0d1f]/80 hover:border-violet-500/40 hover:bg-[#16122a]/80 backdrop-blur-sm px-3 sm:px-4 py-3 text-left transition-all">
                    <div className="text-xl font-bold text-violet-300 group-hover:text-violet-200">{value}</div>
                    <div className="text-xs text-violet-400/50 mt-0.5 leading-snug">{label}</div>
                  </div>
                ))}
              </div>

              {/* Mobile-only scroll hint */}
              <div className="sm:hidden mt-8 flex flex-col items-center gap-1 bounce-arrow">
                <span className="text-[10px] text-gray-600 tracking-widest uppercase">Scroll to explore</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-violet-500/50">
                  <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Showcase — only shown on large screens */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-8 rounded-[36px] bg-violet-600/10 blur-3xl hero-float" />

              <div className="relative rounded-[28px] border border-violet-500/25 bg-[#0f0d1f]/90 backdrop-blur-xl p-6 shadow-2xl shadow-black/50 hero-reveal" style={{ animationDelay: "240ms" }}>
                <div className="absolute inset-0 rounded-[28px] overflow-hidden">
                  <div className="hero-sheen absolute top-6 -left-20 h-[1px] w-[70%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>

                <div className="flex items-center justify-between mb-5">
                  <div className="text-sm font-semibold text-slate-200">PixlTools Studio</div>
                  <div className="text-[11px] px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                    Live Output
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-[#120f25] p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Compress Image</span>
                      <span className="text-emerald-300">92% saved</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {["Before", "After"].map((label, idx) => (
                        <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-2">
                          <div className="text-[10px] text-slate-500">{label}</div>
                          <div className={`mt-3 h-14 rounded-lg ${idx === 0 ? "bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent" : "bg-gradient-to-br from-emerald-500/30 via-sky-500/10 to-transparent"}`} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[72%] bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-slate-500">
                      <span>4.2MB</span>
                      <span>380KB</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#120f25] p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Resize & Convert</span>
                      <span className="text-violet-300">WEBP · 1440px</span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {["Original", "Optimized", "Preview"].map((label) => (
                        <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-2">
                          <div className="text-[10px] text-slate-500">{label}</div>
                          <div className="mt-3 h-10 rounded-lg bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-transparent" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#120f25] p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Quality guardrails</span>
                      <span className="text-slate-500">Lossless ready</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["WEBP", "PNG", "JPG", "More"].map((format) => (
                        <span key={format} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 -left-10 hidden md:block rounded-2xl border border-white/10 bg-[#0f0d1f]/80 px-4 py-3 text-xs text-slate-400 backdrop-blur hero-reveal" style={{ animationDelay: "320ms" }}>
                Real-time preview with instant results
              </div>
              <div className="absolute -bottom-8 right-6 hidden md:flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0f0d1f]/80 px-4 py-3 text-xs text-slate-400 backdrop-blur hero-reveal" style={{ animationDelay: "360ms" }}>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Processing pipeline active
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TRUST BAR ───── */}
      <TrustBar />

      <AdBanner slot="Homepage Top Banner" />

      {/* ───── TOOL GRID ───── */}
      <section id="tools" className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12 mb-12 sm:mb-20 overflow-hidden rounded-2xl sm:rounded-[3rem] border border-white/5 bg-[#0f0d1f]/40 backdrop-blur-xl">
        <SectionAtmosphere />

        <div className="relative z-10">
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="font-display text-gray-200 leading-tight text-2xl sm:text-4xl lg:text-5xl mt-6 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 inline-block">30+ Advanced Tools</h2>
          </div>

          {/* Category filter tabs – centered */}
          <div className="rounded-[2.25rem] border border-white/5 bg-[#0d0a1b]/60 p-4 sm:p-6">
            <ToolGridClient />
          </div>
        </div>
      </section>


      {/* ───── HOW IT WORKS ───── */}
      <section className="cv-section relative overflow-hidden bg-[#0f0d1f] border-y border-violet-500/10 py-20 px-4 sm:px-8">
        <SectionAtmosphere />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="font-display text-gray-200 leading-tight text-2xl sm:text-4xl lg:text-5xl mt-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 inline-block">Compress, Convert &amp; Resize in 3 Clicks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.7%+24px)] right-[calc(16.7%+24px)] h-px bg-gradient-to-r from-violet-900 via-violet-500/40 to-violet-900" />
            {[
              {
                icon: Upload, step: "01",
                title: "Upload Your Image",
                desc: "Drag and drop or click to select any image. Supports JPG, PNG, WEBP up to 10MB.",
                color: "bg-sky-500",
                glow: "shadow-sky-900/50",
              },
              {
                icon: Settings2, step: "02",
                title: "Adjust Settings",
                desc: "Configure quality, dimensions, format, or other tool-specific options.",
                color: "bg-violet-500",
                glow: "shadow-violet-900/50",
              },
              {
                icon: Download, step: "03",
                title: "Download Result",
                desc: "Your processed image is ready instantly. Download with one click — no watermarks.",
                color: "bg-violet-600",
                glow: "shadow-violet-900/50",
              },
            ].map(({ icon: Icon, step, title, desc, color, glow }) => (
              <div key={step} className="relative bg-[#16122a] rounded-2xl p-7 border border-violet-500/15 text-center">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md ${glow}`}>
                  <Icon size={20} className="text-white" strokeWidth={2} />
                </div>
                <span className="text-xs font-bold text-violet-400/30 tracking-widest">{step}</span>
                <h3 className="font-bold text-white text-base mt-1 mb-2">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="cv-section relative overflow-hidden max-w-[1400px] mx-auto px-4 sm:px-8 py-20">
        <SectionAtmosphere />
        <div className="relative z-10">
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="font-display text-gray-200 leading-tight text-2xl sm:text-4xl lg:text-5xl mt-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 inline-block">Built for Professionals</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color, bg, border }) => (
              <div key={title} className={`group bg-[#16122a] border border-violet-500/15 hover:border-violet-500/30 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-violet-900/20 hover:-translate-y-1`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 ${bg} ${color} rounded-xl mb-4 border ${border}`}>
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SEO CONTENT ───── */}
      <section className="cv-section bg-[#0f0d1f] border-y border-violet-500/10 py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="font-display text-gray-200 leading-tight text-xl sm:text-3xl lg:text-5xl mt-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 inline-block">The Importance of Optimizing Images</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

            {/* Left — heading + vertical roadmap */}
            <div className="lg:col-span-2 flex flex-col items-start">
              <div className="relative w-full max-w-sm rounded-[30px] border border-violet-500/20 bg-[#0f0d1f]/70 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(88,28,135,0.35)]">
                <div className="absolute -inset-px rounded-[30px] bg-gradient-to-br from-violet-500/15 via-transparent to-fuchsia-500/10 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm font-semibold text-slate-200">Optimization Flow</div>
                    <div className="text-[11px] px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                      Live
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                      <span>Processing</span>
                      <span>Realtime</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[78%] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-emerald-400" />
                    </div>
                  </div>
                  <div className="relative flex flex-col gap-0">
                    {[
                      { step: "01", label: "Upload", tag: "Drop your image", color: "bg-sky-500", ring: "ring-sky-500/30" },
                      { step: "02", label: "Optimize", tag: "We process it instantly", color: "bg-violet-500", ring: "ring-violet-500/30" },
                      { step: "03", label: "Deliver", tag: "Download & publish", color: "bg-fuchsia-500", ring: "ring-fuchsia-500/30" },
                    ].map(({ step, label, tag, color, ring }, i, arr) => (
                      <div key={step} className="flex gap-5 items-start">
                        {/* Dot + connector */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full ${color} ${ring} ring-4 flex items-center justify-center shadow-lg flex-shrink-0`}>
                            <span className="text-[10px] font-black text-white tracking-widest">{step}</span>
                          </div>
                          {i < arr.length - 1 && (
                            <div className="w-px flex-1 min-h-[56px] bg-gradient-to-b from-violet-500/40 to-violet-500/10 mt-1" />
                          )}
                        </div>
                        {/* Label */}
                        <div className="pt-1.5 pb-10">
                          <p className="font-bold text-white text-sm">{label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{tag}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:col-span-3 relative">
              <div className="hidden sm:block absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/10 to-transparent" />
              <div className="grid gap-4">
                {[
                  {
                    label: "01",
                    title: "Page Speed & Core Web Vitals",
                    body: "Images account for 50–80% of a webpage's total size. A single unoptimized photo can easily be 5–8 MB. Google's Core Web Vitals penalize slow images through poor LCP scores, directly hurting your search rankings.",
                  },
                  {
                    label: "02",
                    title: "Choosing the Right Format",
                    body: "JPEG excels for photographs; PNG is essential when transparency is needed; WEBP — developed by Google — delivers 25–35% smaller files than JPEG at identical quality and is now supported by every modern browser.",
                  },
                  {
                    label: "03",
                    title: "Social Media Dimensions",
                    body: "Social platforms re-compress oversized uploads, introducing blurriness. Instagram recommends 1080×1080 for square posts, Twitter cards render best at 1600×900, and YouTube thumbnails require 1280×720.",
                  },
                ].map(({ label, title, body }) => (
                  <div key={label} className="relative pl-12">
                    <div className="absolute left-0 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-black text-violet-300">
                      {label}
                    </div>
                    <div className="group relative rounded-[24px] border border-violet-500/15 bg-[#120f25]/70 p-6 transition-all hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-900/20">
                      <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse at 30% 10%, rgba(139,92,246,0.12), transparent 55%)" }} />
                      <div className="relative">
                        <h3 className="font-bold text-white mb-2">{title}</h3>
                        <p className="text-sm text-gray-400 leading-7">{body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <AdBanner slot="Homepage Middle" />

      {/* ───── FAQ ───── */}
      <section className="cv-section relative overflow-hidden bg-[#0b0816] border-t border-violet-500/10 py-20">
        {/* Subtle backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[65%] h-[55%] rounded-full bg-violet-600/10 blur-[160px]" />
          <div className="absolute -bottom-20 right-[-10%] w-[45%] h-[45%] rounded-full bg-fuchsia-600/06 blur-[150px]" />
          <div className="absolute inset-0 hero-grid-lines opacity-10" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8">
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="font-display text-gray-200 leading-tight text-2xl sm:text-4xl lg:text-5xl mt-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 inline-block">Frequently Asked Questions About Image Tools</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Left — label + heading + copy */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-[24px] border border-violet-500/15 bg-[#120f25]/70 p-5 backdrop-blur-xl">
                <div className="text-xs uppercase tracking-[0.3em] text-violet-300/70">Support Desk</div>
                <p className="text-gray-400 text-sm leading-relaxed mt-4">
                  Everything you need to know about using PixlTools. Can&apos;t find your answer?
                </p>
                <a
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors mt-4"
                >
                  Read our image guides &rarr;
                </a>
              </div>
              <div className="rounded-[24px] border border-violet-500/15 bg-[#120f25]/70 p-5">
                <div className="text-xs uppercase tracking-[0.3em] text-violet-300/70">Popular Topics</div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["File limits", "Formats", "Privacy", "Speed", "Quality"].map((topic) => (
                    <span key={topic} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — accordion */}
            <div className="lg:col-span-3">
              <div className="rounded-[28px] border border-violet-500/15 bg-[#120f25]/70 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-sm font-semibold text-slate-200">FAQ Library</div>
                  <div className="text-[11px] px-2 py-0.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300">
                    Curated
                  </div>
                </div>
                <FAQSection faqs={homeFaqs} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── POPULAR GUIDES ───── */}
      <section aria-label="Image optimization guides" className="relative overflow-hidden py-20 px-4" style={{ background: "#07050f" }}>
        <SectionAtmosphere />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-gray-200 leading-tight text-2xl sm:text-4xl lg:text-5xl mt-6 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 inline-block">
              Free Image Optimization Guides
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/blog/how-to-convert-heic-to-jpg-on-iphone-and-mac",
                category: "Conversion",
                title: "How to Convert HEIC to JPG on iPhone & Mac",
                excerpt: "iPhone photos save as HEIC by default. Here's how to convert to JPG on any device, for free.",
                readTime: "6 min",
                color: "text-sky-400",
                bg: "bg-sky-500/10",
              },
              {
                href: "/blog/how-to-compress-images-without-losing-quality",
                category: "Compression",
                title: "How to Compress Images Without Losing Quality",
                excerpt: "Reduce file size by 60–80% while keeping your images pixel-perfect. The complete guide.",
                readTime: "7 min",
                color: "text-violet-400",
                bg: "bg-violet-500/10",
              },
              {
                href: "/blog/how-to-compress-image-for-whatsapp",
                category: "Compression",
                title: "How to Compress Images for WhatsApp",
                excerpt: "Send high-quality photos on WhatsApp without the app degrading them.",
                readTime: "5 min",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
              },
              {
                href: "/blog/webp-vs-jpg-vs-png-which-format-is-best",
                category: "Formats",
                title: "WebP vs JPG vs PNG – Which Format is Best?",
                excerpt: "A complete breakdown of every image format to help you make the right choice.",
                readTime: "8 min",
                color: "text-amber-400",
                bg: "bg-amber-500/10",
              },
              {
                href: "/blog/how-to-reduce-image-file-size-on-iphone",
                category: "Compression",
                title: "How to Reduce Image File Size on iPhone",
                excerpt: "4 free methods to shrink iPhone photos — no app installation needed.",
                readTime: "5 min",
                color: "text-pink-400",
                bg: "bg-pink-500/10",
              },
              {
                href: "/blog/best-free-image-compressor-online-2026",
                category: "Compression",
                title: "Best Free Image Compressor Online in 2026",
                excerpt: "We compared the top online compressors for speed, quality, and privacy.",
                readTime: "7 min",
                color: "text-orange-400",
                bg: "bg-orange-500/10",
              },
            ].map(({ href, category, title, excerpt, readTime, color, bg }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-2xl border border-violet-500/15 bg-[#120f25]/70 p-5 hover:border-violet-500/30 hover:bg-[#1a1735]/80 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${bg} ${color}`}>
                    {category}
                  </span>
                  <span className="text-[10px] text-gray-500">{readTime} read</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-200 group-hover:text-violet-200 transition-colors leading-snug mb-2">
                  {title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed flex-1">{excerpt}</p>
                <span className={`text-xs font-semibold mt-3 flex items-center gap-1 ${color}`}>
                  Read guide <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              View all guides <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── BOTTOM CTA ───── */}

      <section className="relative overflow-hidden py-24 px-4" style={{ background: "#07050f" }}>
        <SectionAtmosphere />

        <div className="relative max-w-5xl mx-auto">
          <div className="rounded-[32px] border border-violet-500/20 bg-[#0f0d1f]/70 p-8 sm:p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(88,28,135,0.35)]">
            <div className="absolute inset-0 rounded-[32px] pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 20%, rgba(139,92,246,0.18), transparent 55%)" }} />
            <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-violet-300/70">
                  Ready to Launch
                </div>
                <h2 className="font-display text-gray-100 leading-tight text-3xl sm:text-5xl lg:text-6xl mt-6">
                  Start optimizing your images today.
                </h2>
                <p className="text-slate-400 mt-4 text-base">
                  No account needed. No software to install. Works in any browser.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Link
                    href="/compress-image"
                    className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-violet-900/50 hover:shadow-violet-800/60 hover:-translate-y-0.5"
                  >
                    <Zap size={16} />
                    Compress Image Free
                  </Link>
                  <Link
                    href="#tools"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all backdrop-blur-sm hover:-translate-y-0.5"
                  >
                    Browse All {TOOLS.length} Tools
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 rounded-[28px] bg-violet-600/10 blur-3xl" />
                <div className="relative rounded-[24px] border border-violet-500/20 bg-[#120f25]/80 p-6">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Instant Preview</span>
                    <span className="text-emerald-300">Active</span>
                  </div>
                  <div className="mt-4 h-28 rounded-2xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-transparent" />
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span>Before: 4.2MB</span>
                    <span>After: 380KB</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-[78%] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-emerald-400" />
                  </div>
                </div>
                <div className="absolute -bottom-6 left-6 hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-[#0f0d1f]/80 px-3 py-1 text-xs text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live processing
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main >
  );
}
