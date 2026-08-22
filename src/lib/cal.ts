/* Cal.com element-click embed loader + programmatic modal open.
 * Replicates the original snippet: stub → embed.js → init "15min" namespace. */

declare global {
  interface Window {
    Cal?: any;
  }
}

let initPromise: Promise<void> | null = null;

export function initCal(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Cal?.loaded) return Promise.resolve();
  if (initPromise) return initPromise;

  initPromise = new Promise<void>((resolve) => {
    // Original Cal embed stub (queues calls until embed.js loads).
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", "15min", { origin: "https://app.cal.com" });
    window.Cal.config = window.Cal.config || {};
    window.Cal.config.forwardQueryParams = true;
    window.Cal.ns["15min"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    // Give embed.js a moment to load; calls are queued regardless.
    window.setTimeout(resolve, 300);
  });

  return initPromise;
}

/** Open the "amethyst-studios/15min" booking modal, with a safe fallback. */
export async function openBooking(): Promise<void> {
  const fallback = () =>
    window.open("https://cal.com/amethyst-studios/15min", "_blank", "noopener");
  try {
    await initCal();
    if (window.Cal?.ns?.["15min"]) {
      window.Cal.ns["15min"]("modal", {
        calLink: "amethyst-studios/15min",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: true },
      });
      return;
    }
    fallback();
  } catch {
    fallback();
  }
}
