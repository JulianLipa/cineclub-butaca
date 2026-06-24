"use client";

import Image from "next/image";
import Icon from "@/shared/components/icon/Icon";
import { useArchivoLightbox } from "@/contexts/ArchivoLightboxContext";

// Foto de archivo: en desktop muestra el ícono de pantalla completa al hover,
// en mobile se abre al tocar. Ambos abren el visor global (PhotoLightbox).
const ArchivoPhoto = ({ img, alt, funcion, span = "", sizes }) => {
  const { open } = useArchivoLightbox();

  return (
    <button
      type="button"
      onClick={() => open(img)}
      aria-label={`Ver ${funcion?.titulo || alt || "foto"} en pantalla completa`}
      className={`group relative cursor-pointer overflow-hidden rounded-xl ${span}`}
    >
      <Image
        src={img}
        alt={alt || funcion?.titulo || "Foto de archivo"}
        fill
        sizes={sizes ?? "(max-width: 600px) 50vw, 25vw"}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Ícono de pantalla completa — solo desktop, al hover */}
      <div className="pointer-events-none absolute right-2 top-2 hidden h-9 w-9 items-center justify-center rounded-full bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 sm:flex">
        <div className="h-4 w-4">
          <Icon name="fullscreen" variant="negative" color="var(--hero-white)" />
        </div>
      </div>

      {/* Overlay con datos — solo desktop, al hover (en mobile aparece en el visor) */}
      {funcion && (
        <div className="absolute inset-0 hidden flex-col justify-end gap-0.5 bg-black/60 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex">
          <p className="line-clamp-2 text-[.82em] font-[600] leading-snug text-white">
            {funcion.titulo}
          </p>
          <p className="text-[.72em] text-white/70">{funcion.fecha}</p>
        </div>
      )}
    </button>
  );
};

export default ArchivoPhoto;
