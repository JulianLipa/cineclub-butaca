"use client";

import { useLayout } from "@/contexts/LayoutContext";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hasPaddingTop } = useLayout();
  const pathname = usePathname();

  return (
    <main
      className={`sectionMain ${hasPaddingTop ? "pt-(--padding-body-mobile)! sm:pt-(--padding-body-desktop)!" : "p-0!"}`}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ minHeight: "100%" }}
      >
        {children}
      </motion.div>
    </main>
  );
}
