export function Hero() {
  return (
    <section className="relative px-4 xs:px-5 sm:px-6 pt-16 pb-2.5 md:px-12 md:pt-24 md:pb-3">
      {/* Soft ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[25vh] w-[50vw] -translate-x-1/2 rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 md:gap-3 border-b border-white/10 pb-3">
        {/* Headline - naturally wrapping on mobile, strictly single-line on desktop */}
        <h1 className="hero-title font-display text-2xl xs:text-[26px] sm:text-3xl md:text-[clamp(1rem,2.1vw,1.65rem)] font-bold tracking-tight text-bone leading-[1.2] md:leading-normal md:whitespace-nowrap md:overflow-hidden md:text-ellipsis flex items-center">
          <span className="hero-line-mask overflow-hidden">
            <span className="hero-line block">
              Crafting <span className="font-normal italic text-bone/50">high-retention</span>{" "}
              <span className="block sm:inline">visual stories.</span>
            </span>
          </span>
        </h1>

        {/* Right Info Tag */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-[9px] xs:text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] text-bone/40 uppercase whitespace-nowrap shrink-0">
          <span>VIDEO EDITOR & STORY DIRECTOR</span>
          <span className="hidden lg:inline text-white/15">•</span>
          <span className="hidden lg:inline">DOCUMENTARIES • PODCASTS • SHORTS</span>
        </div>
      </div>
    </section>
  );
}
