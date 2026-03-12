"use client";
import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQSection({ faqs }: { faqs: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-2">
            {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                    <div
                        key={i}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden
              ${isOpen
                                ? "border-violet-500/30 bg-violet-500/5 shadow-sm shadow-violet-900/20"
                                : "border-violet-500/10 bg-[#16122a] hover:border-violet-500/20"
                            }`}
                    >
                        <button
                            className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            aria-expanded={isOpen}
                        >
                            <span className={`text-sm font-semibold leading-snug transition-colors ${isOpen ? "text-violet-300" : "text-white"}`}>
                                {faq.question}
                            </span>
                            <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-200
                ${isOpen ? "bg-violet-500 text-white" : "bg-violet-500/10 text-violet-400"}`}>
                                {isOpen ? <Minus size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-out
                ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            <p className="px-6 pb-5 text-sm text-violet-300/60 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
