"use client";

import React, { createContext, useContext, useState } from "react";

interface LayoutContextType {
  hasPaddingTop: boolean;
  setHasPaddingTop: (value: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [hasPaddingTop, setHasPaddingTop] = useState(true);

  return (
    <LayoutContext.Provider value={{ hasPaddingTop, setHasPaddingTop }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout debe estar dentro de LayoutProvider");
  }
  return context;
}
