import { Instagram, Twitter, MessageCircle, Mail } from "lucide-react";
import { openSmartEmail } from "@/lib/smart-email";

const EMAIL = "business@theamethyst.studio";

const linkCls =
  "block w-fit font-mono text-xs text-bone/60 transition-colors duration-300 hover:text-white uppercase tracking-wider";
const socCls =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-bone/60 transition-all duration-300 hover:border-white hover:text-white hover:bg-white/10";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="relative z-10 px-4 xs:px-5 sm:px-6 md:px-12 pt-12 sm:pt-16 md:pt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-10">
          <div data-reveal className="space-y-2">
            <div className="font-display text-xl sm:text-2xl font-bold tracking-tight text-bone">
              THE AMETHYST{" "}
              <span className="font-mono text-xs font-normal text-bone/40">— VIDEO EDITING</span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-bone/50 font-mono">
              // CRAFTING HIGH-RETENTION VISUAL STORIES FOR CREATORS & DOCUMENTARIES WORLDWIDE.
            </p>
          </div>

          <div data-reveal className="flex flex-wrap gap-6 sm:gap-8">
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.3em] text-bone/40 uppercase mb-2 sm:mb-3">
                NAVIGATION
              </h4>
              <div className="space-y-1 sm:space-y-2">
                <a
                  href="https://www.instagram.com/theamethyststudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  [ INSTAGRAM ]
                </a>
                <button type="button" onClick={() => openSmartEmail(EMAIL)} className={linkCls}>
                  [ DIRECT EMAIL ]
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[10px] tracking-[0.3em] text-bone/40 uppercase mb-2 sm:mb-3">
                SOCIALS
              </h4>
              <div className="space-y-1 sm:space-y-2">
                <a
                  href="https://twitter.com/AmethystCuts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  TWITTER / X
                </a>
                <a
                  href="https://www.instagram.com/theamethyststudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  INSTAGRAM
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Elegant Blackish Giant Wordmark */}
        <div
          aria-hidden
          data-reveal
          className="mt-16 text-center select-none font-display text-[11vw] sm:text-[12vw] font-black leading-none tracking-normal text-white/[0.08] uppercase border-b border-white/5 py-4 whitespace-nowrap"
        >
          THE AMETHYST
        </div>

        <div className="relative flex flex-col-reverse items-center gap-5 py-6 sm:py-8 md:flex-row md:justify-between pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <p className="font-mono text-xs text-bone/40 text-center md:text-left">
            © 2026 THE AMETHYST. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-2.5 sm:gap-3">
            <a
              href="https://twitter.com/AmethystCuts"
              target="_blank"
              rel="noopener noreferrer"
              className={socCls}
              aria-label="X / Twitter"
            >
              <Twitter className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.instagram.com/theamethyststudios"
              target="_blank"
              rel="noopener noreferrer"
              className={socCls}
              aria-label="Instagram"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://wa.me/919354468850"
              target="_blank"
              rel="noopener noreferrer"
              className={socCls}
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => openSmartEmail(EMAIL)}
              className={socCls}
              aria-label="Email"
            >
              <Mail className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
