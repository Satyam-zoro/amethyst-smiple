import { useRef, useEffect, useState, type KeyboardEvent } from "react";
import { Play } from "lucide-react";
import { posterTime, type Work } from "@/data/works";

interface WorkCardProps {
  work: Work;
  index: number;
  span?: string;
  className?: string;
  onPlay: (work: Work) => void;
}

export function WorkCard({ work, index, span = "", className = "", onPlay }: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  /* Lazy-load video source when card comes into viewport */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleEnter = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (videoRef.current && isVisible) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = posterTime(work.src);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlay(work);
    }
  };

  return (
    <article
      ref={cardRef}
      className={`work-card group relative cursor-pointer outline-none select-none transition-transform duration-200 active:scale-[0.985] focus-visible:ring-1 focus-visible:ring-white ${span} ${className}`}
      data-format={work.format}
      data-cursor="play"
      role="button"
      tabIndex={0}
      aria-label={`Play ${work.title} - ${work.category}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onPlay(work)}
      onKeyDown={handleKey}
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-black/90 transition-all duration-500 group-hover:border-white/40 group-hover:shadow-[0_20px_50px_-20px_rgba(255,255,255,0.1)]">
        <video
          ref={videoRef}
          className="work-video pointer-events-none absolute inset-0 h-full w-full object-cover opacity-75 transition-[opacity,transform] duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
          src={isVisible ? work.src : undefined}
          preload={isVisible ? "metadata" : "none"}
          playsInline
          muted
          loop
          aria-hidden="true"
        />

        {/* Index */}
        <span className="absolute left-2.5 top-2.5 sm:left-3.5 sm:top-3.5 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-bone/60 mix-blend-difference">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Play badge - visible on mobile touch, hover-only on desktop */}
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 sm:h-12 sm:w-12 -translate-x-1/2 -translate-y-1/2 scale-90 sm:scale-75 items-center justify-center rounded-full border border-white/30 bg-black/80 text-white opacity-85 md:opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 shadow-lg">
          <Play className="ml-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
        </span>

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 sm:gap-1.5 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 sm:p-4 pt-8 sm:pt-10">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span
              className={`w-fit rounded border px-1.5 sm:px-2 py-0.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider backdrop-blur-sm ${
                work.format === "short"
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/15 bg-black/40 text-bone/70"
              }`}
            >
              {work.category}
            </span>
            {work.client && (
              <span className="font-mono text-[8px] sm:text-[9px] text-bone/40 uppercase truncate max-w-[110px] sm:max-w-none">
                • {work.client}
              </span>
            )}
          </div>
          <h3 className="font-display text-[13px] xs:text-sm sm:text-base font-semibold leading-tight text-bone line-clamp-2 transition-transform duration-300 group-hover:-translate-y-0.5 md:text-lg">
            {work.title}
          </h3>
        </div>
      </div>
    </article>
  );
}
