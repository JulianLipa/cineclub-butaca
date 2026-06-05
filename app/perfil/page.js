"use client";

import React from "react";

import Button from "@/shared/ui/button/Button";
import CardDetails from "@/shared/ui/card/CardDetails";
import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import DetailIcon from "@/shared/components/detailIcon/DetailIcon";
import ReviewsSection from "@/shared/sections/Reviews/ReviewsSection";
import ListasSection from "@/shared/sections/Listas/ListasSection";

import { funciones as movies, usuario } from "@/data.json";

const STATS = [
  { key: "seguidores", label: "Seguidores", value: 11 },
  { key: "seguidos", label: "Seguidos", value: 8 },
  { key: "peliculas", label: "Películas", value: 47 },
  { key: "listas", label: "Listas", value: 3 },
  { key: "resenas", label: "Reseñas", value: 12 },
  { key: "temas", label: "Temas", value: 5 },
  { key: "watchlist", label: "Watchlist", value: 24 },
];

const page = () => {
  const statsProps = Object.fromEntries(
    STATS.map(({ key, label, value }) => [
      key,
      <>
        <strong>{value}</strong> {label}
      </>,
    ]),
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <div className={`profileImg w-30! md:w-45`}></div>

        <div className="flex gap-5">
          <Button variant="buttonText" className="font-[600]! text-[.9em]">
            @{usuario.username}
          </Button>

          <Button variant="primary" className="font-[600]! text-[.9em]">
            Seguir
          </Button>
        </div>

        <p className="bodyText">{usuario.bio}</p>

        <CardDetails
          isProfile={true}
          className="justify-center"
          {...statsProps}
        />
      </div>

      <div className="flex w-full justify-center">
        <CarouselSection
          title={"Favoritos"}
          icon="like"
          items={movies}
          renderItem={(movie) => (
            <MovieCard
              text={true}
              tmdbId={movie.tmdbId}
              actionsIcons={["like", "comentarios"]}
              className={"md:p-[0em]"}
            />
          )}
          setHandlers={false}
          sectionClassName={"md:w-[50svw]!"}
          breakpoints={{
            0: { slidesPerView: 4, spaceBetween: 4 },
            640: { slidesPerView: 4, spaceBetween: 4 },
            1024: { slidesPerView: 4, spaceBetween: 16 },
          }}
        />
      </div>

      <div className="flex w-full justify-center">
        <CarouselSection
          moreButton={true}
          title={"Vistas recientemente"}
          icon="calendario"
          items={usuario.peliculasVistas}
          className={"rounded-l-[0px]!"}
          renderItem={(movie) => (
            <div className="flex flex-col gap-2">
              <DetailIcon icon="calendario">{movie.watchedDate}</DetailIcon>
              <MovieCard tmdbId={movie.tmdbId} text={true} className={"md:p-[0]"} />
            </div>
          )}
          setHandlers={true}
          sectionClassName={""}
          loop={false}
          breakpoints={{
            0: { slidesPerView: 2.5, spaceBetween: 16 },
            640: { slidesPerView: 4, spaceBetween: 16 },
            1024: { slidesPerView: 6, spaceBetween: 16 },
          }}
        />
      </div>

      <ReviewsSection variant="review" title={"Reseñas"} moreButton={true} />
      <ReviewsSection variant="tema" title={"Temas"} moreButton={true} />
      <ListasSection title={"Listas"} moreButton={true} />
    </div>
  );
};

export default page;
