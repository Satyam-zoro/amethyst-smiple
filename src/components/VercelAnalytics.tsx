import { useEffect } from "react";
import { inject } from "@vercel/analytics";

/**
 * Universal Vercel Analytics component compatible with Vite SSR & client builds.
 * Injects Vercel Web Analytics script on mount.
 */
export function VercelAnalytics() {
  useEffect(() => {
    inject();
  }, []);

  return null;
}
