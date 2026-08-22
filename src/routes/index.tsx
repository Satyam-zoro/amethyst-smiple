import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { Cursor } from "@/components/portfolio/Cursor";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { WorksSection } from "@/components/portfolio/WorksSection";
import { Lightbox } from "@/components/portfolio/Lightbox";
import { ConnectModal } from "@/components/portfolio/ConnectModal";
import { FinalCta } from "@/components/portfolio/FinalCta";
import { Footer } from "@/components/portfolio/Footer";
import { getWorkById, type Work } from "@/data/works";

interface SearchParams {
  work?: string | undefined;
}

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const w = search["work"];
    return {
      work: typeof w === "string" ? w : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "The Amethyst — Premium Video Editing" },
      {
        name: "description",
        content:
          "Discover selected video edits across YouTube documentaries, podcasts, gaming essays, AMVs, and high-retention short-form content.",
      },
      { property: "og:title", content: "The Amethyst — Premium Video Editing" },
      {
        property: "og:description",
        content:
          "Discover selected video edits across YouTube documentaries, podcasts, gaming essays, AMVs, and high-retention short-form content.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Amethyst — Premium Video Editing" },
      {
        name: "twitter:description",
        content:
          "Discover selected video edits across YouTube documentaries, podcasts, gaming essays, AMVs, and high-retention short-form content.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [connectOpen, setConnectOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const search = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  /* Resolve active work from URL search params for deep-linking */
  const activeWork = search.work ? getWorkById(search.work) || null : null;

  const setActiveWork = useCallback(
    (work: Work | null) => {
      navigate({
        search: work ? { work: work.id } : {},
        replace: true,
        resetScroll: false,
      });
    },
    [navigate],
  );

  /* Lenis smooth scroll + GSAP scroll storytelling + progress bar */
  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isReducedMotion) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      const lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", (e: { progress?: number }) => {
        ScrollTrigger.update();
        if (progressRef.current && typeof e.progress === "number") {
          progressRef.current.style.transform = `scaleX(${e.progress})`;
        }
      });

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            },
          );
        });
      });

      return () => {
        ctx.revert();
        gsap.ticker.remove(raf);
        lenis.destroy();
        lenisRef.current = null;
      };
    }

    return () => {};
  }, []);

  /* Freeze scroll while an overlay is open */
  const overlayOpen = connectOpen || activeWork !== null;
  useEffect(() => {
    const lenis = lenisRef.current;
    if (overlayOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [overlayOpen]);

  const scrollToWorks = () => {
    const el = document.querySelector('section[aria-label="Portfolio"]');
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-ink text-bone">
      {/* Scroll progress */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[8500] h-[2px]">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-white"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div aria-hidden className="grain-overlay" />
      <Cursor />

      <Nav onConnect={() => setConnectOpen(true)} />

      <main>
        <Hero />
        <WorksSection onPlay={setActiveWork} />
        <Marquee onSelectCategory={() => scrollToWorks()} />
        <FinalCta />
      </main>

      <Footer />

      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
      <Lightbox work={activeWork} onClose={() => setActiveWork(null)} />
    </div>
  );
}
