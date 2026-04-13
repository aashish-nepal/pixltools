import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy – PixlTools",
    description: "Learn how PixlTools handles your data. We process images in real-time and never store, log, or share your files.",
    robots: { index: false, follow: true },
};


const sections: { title: string; content: React.ReactNode }[] = [
    {
        title: "Overview",
        content: (
            <p>
                PixlTools (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a free online image processing service available at{" "}
                <span className="text-violet-400">pixltools.com</span>. We are committed to protecting your privacy. This policy explains
                what data we collect, how we use it, and how we protect it.
            </p>
        ),
    },
    {
        title: "Image Data — Zero Retention",
        content: (
            <>
                <p>
                    <strong className="text-violet-200">We do not store your images.</strong> When you upload an image for processing,
                    it is handled entirely in-memory on our servers and immediately discarded after your result is delivered. We do not:
                </p>
                <ul className="mt-3 space-y-1.5 ml-4">
                    {[
                        "Save your original or processed images to disk or any database",
                        "Log filenames, image content, or metadata",
                        "Share your images with any third party",
                        "Use your images for any AI training or analytics purposes",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                            <span className="text-violet-400 font-bold mt-0.5">✓</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </>
        ),
    },
    {
        title: "Cookies",
        content: (
            <p>
                PixlTools uses minimal cookies for essential site functionality (e.g., security tokens, session preferences). We may
                also use cookies from third-party advertising partners (such as Google AdSense) to serve relevant advertisements. You
                can control cookie preferences through your browser settings at any time.
            </p>
        ),
    },
    {
        title: "Analytics",
        content: (
            <p>
                We may use analytics tools (such as Google Analytics 4) to collect anonymised usage data — including pages visited,
                tools used, and approximate geographic region. This data is aggregated and never tied to personally identifiable
                information. It helps us understand which tools are most useful and improve the service.
            </p>
        ),
    },
    {
        title: "Advertising",
        content: (
            <p>
                PixlTools is supported by advertising. We work with Google AdSense, which may serve personalised or contextual ads
                based on your browsing behaviour. Google&apos;s advertising policies and privacy practices are governed by the{" "}
                <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
                >
                    Google Privacy Policy
                </a>
                . You can opt out of personalised ads at{" "}
                <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
                >
                    adssettings.google.com
                </a>
                .
            </p>
        ),
    },
    {
        title: "Data Security",
        content: (
            <p>
                All data is transmitted over HTTPS (TLS encryption). Server-side image processing occurs in isolated environments.
                We apply industry-standard security practices to protect against unauthorised access, alteration, or disclosure of
                any information.
            </p>
        ),
    },
    {
        title: "Children's Privacy",
        content: (
            <p>
                PixlTools is not directed at children under 13. We do not knowingly collect any personal information from children.
                If you believe a child has provided personal data to us, please contact us and we will promptly delete it.
            </p>
        ),
    },
    {
        title: "Third-Party Links",
        content: (
            <p>
                Our website may contain links to external sites. We are not responsible for the privacy practices of those sites and
                encourage you to read their respective privacy policies.
            </p>
        ),
    },
    {
        title: "Changes to This Policy",
        content: (
            <p>
                We may update this Privacy Policy from time to time. Continued use of PixlTools after changes are posted constitutes
                your acceptance of the updated policy. The &quot;Last updated&quot; date at the bottom of this page reflects the most recent
                revision.
            </p>
        ),
    },
    {
        title: "Contact",
        content: (
            <p>
                If you have questions about this Privacy Policy or your data, please reach out via our{" "}
                <Link href="/about" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                    contact page
                </Link>
                .
            </p>
        ),
    },
];

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10 py-16">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">Legal</p>
                    <h1 className="font-display text-gray-200 leading-[1.02] text-4xl sm:text-5xl lg:text-5xl mb-4">Privacy Policy</h1>
                    <p className="text-gray-400">Last updated: March 2026</p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-14">
                {/* Highlight box */}
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5 mb-10 flex gap-4">
                    <span className="text-2xl">🔒</span>
                    <div>
                        <p className="font-bold text-violet-400 mb-1">Your images are 100% private</p>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            PixlTools processes your images in real-time and deletes them immediately. We never store, log, or share your files.
                        </p>
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-10">
                    {sections.map(({ title, content }) => (
                        <section key={title}>
                            <div className="flex items-center gap-4 mb-3">
                                <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">{title}</h2>
                                <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                            </div>
                            <div className="text-gray-400 leading-relaxed text-sm">{content}</div>
                        </section>
                    ))}
                </div>

                {/* Back links */}
                <div className="mt-14 pt-8 border-t border-violet-500/10 flex flex-wrap gap-4 text-sm">
                    <Link href="/" className="text-violet-400 hover:text-violet-300 transition-colors">← Back to Home</Link>
                    <Link href="/terms" className="text-gray-400 hover:text-violet-300 transition-colors">Terms of Service →</Link>
                </div>
            </div>
        </main>
    );
}
