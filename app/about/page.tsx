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
    },
    {
        icon: ShieldCheck,
        title: "100% Private",
        desc: "Your images are processed in real-time and immediately deleted. We never store, log, or share your files with anyone.",
    },
    {
        icon: Lock,
        title: "No Account Needed",
        desc: "No sign-up, no email, no credit card. Just open a tool, upload your image, and download the result.",
    },
    {
        icon: Clock,
        title: "Always Free",
        desc: "PixlTools is free to use — forever. We're supported by non-intrusive advertising, not by charging users or selling data.",
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-950">
            {/* Hero */}
            <div className="bg-slate-950 border-b border-slate-800 py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">About</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional Image Tools,<br />Free for Everyone</h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
                        PixlTools was built to give every developer, designer, blogger, and creator access to
                        enterprise-grade image processing — without the enterprise price tag.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">

                {/* Mission */}
                <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                    <p className="text-slate-400 leading-relaxed mb-4">
                        Images are the most bandwidth-heavy resource on the web — and most people have no easy way to
                        optimise them. Professional tools cost money, require accounts, or leave watermarks. We think that&apos;s wrong.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                        PixlTools makes 30+ professional image operations available instantly in any browser, on any device,
                        completely free. Our tools run server-side on Sharp, the same library behind major platforms, so you
                        always get production-quality results.
                    </p>
                </section>

                {/* Features */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-6">Why PixlTools?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FEATURES.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                                <div className="inline-flex w-10 h-10 items-center justify-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-4">
                                    <Icon size={18} className="text-emerald-400" strokeWidth={1.8} />
                                </div>
                                <h3 className="font-bold text-slate-200 mb-2">{title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tools count */}
                <section className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-center mb-10">
                    <div className="text-5xl font-black text-white mb-2">30+</div>
                    <div className="text-emerald-100 font-semibold mb-4">Free Image Tools Available</div>
                    <Link
                        href="/"
                        className="inline-block bg-slate-950 text-emerald-400 font-bold px-6 py-3 rounded-xl hover:bg-slate-900 transition-colors"
                    >
                        Explore All Tools →
                    </Link>
                </section>

                {/* Contact */}
                <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Mail size={18} className="text-emerald-400" strokeWidth={1.8} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-2">Contact Us</h2>
                            <p className="text-slate-400 text-sm leading-relaxed mb-3">
                                Have a question, feature request, or found a bug? We&apos;d love to hear from you.
                                PixlTools is constantly improving based on user feedback.
                            </p>
                            <p className="text-sm text-slate-500">
                                Reach us at:{" "}
                                <a
                                    href="mailto:hello@pixltools.com"
                                    className="text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-2"
                                >
                                    hello@pixltools.com
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-slate-800 flex flex-wrap gap-4 text-sm">
                    <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition-colors">← Back to Home</Link>
                    <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</Link>
                </div>
            </div>
        </main>
    );
}
