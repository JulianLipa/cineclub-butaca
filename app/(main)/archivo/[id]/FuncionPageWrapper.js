"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import MovieHero from "@/app/(main)/movie/sections/MovieHero";
import BackButton from "@/shared/components/backButton/BackButton";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import ArchivoPhoto from "@/shared/ui/archivoPhoto/ArchivoPhoto";

const FuncionPageWrapper = ({ funcion, frame }) => {
  const { setHasPaddingTop } = useLayout();

  useEffect(() => {
    setHasPaddingTop(false);
    return () => setHasPaddingTop(true);
  }, [setHasPaddingTop]);

  const fotos = funcion?.fotos ?? [];

  return (
    <div>
      <MovieHero img={frame} className="block" />

      <div className="sectionMain flex justify-start pb-0! md:mt-10">
        <BackButton />
      </div>

      {/* Info principal */}
      <div className="sectionMain flex flex-col gap-4! md:mt-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[1.5rem]! sm:text-[2rem]! font-[700]!">{funcion?.titulo}</h1>
        </div>

        <div className="flex gap-4 flex-wrap">
          <span className="bodyText text-[.82em] opacity-60">{funcion?.fecha}</span>
          <span className="bodyText text-[.82em] opacity-60">{funcion?.asistentes} asistentes</span>
        </div>

        <p className="bodyText">{funcion?.descripcion}</p>

      </div>

      {/* Galería de fotos */}
      {fotos.length > 0 && (
        <div className="sectionMain flex flex-col gap-4!">
          <SectionTitleIcon icon="triangle">Fotos de la función</SectionTitleIcon>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {fotos.map((src, i) => (
              <ArchivoPhoto
                key={i}
                img={src}
                alt={`${funcion?.titulo} — foto ${i + 1}`}
                funcion={funcion}
                span={
                  i === 0
                    ? "col-span-2 sm:col-span-2 aspect-video"
                    : "aspect-square"
                }
                sizes="(max-width: 600px) 100vw, 50vw"
              />
            ))}
          </div>
        </div>
      )}

      {/* Película relacionada */}
      <div className="sectionMain flex flex-col gap-4!">
        <SectionTitleIcon icon="triangle">Película</SectionTitleIcon>
        <div className="w-28">
          <MovieCard tmdbId={funcion?.tmdbId} />
        </div>
      </div>
    </div>
  );
};

export default FuncionPageWrapper;
