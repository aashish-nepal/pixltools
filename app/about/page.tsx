import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Zap, Lock, Clock, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: "About PixlTools – Free Online Image Processing",
    description: "PixlTools is a free, open-to-all image processing suite powered by Sharp. No signup, no watermarks, 100% private. Learn more about us.",
};

const FEATURES = [
    {
        icon: Zap,
        title: "Powered by Sharp",
        desc: "We use Sharp — the industry-leading Node.js image processing library trusted by Netflix, Canva, and thousands of companies worldwide.",
        color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20",
    },
    {
        icon: ShieldCheck,
        title: "100% Private",
        desc: "Your images are processed in real-time and immediately deleted. We never store, log, or share your files with anyone.",
        color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20",
    },
    {
        icon: Lock,
        title: "No Account Needed",
        desc: "No sign-up, no email, no credit card. Just open a tool, upload your image, and download the result.",
        color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20",
    },
    {
        icon: Clock,
        title: "Always Free",
        desc: "PixlTools is free to use — forever. We're supported by non-intrusive advertising, not by charging users or selling data.",
        color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20",
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10 py-16">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">About</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-300 mb-4">Professional Image Tools,<br />Free for Everyone</h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
                        PixlTools was built to give every developer, designer, blogger, and creator access to
                        enterprise-grade image processing — without the enterprise price tag.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">

                {/* Mission */}
                <section className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8 mb-10">
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Our Mission</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <p className="text-violet-300/60 leading-relaxed mb-4">
                        Images are the most bandwidth-heavy resource on the web — and most people have no easy way to
                        optimise them. Professional tools cost money, require accounts, or leave watermarks. We think that&apos;s wrong.
                    </p>
                    <p className="text-violet-300/60 leading-relaxed">
                        PixlTools makes 30+ professional image operations available instantly in any browser, on any device,
                        completely free. Our tools run server-side on Sharp, the same library behind major platforms, so you
                        always get production-quality results.
                    </p>
                </section>

                {/* Features */}
                <section className="mb-10">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Why PixlTools?</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FEATURES.map(({ icon: Icon, title, desc, color, bg, border }) => (
                            <div key={title} className={`bg-[#16122a] border border-violet-500/15 rounded-2xl p-6`}>
                                <div className={`inline-flex w-10 h-10 items-center justify-center ${bg} border ${border} rounded-xl mb-4`}>
                                    <Icon size={18} className={color} strokeWidth={1.8} />
                                </div>
                                <h3 className="font-bold text-violet-100 mb-2">{title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tools count */}
                <section className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 rounded-2xl p-8 text-center mb-10">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" />
                    <div className="text-5xl font-black text-white mb-2">30+</div>
                    <div className="text-violet-200/70 font-semibold mb-4">Free Image Tools Available</div>
                    <Link
                        href="/"
                        className="inline-block bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                    >
                        Explore All Tools →
                    </Link>
                </section>

                {/* Contact */}
                <section className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Mail size={18} className="text-violet-400" strokeWidth={1.8} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Contact Us</h2>
                                <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-3">
                                Have a question, feature request, or found a bug? We&apos;d love to hear from you.
                                PixlTools is constantly improving based on user feedback.
                            </p>
                            <p className="text-sm text-gray-400">
                                Reach us at:{" "}
                                <a
                                    href="mailto:hello@pixltools.com"
                                    className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-2"
                                >
                                    hello@pixltools.com
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-violet-500/10 flex flex-wrap gap-4 text-sm">
                    <Link href="/" className="text-violet-400 hover:text-violet-300 transition-colors">← Back to Home</Link>
                    <Link href="/privacy-policy" className="text-gray-400 hover:text-violet-300 transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="text-gray-400 hover:text-violet-300 transition-colors">Terms of Service</Link>
                </div>
            </div>
        </main>
    );
}
