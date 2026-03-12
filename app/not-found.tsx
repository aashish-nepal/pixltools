import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                <div className="text-8xl mb-6">🖼️</div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                <p className="text-gray-400 text-lg mb-8">
                    The tool or page you&apos;re looking for doesn&apos;t exist. Browse all our free image tools below.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold px-8 py-3 rounded-xl transition-colors"
                    >
                        🏠 Back to Home
                    </Link>
                    <Link
                        href="/#tools"
                        className="border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                    >
                        🛠️ Browse All Tools
                    </Link>
                </div>
            </div>
        </main>
    );
}
