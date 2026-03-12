"use client";
import { useState } from "react";
import { Lightning, X, CheckCircle } from "@phosphor-icons/react";

export default function EmailCapture() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setLoading(true);
        await new Promise(r => setTimeout(r, 800));
        setLoading(false);
        setSubmitted(true);
        setTimeout(() => setDismissed(true), 3000);
    };

    if (dismissed) return null;

    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 sm:px-0 animate-in slide-in-from-bottom-4 duration-300">
            <div className="relative bg-[#16122a] border border-violet-500/25 rounded-2xl shadow-2xl shadow-violet-900/50 overflow-hidden">
                {/* Glow strip */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 via-purple-400 to-fuchsia-500" />

                {/* Dismiss button */}
                <button
                    onClick={() => setDismissed(true)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-violet-300 transition-colors z-10"
                    aria-label="Dismiss"
                >
                    <X size={16} />
                </button>

                <div className="p-5">
                    {!submitted ? (
                        <>
                            <div className="flex items-start gap-4">
                                <div className="w-9 h-9 bg-violet-500/10 border border-violet-500/25 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Lightning size={16} weight="duotone" className="text-violet-400" />
                                </div>
                                <div className="flex-1 min-w-0 pr-4">
                                    <p className="font-bold text-violet-100 text-sm">Get notified of new tools</p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        We ship new image tools regularly. Join 2,000+ creators on the list.
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    className="flex-1 min-w-0 bg-[#0f0d1f] border border-violet-500/20 text-violet-100 placeholder-violet-400/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-lg shadow-violet-900/40"
                                >
                                    {loading ? (
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : "Notify me"}
                                </button>
                            </form>
                            <p className="text-xs text-violet-300/30 mt-2 text-center">No spam. Unsubscribe anytime.</p>
                        </>
                    ) : (
                        <div className="flex items-center gap-3 py-1">
                            <CheckCircle size={20} weight="duotone" className="text-violet-400 flex-shrink-0" />
                            <div>
                                <p className="font-bold text-violet-100 text-sm">You&apos;re on the list! 🎉</p>
                                <p className="text-xs text-gray-400">We&apos;ll email you when new tools and Pro features launch.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
