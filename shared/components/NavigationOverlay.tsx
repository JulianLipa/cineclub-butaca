"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function NavigationOverlay() {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor || e.metaKey || e.ctrlKey || e.shiftKey || anchor.target)
        return;

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

    const handlePush = () => setIsNavigating(true);

    document.addEventListener("click", handleClick);
    window.addEventListener("navigation-start", handlePush);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("navigation-start", handlePush);
    };
  }, []);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "var(--white)",
            zIndex: 900,
            pointerEvents: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
}
