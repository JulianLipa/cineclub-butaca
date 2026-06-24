"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

import SectionTitle from "@/shared/components/section-title/SectionTitle";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import Button from "@/shared/ui/button/Button";
import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import MovieHero from "./sections/MovieHero";
import MovieSidebar from "./sections/MovieSidebar";
import MovieActions from "./sections/MovieActions";
import MoviePresentation from "./sections/MoviePresentation";
import MovieReviews from "./sections/MovieReviews";
import MovieTrailer from "./sections/MovieTrailer";
import MovieSinopsis from "./sections/MovieSinopsis";
import CardMovieResumen from "./sections/MovieResumen/CardMovieResumen";
import PersonCard from "@/shared/ui/personCard/PersonCard";
import ListasSection from "@/shared/sections/Listas/ListasSection";
import PopularSection from "@/shared/sections/Popular/PopularSection";

import BackButton from "@/shared/components/backButton/BackButton";
import { funciones } from "@/data.json";

const MoviePageWrapper = ({ movie }) => {
  const { setHasPaddingTop } = useLayout();
  const funcion = funciones.find(
    (f) => String(f.tmdbId) === String(movie?.tmdbId),
  );
  const resumenButaca = funcion?.resumenButaca;
  const date = funcion?.date;

  useEffect(() => {
    setHasPaddingTop(false);
    return () => setHasPaddingTop(true);
  }, [setHasPaddingTop]);

  return (
    <div>
      <MovieHero img={movie?.frame} />
      {/* Mobile: flecha antes del poster */}
      <div className="sectionMain sm:hidden pb-0!">
        <BackButton />
      </div>

      <div className="sectionMain pt-0! relative flex flex-col sm:flex-row gap-4! top-0">
        <MovieSidebar data={movie} date={date} />

        <div className="w-full sm:w-[70%] flex flex-col gap-10 sm:py-(--padding-body-desktop)">
          {/* Desktop: flecha al tope de la columna scrolleable */}
          <div className="hidden sm:block">
            <BackButton />
          </div>
          <MovieActions date={date} />

          {/* Solo admins: abre la pantalla de pre-función con QR */}
          <MoviePresentation movie={movie} />

          <div className="colSection gap-10!">
            {movie?.trailer && (
              <div className="colSection">
                <SectionTitle>Trailer</SectionTitle>
                <MovieTrailer trailer={movie.trailer} />
              </div>
            )}

            {resumenButaca && (
              <CarouselSection
                title="Resumen Butaca"
                items={Object.entries(resumenButaca)}
                renderItem={([key, value]) => (
                  <CardMovieResumen title={key} text={value} />
                )}
                breakpoints={{
                  0: { slidesPerView: 1.1, spaceBetween: 16 },
                  1024: { slidesPerView: 2.2, spaceBetween: 16 },
                }}
              />
            )}
          </div>

          <div className="flex flex-col min-[1000px]:flex-row gap-6">
            {movie?.sinopsis && (
              <div className="w-full min-[1000px]:w-[50%] colSection">
                <SectionTitle>Sinopsis</SectionTitle>
                <MovieSinopsis text={movie.sinopsis} />
              </div>
            )}

            <div className="w-full min-[1000px]:w-[50%] colSection">
              <div className="flex w-full items-center justify-between">
                <SectionTitleIcon icon="comentarios">Reseñas</SectionTitleIcon>
                <Button variant="primary" icon="arrow" />
              </div>
              <MovieReviews />
            </div>
          </div>

          <div className="colSection">
            {movie.equipo.length > 1 && (
              <CarouselSection
                title="Equipo"
                items={movie.equipo}
                renderItem={(persona) => <PersonCard data={persona} />}
                breakpoints={{
                  0: { slidesPerView: 2.5, spaceBetween: 16 },
                  1024: { slidesPerView: 4.2, spaceBetween: 16 },
                }}
              />
            )}

            <CarouselSection
              title="Elenco"
              items={movie.actores}
              renderItem={(actor) => <PersonCard data={actor} />}
              breakpoints={{
                0: { slidesPerView: 2.5, spaceBetween: 16 },
                1024: { slidesPerView: 4.2, spaceBetween: 16 },
              }}
            />
          </div>
        </div>
      </div>

      <div className="sectionMain flex flex-col gap-6! pt-0!">
        <ListasSection title="Aparece en" />
        <PopularSection title={`Similar a ${movie.titulo}`} />
      </div>
    </div>
  );
};

export default MoviePageWrapper;
