"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import SectionTitle from "@/shared/components/section-title/SectionTitle";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import Button from "@/shared/ui/button/Button";
import MovieCarouselSection from "./sections/MovieCarouselSection";
import MovieHero from "./sections/MovieHero";
import MovieSidebar from "./sections/MovieSidebar";
import MovieActions from "./sections/MovieActions";
import MovieReviews from "./sections/MovieReviews";
import MovieTrailer from "./sections/MovieTrailer";
import MovieSinopsis from "./sections/MovieSinopsis";
import CardMovieResumen from "./sections/MovieResumen/CardMovieResumen";
import PersonCard from "@/shared/ui/personCard/PersonCard";
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

  console.log(movie)

  return (
    <div>
      <MovieHero img={movie?.frame} />

      <div className="relative flex flex-col sm:flex-row sectionMain gap-10! top-0">
        <MovieSidebar data={movie} />

        <div className="w-full sm:w-[70%] flex flex-col gap-10 sm:py-(--padding-body-desktop)">
          <MovieActions date={date} />

          <div className="colSection gap-10!">
            {movie?.trailer && (
              <div className="colSection">
                <SectionTitle>Trailer</SectionTitle>
                <MovieTrailer trailer={movie.trailer} />
              </div>
            )}

            {resumenButaca && (
              <MovieCarouselSection
                title="Resumen Butaca"
                totalItems={Object.keys(resumenButaca).length}
                showControls={true}
                spaceBetween={16}
                breakpoints={{
                  0: { slidesPerView: 1.2 },
                  1024: { slidesPerView: 2.2 },
                }}
              >
                {Object.entries(resumenButaca).map(([key, value]) => (
                  <CardMovieResumen key={key} title={key} text={value} />
                ))}
              </MovieCarouselSection>
            )}
          </div>

          <div className="sm:flex sm:flex-row flex flex-col gap-8">
            <div className="w-full sm:w-[50%] colSection">
              <SectionTitle>Sinopsis</SectionTitle>
              <MovieSinopsis text={movie?.sinopsis} />
            </div>

            <div className="w-full sm:w-[50%] colSection">
              <div className="flex w-full items-center justify-between">
                <SectionTitleIcon icon="comentarios">Reseñas</SectionTitleIcon>
                <Button variant="primary" icon="arrow" />
              </div>
              <MovieReviews />
            </div>
          </div>

          <div className="colSection">
            {movie.equipo.length > 1 && (
              <MovieCarouselSection
                title="Equipo"
                totalItems={movie?.equipo?.length}
                showControls={true}
                spaceBetween={16}
                breakpoints={{
                  0: { slidesPerView: 2.5 },
                  1024: { slidesPerView: 4.2 },
                }}
              >
                {movie?.equipo?.map((persona, i) => (
                  <PersonCard key={i} data={persona} />
                ))}
              </MovieCarouselSection>
            )}

            <MovieCarouselSection
              title="Elenco"
              totalItems={movie?.actores?.length}
              showControls={true}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 2.5 },
                1024: { slidesPerView: 4.2 },
              }}
            >
              {movie?.actores?.map((actor, i) => (
                <PersonCard key={i} data={actor} />
              ))}
            </MovieCarouselSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePageWrapper;
