"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { archivoFotos, getArchivoIndex } from "@/lib/archivo";
import PhotoLightbox from "@/shared/components/photoLightbox/PhotoLightbox";

const ArchivoLightboxContext = createContext({ open: () => {} });

export const useArchivoLightbox = () => useContext(ArchivoLightboxContext);

export function ArchivoLightboxProvider({ children }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((img) => {
    const i = getArchivoIndex(img);
    setIndex(i < 0 ? 0 : i);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % archivoFotos.length),
    [],
  );

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + archivoFotos.length) % archivoFotos.length),
    [],
  );

  return (
    <ArchivoLightboxContext.Provider value={{ open }}>
      {children}
      <PhotoLightbox
        isOpen={isOpen}
        photos={archivoFotos}
        index={index}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </ArchivoLightboxContext.Provider>
  );
}
