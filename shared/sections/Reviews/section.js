"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarrouselHandler from "@/shared/components/carrouselHandler/CarrouselHandler";
import ReviewCard from "@/shared/ui/reviewCard/ReviewCard.js";
import MovieCard from "@/shared/ui/movieCard/movieCard";
import { funciones as movies } from "@/data.json";

import { fadeIn } from "@/shared/ui/animations/motionPresets";

const Popular = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <motion.section {...fadeIn} className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <SectionTitleIcon icon="comentarios">
          Reseñas populares
        </SectionTitleIcon>

        <CarrouselHandler
          totalItems={movies.length}
          activeIndex={activeIndex}
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
          isPaginatorActive={false}
        />
      </div>

      <Swiper
        loop
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        className="w-full rounded-xl"
        spaceBetween={16}
        breakpoints={{
          0: {
            slidesPerView: 1.1,
          },

          640: {
            slidesPerView: 2.2,
          },

          1024: {
            slidesPerView: 2.5,
          },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className="w-auto flex! gap-4">
            <div className="">
              <MovieCard
                data={movie}
              />
            </div>
            <ReviewCard data={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default Popular;
