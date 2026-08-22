import { useLayoutEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { spanFor, visibleWorks, type FilterId, type Work } from "@/data/works";
import { WorkCard } from "./WorkCard";

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "ALL EDITS" },
  { id: "long", label: "LONG FORM" },
  { id: "short", label: "SHORTS / REELS" },
];

interface WorksSectionProps {
  onPlay: (work: Work, playlist?: Work[]) => void;
}

export function WorksSection({ onPlay }: WorksSectionProps) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [showAllLong, setShowAllLong] = useState(false);
  const [showAllShort, setShowAllShort] = useState(false);
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
  const longWorks = works.filter((w) => w.format === "long");
  const shortWorks = works.filter((w) => w.format === "short");

  /* Mobile-only long-form ordering: Put Why Harvard Studied Müller above Minecraft */
  const mobileLongWorks = useMemo(() => {
    const list = [...longWorks];
    const harvardIdx = list.findIndex((w) => w.id === "harvard-footballer");
    const minecraftIdx = list.findIndex((w) => w.id === "ai-minecraft-models");
    if (harvardIdx !== -1 && minecraftIdx !== -1 && harvardIdx > minecraftIdx) {
      const [harvardItem] = list.splice(harvardIdx, 1);
      list.splice(minecraftIdx, 0, harvardItem);
    }
    return list;
  }, [longWorks]);

  const displayedLongWorks = showAllLong ? mobileLongWorks : mobileLongWorks.slice(0, 4);
  const displayedShortWorks = showAllShort ? shortWorks : shortWorks.slice(0, 6);

  /* Device-aware playlist for lightbox prev/next navigation */
  const mobileFullPlaylist = useMemo(() => {
    if (filter === "long") return mobileLongWorks;
    if (filter === "short") return shortWorks;
    return [...mobileLongWorks, ...shortWorks];
  }, [filter, mobileLongWorks, shortWorks]);

  return (
    <section
      className="px-4 xs:px-5 sm:px-6 pt-2 pb-14 md:px-12 md:pt-3 md:pb-24 max-w-full overflow-hidden"
      aria-label="Portfolio"
    >
      {/* Filter bar - single screen on phone, clean refined pill group on PC */}
      <div
        data-reveal
        className="mb-4 sm:mb-5 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      >
        <div className="grid grid-cols-3 gap-1.5 xs:gap-2 w-full sm:w-auto sm:flex sm:items-center sm:gap-2">
          {FILTERS.map((f) => {
            const count = visibleWorks(f.id).length;
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFilter(f.id);
                  if (f.id !== "all") {
                    setShowAllLong(true);
                    setShowAllShort(true);
                  }
                }}
                aria-pressed={active}
                className={`min-h-[38px] sm:min-h-0 shrink-0 inline-flex items-center justify-center rounded-full border px-2.5 xs:px-3 sm:px-3.5 py-1 font-mono text-[10px] xs:text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 touch-manipulation select-none ${
                  active
                    ? "border-white bg-white text-black font-bold shadow-md"
                    : "border-white/15 bg-white/5 text-bone/60 hover:border-white/40 hover:text-white"
                }`}
              >
                <span>{f.label}</span>
                <span className="ml-1 opacity-60">({String(count).padStart(2, "0")})</span>
              </button>
            );
          })}
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40 shrink-0 select-none">
          INDEX — {String(works.length).padStart(2, "0")} SELECTED PROJECTS
        </span>
      </div>

      {/* Desktop & Tablet Bento Grid (≥ 768px) — Exactly untouched */}
      <div ref={gridRef} className="hidden md:grid works-grid" data-reveal>
        {works.map((work, i) => (
          <WorkCard
            key={work.id}
            work={work}
            index={i}
            span={spanFor(work, filter)}
            onPlay={(w) => onPlay(w, works)}
          />
        ))}
      </div>

      {/* Mobile-Specific Editorial Composition (< 768px) */}
      <div className="flex flex-col md:hidden" data-reveal>
        {/* Long-Form Section (1 Project per Row in 16:9) */}
        {(filter === "all" || filter === "long") && (
          <section className="mb-8 last:mb-0" aria-label="Long-form Video Projects">
            <div className="mb-3 flex items-baseline justify-between border-b border-white/10 pb-2">
              <h2 className="font-display text-xs xs:text-sm font-bold tracking-wider text-bone uppercase">
                LONG-FORM {filter === "long" ? `(${longWorks.length})` : ""}
              </h2>
              <span className="font-mono text-[9px] xs:text-[10px] tracking-wider text-bone/40 uppercase">
                YouTube · Documentary · Gaming
              </span>
            </div>

            <div className="flex flex-col gap-3.5 xs:gap-4">
              {displayedLongWorks.map((work, i) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  index={i}
                  className="w-full aspect-[16/9]"
                  onPlay={(w) => onPlay(w, mobileFullPlaylist)}
                />
              ))}
            </div>

            {/* "MORE LONG FORM" button on mobile */}
            {!showAllLong && longWorks.length > 4 && (
              <button
                type="button"
                onClick={() => setShowAllLong(true)}
                className="mt-3.5 w-full min-h-[46px] rounded-xl border border-white/20 bg-white/[0.04] py-3 px-4 font-mono text-xs uppercase tracking-widest text-bone hover:border-white/40 hover:bg-white/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 touch-manipulation shadow-sm"
              >
                <span>MORE LONG FORM</span>
                <span className="text-[10px] text-bone/50">({longWorks.length - 4} MORE)</span>
                <ChevronDown className="h-4 w-4 text-bone/70" />
              </button>
            )}
          </section>
        )}

        {/* Short-Form Section (2-Column Vertical Grid in 9:16) */}
        {(filter === "all" || filter === "short") && (
          <section className="mb-8 last:mb-0" aria-label="Short-form Video Projects">
            <div className="mb-3 flex items-baseline justify-between border-b border-white/10 pb-2">
              <h2 className="font-display text-xs xs:text-sm font-bold tracking-wider text-bone uppercase">
                SHORT-FORM {filter === "short" ? `(${shortWorks.length})` : ""}
              </h2>
              <span className="font-mono text-[9px] xs:text-[10px] tracking-wider text-bone/40 uppercase">
                Reels · Shorts · TikTok
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 xs:gap-3 max-[359px]:grid-cols-1 max-[359px]:gap-3.5">
              {displayedShortWorks.map((work, i) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  index={longWorks.length + i}
                  className="w-full aspect-[9/16]"
                  onPlay={(w) => onPlay(w, mobileFullPlaylist)}
                />
              ))}
            </div>

            {/* "MORE SHORT FORM" button on mobile */}
            {!showAllShort && shortWorks.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAllShort(true)}
                className="mt-3.5 w-full min-h-[46px] rounded-xl border border-white/20 bg-white/[0.04] py-3 px-4 font-mono text-xs uppercase tracking-widest text-bone hover:border-white/40 hover:bg-white/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 touch-manipulation shadow-sm"
              >
                <span>MORE SHORT FORM</span>
                <span className="text-[10px] text-bone/50">({shortWorks.length - 6} MORE)</span>
                <ChevronDown className="h-4 w-4 text-bone/70" />
              </button>
            )}
          </section>
        )}
      </div>
    </section>
  );
}
