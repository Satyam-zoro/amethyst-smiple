import { useState, useRef, useCallback, useEffect } from "react";
import { SlidersHorizontal, Sparkles, Film, Music, Palette, Zap } from "lucide-react";

const DEMO_VIDEO_RAW =
  "https://amethyst-cdn.b-cdn.net/long%20form/Ranking%20Geometry%20Dash%20Mods.mp4#t=0.001";
const DEMO_VIDEO_EDITED =
  "https://amethyst-cdn.b-cdn.net/long%20form/Ranking%20Geometry%20Dash%20Mods.mp4#t=0.001";

export function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove],
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp, onTouchMove]);

  return (
    <section
      id="craft"
      className="relative px-6 py-16 md:px-12 md:py-24 bg-black/40 border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div
          data-reveal
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-[10px] tracking-[0.35em] text-bone/50 uppercase">
              02 / THE CRAFT
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-bone md:text-4xl">
              Raw Footage vs.{" "}
              <span className="font-light italic text-bone/50">Finished Timeline</span>
            </h2>
          </div>
          <p className="max-w-md text-xs text-bone/60 leading-relaxed md:text-sm font-mono">
            Drag the slider to compare unedited raw footage against finished pacing, layered audio
            ducking, and motion graphics.
          </p>
        </div>

        {/* Before / After Interactive Container */}
        <div
          ref={containerRef}
          data-reveal
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            if (e.touches[0]) {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }
          }}
          className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-black select-none cursor-ew-resize shadow-2xl"
        >
          {/* Edited Layer (Background) */}
          <div className="absolute inset-0">
            <video
              className="h-full w-full object-cover"
              src={DEMO_VIDEO_EDITED}
              autoPlay
              muted
              loop
              playsInline
            />
            {/* Edited Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-md px-3.5 py-1 font-mono text-[10px] uppercase font-semibold text-bone">
              <Sparkles className="h-3 w-3 text-white" />
              <span>FINISHED TIMELINE</span>
            </div>
          </div>

          {/* Raw Layer (Clipped Overlay) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div
              className="absolute inset-y-0 left-0 w-full"
              style={{ width: containerRef.current?.getBoundingClientRect().width || "100vw" }}
            >
              <video
                className="h-full w-full object-cover grayscale brightness-75"
                src={DEMO_VIDEO_RAW}
                autoPlay
                muted
                loop
                playsInline
              />
              {/* Raw Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/80 backdrop-blur-md px-3.5 py-1 font-mono text-[10px] uppercase font-semibold text-bone/60">
                <Film className="h-3 w-3 text-bone/40" />
                <span>RAW CAPTURE</span>
              </div>
            </div>
          </div>

          {/* Slider Split Line & Handle */}
          <div
            className="absolute inset-y-0 z-20 w-px bg-white"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/90 text-white shadow-2xl backdrop-blur-xl transition-transform hover:scale-110">
              <SlidersHorizontal className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        </div>

        {/* Craft Breakdown Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4" data-reveal>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-bone/50 mb-1.5">
              <Zap className="h-3.5 w-3.5 text-white" />
              <span>01 / RHYTHM & PACING</span>
            </div>
            <p className="text-xs text-bone/70 leading-relaxed">
              Trimming dead air, creating visual curiosity hooks every 4–6 seconds, and matching
              cuts to natural speech cadence.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-bone/50 mb-1.5">
              <Music className="h-3.5 w-3.5 text-white" />
              <span>02 / AUDIO DESIGN</span>
            </div>
            <p className="text-xs text-bone/70 leading-relaxed">
              Multi-track soundscapes, automatic and hand-drawn music ducking, and custom foley
              impacts for comedic or dramatic weight.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-bone/50 mb-1.5">
              <Palette className="h-3.5 w-3.5 text-white" />
              <span>03 / MOTION & COLOR</span>
            </div>
            <p className="text-xs text-bone/70 leading-relaxed">
              Custom motion graphic callouts and cinematic color grade curves tailored to the
              creator’s aesthetic brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
