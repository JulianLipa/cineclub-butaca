"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "@/shared/components/section-title/SectionTitle";
import CarrouselHandler from "@/shared/components/carrouselHandler/CarrouselHandler";
import "swiper/css";

const MovieCarouselSection = ({
  title,
  children,
  totalItems,
  showControls = true,
  spaceBetween = 16,
  breakpoints = {
    0: { slidesPerView: 1.2 },
    1024: { slidesPerView: 2.2 },
  },
}) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  // Convertir children a array
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className="w-full colSection">
      <div className="flex justify-between items-center">
        <SectionTitle>{title}</SectionTitle>

        {showControls && (
          <CarrouselHandler
            totalItems={totalItems || childrenArray.length}
            activeIndex={activeIndex}
            onPrev={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
            isPaginatorActive={false}
          />
        )}
      </div>

      <div className="w-full">
        <Swiper
          spaceBetween={spaceBetween}
          loop={false}
          className="rounded-2xl"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          breakpoints={breakpoints}
        >
          {childrenArray.map((child, index) => (
            <SwiperSlide
              key={index}
              className="overflow-hidden border-1 rounded-2xl border-(--secondary)"
            >
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieCarouselSection;
