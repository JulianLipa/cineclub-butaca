"use client";

import { useLayout } from "@/contexts/LayoutContext";
import React from "react";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hasPaddingTop } = useLayout();

  return (
    <main
      className={`sectionMain ${hasPaddingTop ? "pt-(--padding-body-desktop-mobile)! sm:pt-(--padding-body-desktop)!" : "p-0!"}`}
    >
      {children}
    </main>
  );
}
