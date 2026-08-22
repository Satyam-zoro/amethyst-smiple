import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { spanFor, visibleWorks, type FilterId, type Work } from "@/data/works";
import { WorkCard } from "./WorkCard";

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "ALL EDITS" },
  { id: "long", label: "LONG FORM" },
  { id: "short", label: "SHORTS / REELS" },
];

interface WorksSectionProps {
  onPlay: (work: Work) => void;
}

export function WorksSection({ onPlay }: WorksSectionProps) {
  const [filter, setFilter] = useState<FilterId>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  useLayoutEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const cards = gridRef.current?.querySelectorAll(".work-card");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        overwrite: true,
        clearProps: "opacity,transform",
      },
    );
  }, [filter]);

  const works = visibleWorks(filter);

  return (
    <section className="px-6 pt-2 pb-16 md:px-12 md:pt-3 md:pb-24" aria-label="Portfolio">
      {/* Minimal filter bar */}
      <div
        data-reveal
        className="mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      >
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const count = visibleWorks(f.id).length;
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  active
                    ? "border-white bg-white text-black font-bold shadow-md"
                    : "border-white/15 bg-white/5 text-bone/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {f.label}{" "}
                <span className="ml-1 opacity-60">({String(count).padStart(2, "0")})</span>
              </button>
            );
          })}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
          INDEX — 15 SELECTED PROJECTS
        </span>
      </div>

      <div ref={gridRef} className="works-grid" data-reveal>
        {works.map((work, i) => (
          <WorkCard
            key={work.id}
            work={work}
            index={i}
            span={spanFor(work, filter)}
            onPlay={onPlay}
          />
        ))}
      </div>
    </section>
  );
}
