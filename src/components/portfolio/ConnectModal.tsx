import { useEffect } from "react";
import { Instagram, Twitter, MessageCircle, Mail, X } from "lucide-react";
import { openSmartEmail } from "@/lib/smart-email";

const EMAIL = "business@theamethyst.studio";

interface ConnectModalProps {
  open: boolean;
  onClose: () => void;
}

const cardCls =
  "group flex flex-col items-center justify-center gap-2.5 sm:gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 text-center transition-all duration-300 hover:border-white hover:bg-white/[0.08] active:scale-[0.97] touch-manipulation";

export function ConnectModal({ open, onClose }: ConnectModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="animate-overlay-fade fixed inset-0 z-[8000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Connect with The Amethyst"
    >
      <div className="animate-lb-in relative w-full max-w-lg rounded-2xl border border-white/20 bg-black p-5 xs:p-6 sm:p-8 shadow-2xl my-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 sm:right-5 sm:top-5 flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-white/15 text-bone/60 transition-colors duration-300 hover:border-white hover:text-white active:scale-95 touch-manipulation"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-bone/50 block">
          START A PROJECT
        </span>
        <h2 className="mt-1.5 sm:mt-2 font-display text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-bone">
          Let’s discuss your vision.
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-bone/60">
          Select a channel below to message directly or get in touch.
        </p>

        <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-2.5 sm:gap-4">
          <a
            href="https://www.instagram.com/theamethyststudios"
            target="_blank"
            rel="noopener noreferrer"
            className={cardCls}
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-bone group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
              <Instagram className="h-4 w-4" />
            </div>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-bone font-medium">
              Instagram
            </span>
            <span className="text-[10px] sm:text-[11px] text-bone/50 font-mono">
              @theamethyststudios
            </span>
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              openSmartEmail(EMAIL);
            }}
            className={cardCls}
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-bone group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
              <Mail className="h-4 w-4" />
            </div>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-bone font-medium">
              Direct Email
            </span>
            <span className="text-[10px] sm:text-[11px] text-bone/50 font-mono">business@...</span>
          </button>

          <a
            href="https://twitter.com/AmethystCuts"
            target="_blank"
            rel="noopener noreferrer"
            className={cardCls}
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-bone group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
              <Twitter className="h-4 w-4" />
            </div>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-bone font-medium">
              Twitter / X
            </span>
            <span className="text-[10px] sm:text-[11px] text-bone/50 font-mono">@AmethystCuts</span>
          </a>

          <a
            href="https://wa.me/919354468850"
            target="_blank"
            rel="noopener noreferrer"
            className={cardCls}
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-bone group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
              <MessageCircle className="h-4 w-4" />
            </div>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-bone font-medium">
              WhatsApp
            </span>
            <span className="text-[10px] sm:text-[11px] text-bone/50 font-mono">Instant Chat</span>
          </a>
        </div>
      </div>
    </div>
  );
}
