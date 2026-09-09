"use client";

import { useState } from "react";
import Skeleton from "@/shared/components/skeleton/Skeleton.js";
import FadeIn from "@/shared/components/skeleton/FadeIn.js";

const PersonaFoto = ({ data }) => {
  const [loaded, setLoaded] = useState(false);

  // El skeleton se mantiene hasta que la foto realmente cargó.
  // Sin foto no hay nada que esperar: queda listo de una.
  const ready = !data || !data.foto ? true : loaded;

  return (
    <FadeIn
      loading={!data}
      ready={ready}
      skeleton={<Skeleton className="w-full aspect-[2/3] rounded-3xl" />}
    >
      {data &&
        (data.foto ? (
          <div className="relative w-full aspect-[2/3] rounded-3xl overflow-hidden bg-(--secondary)">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.foto}
              alt={data.nombre || ""}
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
        ) : (
          <div className="w-full aspect-[2/3] rounded-3xl bg-(--secondary)" />
        ))}
    </FadeIn>
  );
};

export default PersonaFoto;
