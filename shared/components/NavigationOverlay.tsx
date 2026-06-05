"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationOverlay() {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor || e.metaKey || e.ctrlKey || e.shiftKey || anchor.target) return;

      try {
        const url = new URL(anchor.href);
        if (
          url.origin === window.location.origin &&
          url.pathname !== window.location.pathname
        ) {
          setIsNavigating(true);
        }
      } catch {}
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--white-opacidad)",
        zIndex: 900,
        pointerEvents: "none",
        opacity: isNavigating ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    />
  );
}
