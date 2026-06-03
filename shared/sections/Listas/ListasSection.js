"use client";

import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import List from "@/shared/ui/list/List";

const LISTS = [{}, {}, {}, {}, {}, {}];

const ListasSection = ({ title }) => (
  <CarouselSection
    title={title}
    items={LISTS}
    renderItem={(list) => <List {...list} />}
    breakpoints={{
      0: { slidesPerView: 1.2, spaceBetween: 16 },
      640: { slidesPerView: 2.2, spaceBetween: 16 },
      1024: { slidesPerView: 3, spaceBetween: 16 },
    }}
  />
);

export default ListasSection;