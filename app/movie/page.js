"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import { funciones } from "@/data.json";

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

const Page = () => {
  const { setHasPaddingTop } = useLayout();

  useEffect(() => {
    setHasPaddingTop(false);
    return () => setHasPaddingTop(true);
  }, [setHasPaddingTop]);

  const movieData = funciones[0];

  return (
    <div>
      <MovieHero />

      <div className="relative flex flex-col sm:flex-row sectionMain gap-10! top-0">
        <MovieSidebar data={movieData} />

        <div className="w-full sm:w-[70%] flex flex-col gap-10 sm:py-(--padding-body-desktop)">
          <MovieActions />

          <div className="colSection gap-10!">
            <div className="colSection">
              <SectionTitle>Trailer</SectionTitle>
              <MovieTrailer />
            </div>

            <MovieCarouselSection
              title="Resumen Butaca"
              totalItems={Object.keys(movieData.resumenButaca).length}
              showControls={true}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 1.2 },
                1024: { slidesPerView: 2.2 },
              }}
            >
              {Object.entries(movieData.resumenButaca).map(([key, value]) => (
                <CardMovieResumen key={key} title={key} text={value} />
              ))}
            </MovieCarouselSection>
          </div>

          <div className="sm:flex sm:flex-row flex flex-col gap-8">
            <div className="w-full sm:w-[50%] colSection">
              <SectionTitle>Sinopsis</SectionTitle>
              <MovieSinopsis />
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
            <SectionTitle>Equipo</SectionTitle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
