"use client";

import React from "react";
import { useParams } from "next/navigation";

import Button from "@/shared/ui/button/Button";
import BackButton from "@/shared/components/backButton/BackButton";
import CardDetails from "@/shared/ui/card/CardDetails";
import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import ReviewsSection from "@/shared/sections/Reviews/ReviewsSection";
import ListasSection from "@/shared/sections/Listas/ListasSection";

import { funciones as movies } from "@/data.json";

const STATS = [
  { key: "seguidores", label: "Seguidores", value: 11 },
  { key: "seguidos", label: "Seguidos", value: 8 },
  { key: "peliculas", label: "Películas", value: 47 },
  { key: "listas", label: "Listas", value: 3 },
  { key: "resenas", label: "Reseñas", value: 12 },
  { key: "temas", label: "Temas", value: 5 },
  { key: "watchlist", label: "Watchlist", value: 24 },
];

const Page = () => {
  const { username } = useParams();

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
      <BackButton />
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div className={`profileImg w-30! md:w-45`}></div>

        <div className="flex gap-4">
          <Button variant="buttonText" className="font-[600]! text-[.9em]">
            @{username}
          </Button>

          <Button variant="primary" className="font-[600]! text-[.9em]">
            Seguir
          </Button>
        </div>

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

      <ReviewsSection variant="review" title={"Reseñas"} moreButton={true} />
      <ReviewsSection variant="tema" title={"Temas"} moreButton={true} />
      <ListasSection title={"Listas"} moreButton={true} />
    </div>
  );
};

export default Page;
