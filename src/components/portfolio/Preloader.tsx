import { useEffect, useRef, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

/** Minimalist loading sequence: counter 0→100, then curtain lifts. */
export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("amethyst_has_visited") === "true") {
        onComplete();
        return;
      }
    } catch {}

    const start = performance.now();
    const DURATION = 1000;
    let raf = 0;
    let exitTimer = 0;
    let doneTimer = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        exitTimer = window.setTimeout(() => setExiting(true), 150);
        doneTimer = window.setTimeout(() => {
          if (!doneRef.current) {
            doneRef.current = true;
            try {
              sessionStorage.setItem("amethyst_has_visited", "true");
            } catch {}
            onComplete();
          }
        }, 800);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem("amethyst_has_visited", "true");
    } catch {}
    onComplete();
  };

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9500] flex flex-col items-center justify-center bg-black transition-[clip-path] duration-700"
      style={{
        clipPath: exiting ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
        transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" />
        <span className="font-mono text-[11px] tracking-[0.35em] text-bone/60 uppercase">
          THE AMETHYST
        </span>
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="pointer-events-auto absolute top-6 right-6 font-mono text-[10px] tracking-[0.2em] text-bone/40 hover:text-white border border-white/15 rounded-full px-3 py-1 transition-colors uppercase"
      >
        [ SKIP ]
      </button>

      <div className="pointer-events-none absolute bottom-8 right-8 font-display text-7xl font-extralight italic text-white/10 md:bottom-12 md:right-14 md:text-9xl">
        {count}
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-white/10">
        <div
          className="h-full bg-white transition-[width] duration-100 ease-linear"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  );
}
