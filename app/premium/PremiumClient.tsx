"use client";
import Link from "next/link";
import { useState } from "react";
import { Check, Zap, ArrowRight, Star, Lock } from "lucide-react";
import FAQSection from "@/components/ui/FAQSection";

const PLANS = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        desc: "Everything you need for personal use",
        color: "border-violet-500/15",
        badge: null,
        cta: "Start Free",
        ctaHref: "/#tools",
        ctaStyle: "border border-violet-500/25 text-violet-300/70 hover:border-violet-500/50 hover:text-violet-300 hover:bg-violet-500/5",
        features: [
            "30+ image tools",
            "25MB max file size",
            "1 file at a time",
            "Standard processing speed",
            "No watermarks",
            "No account needed",
        ],
        missing: [
            "Batch processing",
            "Priority queue",
            "API access",
            "50MB+ file support",
        ],
    },
    {
        name: "Pro",
        price: "$7",
        period: "per month",
        desc: "For professionals and power users",
        color: "border-violet-500/50 shadow-xl shadow-violet-900/30",
        badge: "Most Popular",
        cta: "Get Pro — Coming Soon",
        ctaHref: "#notify",
        ctaStyle: "bg-violet-600 hover:bg-violet-500 text-white font-bold shadow-lg shadow-violet-900/40",
        features: [
            "Everything in Free",
            "Batch process up to 50 files",
            "100MB max file size",
            "Priority processing queue",
            "API access (1,000 req/day)",
            "HEIC/HEIF support",
            "Email support",
        ],
        missing: [],
    },
    {
        name: "Business",
        price: "$29",
        period: "per month",
        desc: "For teams and agencies at scale",
        color: "border-fuchsia-500/30",
        badge: null,
        cta: "Contact Us",
        ctaHref: "mailto:business@pixltools.com",
        ctaStyle: "border border-fuchsia-500/30 text-fuchsia-400 hover:bg-fuchsia-500/10",
        features: [
            "Everything in Pro",
            "Unlimited batch processing",
            "500MB max file size",
            "Unlimited API (10,000 req/day)",
            "Dedicated processing server",
            "SLA guarantee (99.9% uptime)",
            "Priority Slack/email support",
            "Custom integrations",
        ],
        missing: [],
    },
];

const COMPARISON = [
    { feature: "Image tools", free: "30+", pro: "30+", business: "30+" },
    { feature: "Max file size", free: "25 MB", pro: "100 MB", business: "500 MB" },
    { feature: "Batch processing", free: "—", pro: "50 files", business: "Unlimited" },
    { feature: "Processing speed", free: "Standard", pro: "Priority queue", business: "Dedicated" },
    { feature: "API requests/day", free: "—", pro: "1,000", business: "10,000" },
    { feature: "HEIC/HEIF support", free: "—", pro: "✓", business: "✓" },
    { feature: "Watermarks", free: "None", pro: "None", business: "None" },
    { feature: "SLA", free: "—", pro: "—", business: "99.9% uptime" },
    { feature: "Support", free: "Community", pro: "Email", business: "Priority Slack" },
];

const PREMIUM_FAQS = [
    {
        question: "Is the free plan really free forever?",
        answer: "Yes. The free plan will never go away. All 30+ tools remain free with no time limits, watermarks, or signup requirements.",
    },
    {
        question: "When does Pro launch?",
        answer: "We're targeting a Pro launch in Q2 2026. Join the waitlist above to get notified first and receive 30% off the first year.",
    },
    {
        question: "What payment methods will you accept?",
        answer: "We'll accept all major credit/debit cards via Stripe. Annual billing will offer an additional 20% discount vs monthly.",
    },
    {
        question: "Can I cancel anytime?",
        answer: "Yes. Pro is month-to-month with no contracts. Cancel immediately from your account and you won't be charged again.",
    },
];

export default function PremiumClient() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setLoading(true);
        await new Promise(r => setTimeout(r, 800));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-[#0b0816]">
            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10 py-16">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
                    <div className="mb-6 text-center">
            <h1 className="font-display text-gray-200 leading-[1.02] text-4xl sm:text-5xl lg:text-5xl mt-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">PixlTools Pro — Coming Soon</h1>
          </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-16 space-y-16">

                {/* Pricing cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative group bg-[#16122a] border ${plan.color} rounded-2xl p-7 flex flex-col transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40`}
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
                            {plan.badge && (
                                <div className="absolute -top-3.5 left-6">
                                    <span className="inline-flex items-center gap-1.5 bg-violet-600 text-white text-xs font-black px-3.5 py-1 rounded-full shadow-lg shadow-violet-900/40">
                                        <Star size={12} className="text-white" />
                                        {plan.badge}
                                    </span>
                                </div>
                            )}
                            <div className="relative mb-6">
                                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-violet-300/70">
                                    {plan.name}
                                </div>
                                <div className="mt-4 flex items-end gap-2">
                                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                                    <span className="text-gray-400 text-sm mb-1">/{plan.period}</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">{plan.desc}</p>
                                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>
                            <ul className="relative space-y-2.5 mb-8 flex-1">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-violet-200/80">
                                        <Check size={14} className="text-violet-400 flex-shrink-0 mt-0.5" />{f}
                                    </li>
                                ))}
                                {plan.missing.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-violet-300/25 line-through">
                                        <span className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-violet-500/30 font-bold text-base leading-none">—</span>{f}
                                    </li>
                                ))}
                            </ul>
                            <Link href={plan.ctaHref} className={`relative w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm transition-all ${plan.ctaStyle}`}>
                                {plan.cta} <ArrowRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Comparison table */}
                <div>
          <div className="mb-12 text-center py-8">
            <h2 className="font-display text-gray-200 leading-[1.02] text-4xl sm:text-5xl lg:text-5xl mt-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">Full Feature Comparison</h2>
          </div>
                    <div className="overflow-x-auto rounded-2xl border border-violet-500/15">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-violet-500/10 bg-[#16122a]">
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400/50">Feature</th>
                                    <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-300/60">Free</th>
                                    <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Pro</th>
                                    <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-fuchsia-400">Business</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {COMPARISON.map(({ feature, free, pro, business }, i) => (
                                        <tr
                                            key={feature}
                                            className={`border-b border-violet-500/10 last:border-none ${i % 2 === 0 ? "bg-[#120f25]/70" : "bg-[#100c20]/80"} hover:bg-white/[0.04] transition-colors`}
                                        >
                                            <td className="px-5 py-4 text-sm font-medium text-violet-100/80">
                                                <div className="flex items-center gap-3">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400/60" />
                                                    {feature}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-gray-400 text-center">{free}</td>
                                            <td className="px-5 py-4 text-sm text-violet-300 text-center font-semibold">{pro}</td>
                                            <td className="px-5 py-4 text-sm text-fuchsia-300 text-center font-semibold">{business}</td>
                                        </tr>
                                    ))}
                                </tbody>
                        </table>
                    </div>
                </div>

                {/* Email waitlist */}
                <div id="notify" className="relative overflow-hidden rounded-[32px] border border-violet-500/20 bg-[#0f0d1f]/70 p-8 sm:p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(88,28,135,0.35)]">
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 20%, rgba(139,92,246,0.18), transparent 55%)" }} />
                    <div className="absolute inset-0 tool-hero-pattern opacity-30 pointer-events-none" />
                    <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-violet-300/70">
                                <Lock size={12} className="text-violet-300" />
                                Pro launches soon
                            </div>
                            <h2 className="font-display text-gray-100 leading-[1.02] text-3xl sm:text-4xl lg:text-5xl mt-6">
                                Get Early Access &amp; 30% Off
                            </h2>
                            <p className="text-slate-400 mt-4 text-base max-w-xl">
                                Join the waitlist. We&apos;ll notify you the moment Pro launches with an exclusive discount for early supporters.
                            </p>
                            <p className="text-violet-300/40 text-xs mt-4">No spam. Unsubscribe any time.</p>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[28px] bg-violet-600/10 blur-3xl" />
                            <div className="relative rounded-[24px] border border-violet-500/20 bg-[#120f25]/80 p-6">
                                {submitted ? (
                                    <div className="text-violet-300 font-bold text-lg">✓ You&apos;re on the list! We&apos;ll be in touch.</div>
                                ) : (
                                    <>
                                        <div className="text-xs uppercase tracking-[0.3em] text-violet-300/70">Join the waitlist</div>
                                        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                                placeholder="your@email.com"
                                                className="w-full bg-[#0f0d1f] border border-violet-500/20 text-violet-100 placeholder-violet-400/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                                            />
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-violet-900/40"
                                            >
                                                {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Zap size={14} /> Join Waitlist.</>}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <section className="relative overflow-hidden bg-[#0b0816] border-t border-violet-500/10 py-12">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[65%] h-[55%] rounded-full bg-violet-600/10 blur-[160px]" />
                        <div className="absolute -bottom-20 right-[-10%] w-[45%] h-[45%] rounded-full bg-fuchsia-600/06 blur-[150px]" />
                        <div className="absolute inset-0 hero-grid-lines opacity-10" />
                    </div>
                    <div className="relative z-10 max-w-[1400px] mx-auto">
                        <div className="mb-12 text-center">
                            <h2 className="font-display text-gray-200 leading-[1.02] text-4xl sm:text-5xl lg:text-5xl mt-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">
                                Pricing FAQ
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="rounded-[24px] border border-violet-500/15 bg-[#120f25]/70 p-5 backdrop-blur-xl">
                                    <div className="text-xs uppercase tracking-[0.3em] text-violet-300/70">Support Desk</div>
                                    <p className="text-gray-400 text-sm leading-relaxed mt-4">
                                        Everything you need to know about PixlTools Pro. Can&apos;t find your answer?
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
                                        {["Pricing", "Limits", "Billing", "Support", "Launch"].map((topic) => (
                                            <span key={topic} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-3">
                                <div className="rounded-[28px] border border-violet-500/15 bg-[#120f25]/70 p-6 backdrop-blur-xl">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="text-sm font-semibold text-slate-200">FAQ Library</div>
                                        <div className="text-[11px] px-2 py-0.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300">
                                            Curated
                                        </div>
                                    </div>
                                    <FAQSection faqs={PREMIUM_FAQS} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
