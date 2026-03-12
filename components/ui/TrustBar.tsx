"use client";

import { useState } from "react";
import { ShieldCheck, Clock, Lock, CheckCircle2 } from "lucide-react";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Zero data retention" },
  { icon: Clock, label: "Instant processing" },
  { icon: Lock, label: "No account required" },
  { icon: CheckCircle2, label: "Zero — watermarks" },
];
const TRACK_ITEMS = [...TRUST_ITEMS, ...TRUST_ITEMS];

export default function TrustBar() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="border-y border-violet-500/10 bg-[#0f0d1f]"
      onPointerMove={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 pb-16">
        <div className="trust-marquee">
          <div className={`trust-track ${paused ? "is-paused" : ""}`}>
            {[0, 1].map((copyIndex) => (
              <div key={copyIndex} className="trust-group" aria-hidden={copyIndex === 1}>
                {TRACK_ITEMS.map(({ icon: Icon, label }, itemIndex) => (
                  <div
                    key={`${label}-${copyIndex}-${itemIndex}`}
                    className="flex items-center gap-3 rounded-2xl border border-violet-500/15 bg-[#120f25] px-4 py-3 w-[260px]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                      <Icon size={16} className="text-violet-300" strokeWidth={2} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-slate-200">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .trust-marquee {
          overflow: hidden;
        }

        .trust-track {
          display: flex;
          width: max-content;
          animation: trust-marquee 30s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }

        .trust-group {
          display: flex;
          gap: 0.5rem;
        }

        .trust-track.is-paused {
          animation-play-state: paused;
        }

        @keyframes trust-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
