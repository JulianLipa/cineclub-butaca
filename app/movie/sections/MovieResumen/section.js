"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardMovieResumen from "./CardMovieResumen.js";
import "swiper/css";

import style from "@/app/movie/movie.module.css";

const MovieResumen = ({ data, swiperRef, onSlideChange }) => {
  const resumenData = data.resumenButaca;

  return (
    <Swiper
      spaceBetween={16}
      loop={false}
      className="rounded-2xl"
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={onSlideChange}
      breakpoints={{
        0: {
          slidesPerView: 1.2,
        },
        1024: {
          slidesPerView: 2.2,
        },
      }}
    >
      {Object.entries(resumenData).map(([key, value]) => (
        <SwiperSlide
          key={key}
          className={`${style.cardMovieResumen} overflow-hidden border-1 rounded-2xl border-(--secondary)`}
        >
          <CardMovieResumen title={key} text={value} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieResumen;
