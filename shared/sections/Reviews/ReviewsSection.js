"use client";

import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import ReviewCard from "@/shared/ui/reviewCard/ReviewCard.js";
import { resenas, temas } from "@/data/comunidad";

const Reviews = ({ variant, title, moreButton = true }) => {
  const isTema = variant === "tema";
  const items = isTema ? temas : resenas;

  return (
    <CarouselSection
      title={title}
      moreButton={moreButton}
      moreHref={isTema ? "/tema" : "/resena"}
      icon={`${isTema ? "triangle" : "comillas"}`}
      items={items}
      renderItem={(item) => <ReviewCard data={item} variant={variant} />}
      className="overflow-x-hidden overflow-y-visible!"
      slideClassName="w-auto flex! gap-4"
      breakpoints={{
        0: { slidesPerView: 1.1, spaceBetween: 16 },
        640: { slidesPerView: 2.2, spaceBetween: 16 },
        1024: { slidesPerView: 3.3, spaceBetween: 16 },
      }}
    />
  );
};

export default Reviews;
