import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cleanSrc, WORKS, type Work } from "@/data/works";

interface LightboxProps {
  work: Work | null;
  activeList?: Work[];
  onClose: () => void;
  onNavigate?: (work: Work) => void;
}

export function Lightbox({ work, activeList, onClose, onNavigate }: LightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playlist = activeList && activeList.length > 0 ? activeList : WORKS;
  const currentIndex = work ? playlist.findIndex((w) => w.id === work.id) : -1;
  const prevWork = currentIndex > 0 ? playlist[currentIndex - 1] : playlist[playlist.length - 1];
  const nextWork =
    currentIndex >= 0 && currentIndex < playlist.length - 1
      ? playlist[currentIndex + 1]
      : playlist[0];

  useEffect(() => {
    if (!work) return;

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onNavigate && prevWork) onNavigate(prevWork);
      if (e.key === "ArrowRight" && onNavigate && nextWork) onNavigate(nextWork);
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [work, onClose, onNavigate, prevWork, nextWork]);

  /* Reset & play video whenever active work changes */
  useEffect(() => {
    if (work && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [work]);

  if (!work) return null;

  const isShort = work.format === "short";

  return (
    <div
      className="animate-overlay-fade fixed inset-0 z-[3000] flex items-center justify-center bg-black/95 p-3 xs:p-4 sm:p-8 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${work.title}`}
    >
      <div
        className={`animate-lb-in relative w-full overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl transition-all duration-300 flex flex-col my-auto ${
          isShort
            ? "max-w-[340px] xs:max-w-[360px] sm:max-w-sm max-h-[90vh]"
            : "max-w-5xl max-h-[90vh]"
        }`}
      >
        {/* Top bar info */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 sm:px-5 sm:py-3 bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
            <span className="font-display text-xs xs:text-sm sm:text-base font-bold text-bone truncate">
              {work.title}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-bone/50 shrink-0">
              ({work.category})
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {onNavigate && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate(prevWork)}
                  aria-label="Previous project"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 text-bone/70 hover:border-white hover:text-white transition-colors active:scale-95 touch-manipulation"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(nextWork)}
                  aria-label="Next project"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 text-bone/70 hover:border-white hover:text-white transition-colors active:scale-95 touch-manipulation"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close lightbox"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 text-bone/60 hover:border-white hover:text-white transition-colors active:scale-95 touch-manipulation ml-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div
          className={`relative w-full bg-black flex items-center justify-center ${
            isShort ? "aspect-[9/16] max-h-[78vh]" : "aspect-video"
          }`}
        >
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
