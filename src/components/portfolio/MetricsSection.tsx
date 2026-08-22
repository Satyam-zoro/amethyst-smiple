import { TrendingUp, PlayCircle, Users, CheckCircle2 } from "lucide-react";

const STATS = [
  {
    icon: TrendingUp,
    value: "+45%",
    label: "AVERAGE RETENTION",
    description: "Algorithmic pacing & hook design",
  },
  {
    icon: PlayCircle,
    value: "25M+",
    label: "TOTAL VIEWS",
    description: "Across creator & client channels",
  },
  {
    icon: Users,
    value: "15+",
    label: "CREATOR PARTNERS",
    description: "Top-tier channels & storytellers",
  },
  {
    icon: CheckCircle2,
    value: "100%",
    label: "ON-TIME DELIVERY",
    description: "Strict turnarounds & reliability",
  },
];

export function MetricsSection() {
  return (
    <section className="relative border-y border-white/10 bg-black/40 px-6 py-16 md:px-12 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div
          data-reveal
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8"
        >
          <div>
            <span className="font-mono text-[10px] tracking-[0.35em] text-bone/50 uppercase">
              KEY BENCHMARKS
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-bone md:text-4xl">
              Performance by the <span className="font-light italic text-bone/50">numbers.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs text-bone/60 leading-relaxed md:text-sm font-mono">
            // EVERY EDIT IS OPTIMIZED FOR AUDIENCE RETENTION AND ALGORITHMIC DISTRO.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10 lg:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                data-reveal
                className="group relative bg-black/90 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-bone/70">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="font-display text-3xl font-extrabold tracking-tight text-bone md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-[11px] tracking-wider text-bone/80 uppercase">
                  {stat.label}
                </div>
                <p className="mt-1 text-xs text-bone/50 leading-relaxed">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
