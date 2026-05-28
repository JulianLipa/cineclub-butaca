"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import MovieCard from "@/shared/ui/movieCard/movieCard";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarrouselHandler from "@/shared/components/carrouselHandler/CarrouselHandler";
import { funciones as movies } from "@/data.json";
import Button from "@/shared/ui/button/Button";

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
        <SectionTitleIcon icon="like">Popular entre miembros</SectionTitleIcon>

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
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 16,
          },

          640: {
            slidesPerView: 2.2,
            spaceBetween: 16,
          },

          1024: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard
              text={true}
              data={movie}
              actionsIcons={"like,comentarios"}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center w-full">
        <Button variant="primary" className="w-full! sm:w-fit!">
          Ver Comunidad
        </Button>
      </div>
    </motion.section>
  );
};

export default Popular;
