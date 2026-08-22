import { useEffect } from "react";

/**
 * Standard native browser pointer restored for desktop usability.
 */
export function Cursor() {
  useEffect(() => {
    document.documentElement.classList.remove("custom-cursor-active");
  }, []);

  return null;
}
