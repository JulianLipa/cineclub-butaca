"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Button from "@/shared/ui/button/Button";
import { funciones as movies } from "@/data.json";
import MovieCard from "@/shared/ui/movieCard/movieCard";
import CarrouselHandler from "@/shared/components/carrouselHandler/CarrouselHandler";

import { fadeIn } from "@/shared/ui/animations/motionPresets";

const VoteBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <motion.div
      {...fadeIn}
      className="flex flex-col sm:flex-row w-full h-full border border-solid border-(--primary) rounded-xl sm:p-15 p-8 gap-4"
    >
      {/* CAROUSEL - Appears first on mobile, second on desktop */}
      <div className="colSection w-full sm:w-1/2 order-2 sm:order-2">
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          className="w-full rounded-xl"
          spaceBetween={16}
          breakpoints={{
            0: {
              slidesPerView: 2.5,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {movies.slice(0, 3).map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard text={true} data={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* TITLE AND BUTTONS - Reorganized for mobile/desktop */}
      <div className="colSection w-full sm:w-1/2 order-1 sm:order-1">
        {/* Title section */}
        <div className="flex flex-col h-fit">
          <p className="font-[600] text-[40px] sm:text-[80px] leading-none tracking-tight">
            Votá que película
          </p>
          <p className="font-[300] text-[40px] sm:text-[80px] leading-none tracking-tight">
            vamos a ver
          </p>
        </div>

        {/* Buttons section */}
        <div className="flex gap-2 w-full">
          <Button variant="primary" className="w-[-webkit-fill-available]! sm:w-fit!">
            Ver más
          </Button>
          <Button variant="secondary" className="w-[-webkit-fill-available]! sm:w-fit!">
            Comunidad
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default VoteBanner;
