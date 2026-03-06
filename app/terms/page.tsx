import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service – PixlTools",
    description: "Read the Terms of Service for PixlTools. Free image tools with no signup, no data stored, and no hidden terms.",
    robots: { index: true, follow: true },
};

const sections: { title: string; content: React.ReactNode }[] = [
    {
        title: "Acceptance of Terms",
        content: (
            <p>
                By accessing or using PixlTools (&quot;Service&quot;) at pixltools.com, you agree to be bound by these Terms of Service.
                If you do not agree, please do not use the Service. These terms apply to all visitors and users of the website.
            </p>
        ),
    },
    {
        title: "Description of Service",
        content: (
            <p>
                PixlTools provides a suite of free online image processing tools including — but not limited to — image compression,
                resizing, cropping, format conversion, background removal, and editing filters. No account or registration is
                required to use the Service.
            </p>
        ),
    },
    {
        title: "Acceptable Use",
        content: (
            <>
                <p>You agree to use PixlTools only for lawful purposes. You must not:</p>
                <ul className="mt-3 space-y-1.5 ml-4">
                    {[
                        "Upload images that contain illegal content, including child sexual abuse material (CSAM)",
                        "Attempt to reverse-engineer, scrape, or interfere with the service infrastructure",
                        "Use the service to distribute malware or harmful software",
                        "Circumvent rate limits or abuse the API endpoints via automated bots",
                        "Upload images you do not have the legal right to process or modify",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                            <span className="text-red-400 font-bold mt-0.5">✗</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </>
        ),
    },
    {
        title: "Intellectual Property",
        content: (
            <p>
                You retain full ownership of any images you upload to PixlTools. By uploading, you grant us a temporary, limited,
                royalty-free licence solely to process the image and return the result to you. This licence terminates immediately
                upon delivery of the processed result. PixlTools claims no ownership over your content.
            </p>
        ),
    },
    {
        title: "No Warranties",
        content: (
            <p>
                The Service is provided &quot;as is&quot; and &quot;as available&quot;, without warranty of any kind, express or implied. We do not
                warrant that the Service will be uninterrupted, error-free, or that the results will meet your specific requirements.
                Image processing results may vary depending on the input file, format, and tool settings.
            </p>
        ),
    },
    {
        title: "Limitation of Liability",
        content: (
            <p>
                To the fullest extent permitted by law, PixlTools and its operators shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your use of, or inability to use, the Service — including
                but not limited to loss of data or loss of profits. Our total liability to you for any claim shall not exceed USD $0,
                as the Service is provided free of charge.
            </p>
        ),
    },
    {
        title: "Rate Limits",
        content: (
            <p>
                To ensure fair access for all users, the Service enforces per-IP rate limits. Automated or bulk usage that
                degrades the service for other users is prohibited. We reserve the right to block IPs that violate these limits.
            </p>
        ),
    },
    {
        title: "Service Changes and Availability",
        content: (
            <p>
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice.
                We are not liable to you or any third party for any modification, suspension, or discontinuation of the Service.
            </p>
        ),
    },
    {
        title: "Third-Party Services",
        content: (
            <p>
                PixlTools may integrate with or display content from third-party services (e.g., advertising networks). Your use
                of those services is subject to their respective terms and privacy policies. We are not responsible for the
                content, accuracy, or practices of any third-party sites or services.
            </p>
        ),
    },
    {
        title: "Governing Law",
        content: (
            <p>
                These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising under
                these Terms shall be subject to the exclusive jurisdiction of the relevant courts.
            </p>
        ),
    },
    {
        title: "Changes to Terms",
        content: (
            <p>
                We may update these Terms of Service at any time. Continued use of the Service after changes are posted
                constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.
            </p>
        ),
    },
    {
        title: "Contact",
        content: (
            <p>
                Questions about these Terms? Please visit our{" "}
                <Link href="/about" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                    contact page
                </Link>{" "}
                to get in touch.
            </p>
        ),
    },
];

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-slate-950">
            {/* Hero */}
            <div className="bg-slate-950 border-b border-slate-800 py-14">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">Legal</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Terms of Service</h1>
                    <p className="text-slate-400">Last updated: March 2026</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
                {/* Highlight box */}
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-10">
                    <p className="text-sm text-slate-400 leading-relaxed">
                        <strong className="text-slate-200">Plain-language summary:</strong> PixlTools is a free service. You own your images. We
                        process and delete them immediately. Don&apos;t use the service for illegal content. We offer no guarantees and have no liability
                        since the service costs you nothing.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-10">
                    {sections.map(({ title, content }) => (
                        <section key={title}>
                            <h2 className="text-xl font-bold text-slate-200 mb-3">{title}</h2>
                            <div className="text-slate-500 leading-relaxed text-sm">{content}</div>
                        </section>
                    ))}
                </div>

                {/* Back links */}
                <div className="mt-14 pt-8 border-t border-slate-800 flex flex-wrap gap-4 text-sm">
                    <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition-colors">← Back to Home</Link>
                    <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy →</Link>
                </div>
            </div>
        </main>
    );
}
