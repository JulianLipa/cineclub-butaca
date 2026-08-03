"use client";

import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import { popular } from "@/data.json";

const Popular = ({ title }) => (
  <CarouselSection
    title={title}
    icon="like"
    items={popular}
    renderItem={(tmdbId) => (
      <MovieCard
        text={true}
        tmdbId={tmdbId}
        actionsIcons={["like", "comentarios"]}
      />
    )}
    breakpoints={{
      0: { slidesPerView: 2.5, spaceBetween: 8 },
      640: { slidesPerView: 4, spaceBetween: 16 },
      1024: { slidesPerView: 6.5, spaceBetween: 16 },
    }}
  />
);

export default Popular;
