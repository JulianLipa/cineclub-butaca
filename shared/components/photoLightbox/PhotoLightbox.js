"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Button from "@/shared/ui/button/Button";
import Icon from "@/shared/components/icon/Icon";
import CarouselHandler from "@/shared/components/carouselHandler/CarouselHandler";
import style from "./PhotoLightbox.module.css";

// Visor a pantalla completa para fotos de archivo.
// Dos columnas: foto en grande a la izquierda, detalles a la derecha.
// Navega por todas las fotos del archivo (CarouselHandler + flechas del teclado).
const PhotoLightbox = ({
  isOpen,
  photos = [],
  index = 0,
  onClose,
  onPrev,
  onNext,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      else if (e.key === "ArrowRight") onNext?.();
      else if (e.key === "ArrowLeft") onPrev?.();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!mounted) return null;

  const photo = photos[index];
  const funcion = photo?.funcion;

  return createPortal(
    <div
      aria-hidden={!isOpen}
      onClick={onClose}
      className={`fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-300 sm:p-8 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Cerrar */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
      >
        <div className="h-5 w-5">
          <Icon name="close" variant="negative" color="var(--hero-white)" />
        </div>
      </button>

      {photo && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-full w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-center"
        >
          {/* Columna imagen */}
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <Image
              key={photo.img}
              src={photo.img}
              alt={funcion?.titulo || "Foto de archivo"}
              width={1600}
              height={1000}
              sizes="(max-width: 1024px) 92vw, 60vw"
              className="h-auto max-h-[55vh] w-auto max-w-full rounded-xl object-contain lg:max-h-[82vh]"
            />
          </div>

          {/* Columna detalles */}
          {funcion && (
            <div className="flex h-fit w-full shrink-0 flex-col gap-6 rounded-2xl bg-white/10 p-5 backdrop-blur-md sm:p-6 lg:w-80">
              <div className="flex flex-col gap-1.5">
                <p className="text-[1.15em] font-[700] leading-tight text-(--hero-white)">
                  {funcion.titulo}
                  {funcion.anio && (
                    <span className="ml-1.5 text-[.8em] font-[400] opacity-60">
                      {funcion.anio}
                    </span>
                  )}
                </p>
                {funcion.director && (
                  <p className="text-[.9em] text-(--hero-white) opacity-70">
                    {funcion.director}
                  </p>
                )}
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[.82em] text-(--hero-white) opacity-50">
                  {funcion.fecha && <span>{funcion.fecha}</span>}
                  {funcion.asistentes != null && (
                    <span>{funcion.asistentes} asistentes</span>
                  )}
                </div>
              </div>

              {/* Navegación + CTA */}
              <div className="flex items-center justify-between gap-4">
                <CarouselHandler
                  totalItems={photos.length}
                  activeIndex={index}
                  onPrev={onPrev}
                  onNext={onNext}
                  isPaginatorActive={false}
                  className="flex!"
                />
                {funcion.id && (
                  <Button
                    variant="primary"
                    href={`/archivo/${funcion.id}`}
                    onClick={onClose}
                    className="text-[.85em]!"
                  >
                    Ver archivo
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>,
    document.body,
  );
};

export default PhotoLightbox;
