"use client";

import { usePathname } from "next/navigation";
import StickyHeaderBar from "./StickyHeaderBar";

export default function ConditionalHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <StickyHeaderBar />;
}
