"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import Script from "next/script";

function GAPageTracker({ gaId }: { gaId: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window.gtag === "function") {
            const query = searchParams?.toString();
            const url = pathname + (query ? `?${query}` : "");

            window.gtag("config", gaId, {
                page_path: url,
            });
        }
    }, [pathname, searchParams, gaId]);

    return null;
}

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
            </Script>
            <Suspense fallback={null}>
                <GAPageTracker gaId={gaId} />
            </Suspense>
        </>
    );
}

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}
