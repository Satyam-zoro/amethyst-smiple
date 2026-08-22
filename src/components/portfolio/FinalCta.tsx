import { openSmartEmail } from "@/lib/smart-email";
import { Instagram, Mail } from "lucide-react";

export function FinalCta() {
  return (
    <section
      className="relative w-full bg-[#f4f4f5] px-4 xs:px-5 sm:px-6 py-12 md:px-16 md:py-24"
      aria-label="Initiate Collaboration"
    >
      <div
        data-reveal
        className="mx-auto flex max-w-6xl flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8"
      >
        {/* Left Side: Headline */}
        <div className="space-y-1.5 sm:space-y-2">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-zinc-500 font-medium block">
            INITIATE COLLABORATION
          </span>

          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-zinc-950 leading-[1.2] md:leading-[1.15]">
            Have a video project in mind?
            <span className="block font-normal italic text-zinc-500 mt-0.5">
              Let&apos;s craft it together.
            </span>
          </h2>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
          {/* Solid Black Capsule: Instagram */}
          <a
            href="https://www.instagram.com/theamethyststudios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[46px] items-center justify-center gap-2.5 rounded-full bg-black px-6 sm:px-7 font-sans text-[13px] font-bold tracking-[0.03em] text-white uppercase transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98] touch-manipulation"
          >
            <Instagram className="h-4 w-4 stroke-[1.75]" />
            <span>INSTAGRAM</span>
          </a>

          {/* Outlined Capsule: Send Email */}
          <button
            type="button"
            onClick={() => openSmartEmail("contact@theamethyst.studio")}
            className="inline-flex h-[46px] items-center justify-center gap-2.5 rounded-full border border-black/20 bg-transparent px-6 sm:px-7 font-sans text-[13px] font-bold tracking-[0.03em] text-zinc-950 uppercase transition-all duration-200 hover:border-black/50 hover:bg-black/[0.04] active:scale-[0.98] touch-manipulation"
          >
            <Mail className="h-4 w-4 stroke-[1.75] text-zinc-900" />
            <span>SEND EMAIL</span>
          </button>
        </div>
      </div>
    </section>
  );
}
