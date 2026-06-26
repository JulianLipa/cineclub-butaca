"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

export function useHeroLayout(enabled = true) {
  const { setHasPaddingTop } = useLayout();
  useEffect(() => {
    if (!enabled) return;
    setHasPaddingTop(false);
    return () => setHasPaddingTop(true);
  }, [enabled, setHasPaddingTop]);
}
