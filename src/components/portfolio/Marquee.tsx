const ITEMS = [
  "Documentary",
  "Shorts & Reels",
  "Podcast Edits",
  "Gaming Essays",
  "Arcade Reviews",
  "Fashion Showcase",
  "Sports Stories",
];

interface MarqueeProps {
  onSelectCategory?: (category: string) => void;
}

export function Marquee({ onSelectCategory }: MarqueeProps) {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="Genres & Categories"
      className="group overflow-hidden border-y border-white/10 py-2.5 bg-white/[0.02]"
    >
      <div className="animate-marquee group-hover:[animation-play-state:paused] flex w-max items-center whitespace-nowrap">
        {doubled.map((item, i) => (
          <button
            key={`${item}-${i}`}
            type="button"
            onClick={() => onSelectCategory?.(item)}
            className="flex items-center transition-transform hover:scale-105"
          >
            <span
              className={`font-mono text-xs md:text-sm uppercase tracking-wider transition-colors duration-300 ${
                i % 2 === 0 ? "text-bone/80 hover:text-white" : "text-bone/40 hover:text-bone"
              }`}
            >
              {item}
            </span>
            <span className="mx-4 text-xs font-mono text-bone/25 md:mx-6">/</span>
          </button>
        ))}
      </div>
    </section>
  );
}
