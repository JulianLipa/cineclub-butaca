"use client";

import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import ReviewCard from "@/shared/ui/reviewCard/ReviewCard.js";
import { funciones as movies } from "@/data.json";

const Reviews = ({ variant, title, moreButton = false }) => (
  <CarouselSection
    title={title}
    moreButton={moreButton}
    icon={`${variant !== "tema" ? "comillas" : "triangle"}`}
    items={movies}
    renderItem={(movie) => <ReviewCard data={movie} variant={variant} />}
    className="overflow-x-hidden overflow-y-visible!"
    slideClassName="w-auto flex! gap-4"
    breakpoints={{
      0: { slidesPerView: 1.1, spaceBetween: 16 },
      640: { slidesPerView: 2.2, spaceBetween: 16 },
      1024: { slidesPerView: 3.3, spaceBetween: 16 },
    }}
  />
);

export default Reviews;
