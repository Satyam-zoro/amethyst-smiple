import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cleanSrc, type Work } from "@/data/works";

interface LightboxProps {
  work: Work | null;
  onClose: () => void;
}

export function Lightbox({ work, onClose }: LightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!work) return;

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [work, onClose]);

  /* Reset & play video whenever active work changes */
  useEffect(() => {
    if (work && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [work]);

  if (!work) return null;

  return (
    <div
      className="animate-overlay-fade fixed inset-0 z-[3000] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${work.title}`}
    >
      <div className="animate-lb-in relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl">
        {/* Top bar info */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm sm:text-base font-bold text-bone">
              {work.title}
            </span>
            <span className="text-xs font-mono text-bone/50">({work.category})</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-bone/60 hover:border-white hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            key={work.id}
            className="h-full w-full object-contain"
            src={cleanSrc(work.src)}
            controls
            autoPlay
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
}
