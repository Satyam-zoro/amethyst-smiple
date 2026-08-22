import { useEffect, useRef, useState } from "react";

interface NavProps {
  onConnect?: () => void;
}

export function Nav({}: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 120 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[200] transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <nav
        className={`flex h-[68px] items-center justify-between px-6 transition-all duration-500 md:px-12 ${
          scrolled
            ? "border-b border-white/10 bg-black/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="font-display text-base font-bold tracking-tight text-bone hover:text-white transition-colors"
          aria-label="Back to top"
        >
          PORTFOLIO
        </a>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/70">
            Available for Projects
          </span>
        </div>
      </nav>
    </header>
  );
}
