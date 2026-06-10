"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Button from "@/shared/ui/button/Button";
import { funciones as movies } from "@/data.json";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import CarouselHandler from "@/shared/components/carouselHandler/CarouselHandler";

import { fadeIn } from "@/shared/ui/animations/motionPresets";

const VoteBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="sm:pr-(--padding-body-desktop-w) pr-(--padding-body-mobile-w)">
      <motion.div
        {...fadeIn}
        style={{
          background:
            "linear-gradient(-25deg, var(--secondary) 0%, transparent 35%)",
        }}
        className="flex flex-col lg:flex-row w-full h-full border border-solid border-(--primary) rounded-2xl lg:p-15 p-8 gap-4"
      >
        {/* CAROUSEL - Appears first on mobile, second on desktop */}
        <div className="colSection w-full lg:w-1/2 order-2 lg:order-2">
          <Swiper
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            className="w-full rounded-xl"
            spaceBetween={16}
            breakpoints={{
              0: {
                slidesPerView: 1.6,
                spaceBetween: 4,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
            }}
          >
            {movies.slice(0, 3).map((movie, index) => (
              <SwiperSlide key={index}>
                <MovieCard text={true} tmdbId={movie.tmdbId} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* TITLE AND BUTTONS - Reorganized for mobile/desktop */}
        <div className="colSection w-full lg:w-1/2 order-1 lg:order-1">
          {/* Title section */}
          <div className="flex flex-col h-fit">
            <p className="font-[600] text-[26px] sm:text-[40px] lg:text-[80px] leading-none tracking-tight">
              Votá que película
            </p>
            <p className="font-[300] text-[26px] sm:text-[40px] lg:text-[80px] leading-none tracking-tight">
              vamos a ver
            </p>
          </div>

          {/* Buttons section */}
          <div className="flex gap-2 w-full">
            <Button
              variant="primary"
              className="w-[-webkit-fill-available]! lg:w-fit!"
            >
              Ver más
            </Button>
            <Button
              variant="secondary"
              className="w-[-webkit-fill-available]! lg:w-fit!"
            >
              Comunidad
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VoteBanner;
