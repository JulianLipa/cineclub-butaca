"use client";

import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import List from "@/shared/ui/list/List";

const LISTS = [
  { tmdbId: 36785 },
  { tmdbId: 7340 },
  { tmdbId: 58429 },
  { tmdbId: 499 },
  { tmdbId: 655 },
  { tmdbId: 18079 },
];

const ListasSection = ({ title, moreButton = false }) => (
  <CarouselSection
    title={title}
    moreButton={moreButton}
    icon={"list"}
    items={LISTS}
    renderItem={(list) => <List {...list} />}
    breakpoints={{
      0: { slidesPerView: 1.2, spaceBetween: 16 },
      640: { slidesPerView: 2.2, spaceBetween: 16 },
      1024: { slidesPerView: 3.3, spaceBetween: 16 },
    }}
  />
);

export default ListasSection;
