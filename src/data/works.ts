export type WorkFormat = "long" | "short";
export type FilterId = "all" | "long" | "short";
export type GridSpan = "span-2x2" | "span-2x1" | "span-1x2" | "span-1x1" | "span-hidden";

export interface Work {
  id: string;
  title: string;
  category: string;
  format: WorkFormat;
  /** Video URL including the #t= poster-frame fragment. */
  src: string;
  spanAll: GridSpan;
  spanLong: GridSpan;
  spanShort: GridSpan;
  metric?: string;
  client?: string;
}

const CDN = "https://amethyst-cdn.b-cdn.net";

export const WORKS: Work[] = [
  {
    id: "geometry-dash-mods",
    title: "Geometry Dash Mod Ranking",
    category: "Arcade Review",
    format: "long",
    src: `${CDN}/long%20form/Ranking%20Geometry%20Dash%20Mods.mp4#t=0.001`,
    spanAll: "span-2x2",
    spanLong: "span-2x2",
    spanShort: "span-hidden",
    metric: "+84% Retention",
    client: "Arcade Network",
  },
  {
    id: "food-review-hook",
    title: "Food & Review Hook",
    category: "Shorts / Reels",
    format: "short",
    src: `${CDN}/McDonald%E2%80%99s%20vs.%20Dunkin%20Iced%20Coffee!.mp4#t=0.001`,
    spanAll: "span-1x2",
    spanLong: "span-hidden",
    spanShort: "span-2x2",
    metric: "2.4M Views",
    client: "Foodie Hub",
  },
  {
    id: "disney-commentary",
    title: "Disney Movie Commentary",
    category: "Shorts / Reels",
    format: "short",
    src: `${CDN}/5.0%20Rosie_DisneyMovie.mp4#t=0.001`,
    spanAll: "span-1x2",
    spanLong: "span-hidden",
    spanShort: "span-1x2",
    metric: "1.5M Views",
  },
  {
    id: "viral-hook",
    title: "Viral Hook Edit",
    category: "Shorts / Reels",
    format: "short",
    src: `${CDN}/viral%20hook.mp4#t=0.001`,
    spanAll: "span-1x2",
    spanLong: "span-hidden",
    spanShort: "span-1x2",
    metric: "4.5M Views",
  },
  {
    id: "dangerous-writer",
    title: "The Most Dangerous Writer",
    category: "Documentary",
    format: "long",
    src: `${CDN}/long%20form/The%20Most%20Dangerous%20Writer%20Who%20Ever%20Lived.mp4#t=0.001`,
    spanAll: "span-2x2",
    spanLong: "span-2x2",
    spanShort: "span-hidden",
    metric: "1.1M Views",
    client: "Literary Lens",
  },
  {
    id: "podcast-highlight",
    title: "Podcast Highlight",
    category: "Shorts / Reels",
    format: "short",
    src: `${CDN}/podcast%20highlightttt.mp4#t=0.001`,
    spanAll: "span-1x2",
    spanLong: "span-hidden",
    spanShort: "span-1x2",
    metric: "3.2M Views",
  },
  {
    id: "high-energy-shorts",
    title: "High Energy Shorts",
    category: "Shorts / Reels",
    format: "short",
    src: `${CDN}/high%20energy%20shortts.mp4#t=0.001`,
    spanAll: "span-1x2",
    spanLong: "span-hidden",
    spanShort: "span-1x2",
    metric: "1.8M Views",
  },
  {
    id: "fashion-editorial",
    title: "Fashion Editorial Edit",
    category: "Shorts / Reels",
    format: "short",
    src: `${CDN}/fashin%20short%20(249edit).mp4#t=0.001`,
    spanAll: "span-1x2",
    spanLong: "span-hidden",
    spanShort: "span-1x2",
    metric: "+78% Watch Time",
  },
  {
    id: "ai-minecraft-models",
    title: "Minecraft 3D Models",
    category: "Gaming Tutorial",
    format: "long",
    src: `${CDN}/long%20form/How%20To%20Make%203D%20MINECRAFT%20Models%20Using%20AI%20%EF%BD%9C%20Ai%20Thumbnail%20Tutorial.mp4#t=4`,
    spanAll: "span-2x2",
    spanLong: "span-2x2",
    spanShort: "span-hidden",
    metric: "750K Views",
  },
  {
    id: "abstract-visuals",
    title: "Abstract Visuals Edit",
    category: "Shorts / Reels",
    format: "short",
    src: `${CDN}/cool%20edit.mp4#t=0.001`,
    spanAll: "span-1x2",
    spanLong: "span-hidden",
    spanShort: "span-1x2",
    metric: "890K Views",
  },
  {
    id: "terrifying-arcade",
    title: "Terrifying Arcade Game",
    category: "Horror Gaming",
    format: "long",
    src: `${CDN}/long%20form/This%20TERRIFYING%20Chuck%20E.%20Cheese%20Game%20lets%20you%20fight%20back....mp4#t=0.001`,
    spanAll: "span-2x2",
    spanLong: "span-2x2",
    spanShort: "span-hidden",
    metric: "+62% Retention",
  },
  {
    id: "harvard-footballer",
    title: "Why Harvard Studied Müller",
    category: "Sports Essay",
    format: "long",
    src: `${CDN}/Why%20Harvard%20Studied%20This%20Footballer.mp4#t=0.001`,
    spanAll: "span-1x1",
    spanLong: "span-2x1",
    spanShort: "span-hidden",
    metric: "920K Views",
  },
  {
    id: "gaming-setup",
    title: "Gaming Setup Showcase",
    category: "Gaming Tech",
    format: "long",
    src: `${CDN}/long%20form/gaming%20SHORT.mp4#t=0.001`,
    spanAll: "span-1x1",
    spanLong: "span-2x1",
    spanShort: "span-hidden",
    metric: "610K Views",
  },
  {
    id: "tekken-2",
    title: "Tekken 2 Is Underrated",
    category: "Retro Review",
    format: "long",
    src: `${CDN}/long%20form/Tekken%202%20Is%20UNDERRATED.mp4#t=0.001`,
    spanAll: "span-2x1",
    spanLong: "span-2x1",
    spanShort: "span-hidden",
    metric: "480K Views",
  },
  {
    id: "cs2-skins",
    title: "Top CS2 Skins",
    category: "Tactical Video",
    format: "long",
    src: `${CDN}/long%20form/las%20MEJORES%20SKINS%20BARATAS%20y%20BONITAS%20de%20CS2.mp4#t=0.001`,
    spanAll: "span-2x1",
    spanLong: "span-2x1",
    spanShort: "span-hidden",
    metric: "1.3M Views",
  },
];

export function getWorkById(id: string): Work | undefined {
  return WORKS.find((w) => w.id === id);
}

export function spanFor(work: Work, filter: FilterId): GridSpan {
  if (filter === "long") return work.spanLong;
  if (filter === "short") return work.spanShort;
  return work.spanAll;
}

export function visibleWorks(filter: FilterId): Work[] {
  return WORKS.filter((w) => spanFor(w, filter) !== "span-hidden");
}

/** Strip the #t= fragment so playback starts from 0:00 (lightbox) and ensure safe URL encoding. */
export function cleanSrc(src: string): string {
  const raw = src.replace(/#t=[0-9.]+/, "");
  try {
    return encodeURI(decodeURI(raw));
  } catch {
    return raw;
  }
}

/** Extract the #t= poster frame time, defaulting to 0. */
export function posterTime(src: string): number {
  const m = src.match(/#t=([0-9.]+)/);
  return m?.[1] ? parseFloat(m[1]) : 0;
}
