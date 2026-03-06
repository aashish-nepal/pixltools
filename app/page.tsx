import { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ui/ToolCard";
import AdBanner from "@/components/ui/AdBanner";
import FAQSection from "@/components/ui/FAQSection";
import { buildJsonLdFAQ } from "@/lib/utils";
import { TOOLS, TOOL_CATEGORIES, getToolsByCategory } from "@/lib/tools-data";
import {
  ShieldCheck, Zap, Star, ArrowRight, Upload, Settings2, Download,
  CheckCircle2, Globe, Lock, Clock, TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Image Tools – Compress, Resize & Convert | PixlTools",
  description: "30+ free online image tools. Compress JPG, PNG, WEBP, resize images, convert formats, add watermarks, and more. No signup. 100% free.",
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
  { value: "0s", label: "Signup Time" },
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
    url: "https://pixltools.com",
    description: "30+ free online image tools. Compress, resize, convert, and optimize images instantly.",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://pixltools.com/?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        {/* Emerald glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-36 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-emerald-400 mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            30+ Professional Image Tools · Always Free
          </div>

          {/* Headline */}
          <h1
            className="font-bold text-white leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            Professional Image{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
              Tools for Everyone
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Compress, resize, convert, and enhance images in seconds.
            No signup. No watermarks. No limits. Powered by Sharp.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link
              href="#tools"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-900/50 hover:shadow-emerald-800/60 hover:-translate-y-0.5"
            >
              <Zap size={16} />
              Explore All Tools
            </Link>
            <Link
              href="/compress-image"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all backdrop-blur-sm hover:-translate-y-0.5"
            >
              Compress Image
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-700/30 rounded-2xl overflow-hidden border border-slate-700/50 max-w-2xl mx-auto">
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-slate-900/80 px-4 py-5 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-emerald-400">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TRUST BAR ───── */}
      <section className="border-y border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-slate-500 font-medium">
          {[
            { icon: ShieldCheck, label: "No data stored, ever" },
            { icon: Clock, label: "Instant processing" },
            { icon: Lock, label: "No account required" },
            { icon: CheckCircle2, label: "Zero watermarks" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={15} className="text-emerald-400" strokeWidth={2} />
              {label}
            </div>
          ))}
        </div>
      </section>

      <AdBanner slot="Homepage Top Banner" />

      {/* ───── TOOL GRID ───── */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        {/* Section heading */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">All Tools</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {TOOLS.length} Image Tools,{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Zero Cost</span>
          </h2>
          <p className="text-slate-500 max-w-2xl">
            Every tool you need to optimize images for web, social media, print, and more.
          </p>
        </div>

        {/* Category tab nav */}
        <div className="flex flex-wrap justify-start gap-2 mb-14">
          {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => {
            const count = getToolsByCategory(key as keyof typeof TOOL_CATEGORIES).length;
            return (
              <a
                key={key}
                href={`#cat-${key}`}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800 text-sm font-medium text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
              >
                {cat.label}
                <span className="text-xs bg-slate-700 text-slate-500 px-1.5 py-0.5 rounded-full font-semibold">{count}</span>
              </a>
            );
          })}
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => {
            const tools = getToolsByCategory(key as keyof typeof TOOL_CATEGORIES);
            return (
              <div key={key} id={`cat-${key}`} style={{ scrollMarginTop: "80px" }}>
                {/* Category header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-800">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <span className="text-white text-xs font-black">{cat.label.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-slate-200 leading-none">{cat.label}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{cat.desc || `${tools.length} free tools`}</p>
                  </div>
                  <span className="flex-shrink-0 text-xs bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                    {tools.length} tools
                  </span>
                </div>

                {/* Tool cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <section className="bg-slate-900 border-y border-slate-800 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Done in 3 Clicks</h2>
            <p className="text-slate-500">No learning curve. No complicated settings.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.7%+24px)] right-[calc(16.7%+24px)] h-px bg-gradient-to-r from-emerald-900 via-emerald-500/40 to-emerald-900" />
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
                color: "bg-emerald-500",
                glow: "shadow-emerald-900/50",
              },
            ].map(({ icon: Icon, step, title, desc, color, glow }) => (
              <div key={step} className="relative bg-slate-800 rounded-2xl p-7 border border-slate-700 text-center">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md ${glow}`}>
                  <Icon size={20} className="text-white" strokeWidth={2} />
                </div>
                <span className="text-xs font-bold text-slate-600 tracking-widest">{step}</span>
                <h3 className="font-bold text-slate-200 text-base mt-1 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">Why PixlTools</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Built for Professionals</h2>
          <p className="text-slate-500 max-w-xl">
            Enterprise-grade image processing made accessible to everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg, border }) => (
            <div key={title} className={`group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-black/30`}>
              <div className={`inline-flex items-center justify-center w-10 h-10 ${bg} ${color} rounded-xl mb-4 border ${border}`}>
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <h3 className="font-bold text-slate-200 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── SEO CONTENT ───── */}
      <section className="bg-slate-900 border-y border-slate-800 py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">Image Optimization Guide</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Image Optimization Matters</h2>

          <p className="text-slate-500 text-sm leading-7 mb-5">
            Images account for 50&ndash;80% of a typical webpage&apos;s total size. A single unoptimized hero photo
            from a smartphone can be 5&ndash;8 MB &mdash; easily ten times larger than necessary. Google&apos;s Core
            Web Vitals directly penalize slow images through poor LCP scores, pushing unoptimized pages down in search
            rankings. Compressing images is the single highest-ROI performance improvement most websites can make.
          </p>

          <p className="text-slate-500 text-sm leading-7 mb-5">
            Not all formats are equal. JPEG excels for photographs, PNG is essential for transparency, and WEBP
            &mdash; developed by Google &mdash; delivers 25&ndash;35% smaller files than JPEG at identical quality
            and is supported by every modern browser. Choosing the right format is as important as compression itself.
          </p>

          <p className="text-slate-500 text-sm leading-7">
            Social platforms aggressively recompress oversized uploads, introducing blurriness and artifacts.
            Instagram recommends 1080&times;1080 for square posts, Twitter cards render best at 1600&times;900,
            and YouTube thumbnails require 1280&times;720. Uploading at the correct dimensions prevents
            platform re-encoding and preserves quality end-to-end.
          </p>
        </div>
      </section>

      <AdBanner slot="Homepage Middle" />

      {/* ───── FAQ ───── */}
      <section className="bg-slate-950 border-t border-slate-800 py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Left — label + heading + copy */}
            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Common Questions,<br />Clear Answers
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Everything you need to know about using PixlTools.
                Can&apos;t find your answer?
              </p>
              <a
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Read our image guides &rarr;
              </a>
            </div>

            {/* Right — accordion */}
            <div className="lg:col-span-3">
              <FAQSection faqs={homeFaqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ───── BOTTOM CTA ───── */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Start Optimizing Your Images Today
          </h2>
          <p className="text-emerald-100 mb-8 text-base">
            No account needed. No software to install. Works in any browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/compress-image"
              className="inline-flex items-center justify-center gap-2 bg-slate-950 text-emerald-400 font-bold px-7 py-3.5 rounded-2xl hover:bg-slate-900 transition-colors shadow-lg"
            >
              <Zap size={16} />
              Compress Image Free
            </Link>
            <Link
              href="#tools"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-2xl hover:bg-white/20 transition-colors"
            >
              Browse All {TOOLS.length} Tools
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
