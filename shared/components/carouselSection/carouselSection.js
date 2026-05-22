"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Button from "@/shared/ui/button/Button";
import style from "@/shared/components/carouselSection/carouselSection.module.css"

export default function Carousel({
  children,
  loop = true,
  className = "",
  gap = 20,
  onSlideIndexChange,
  isPaginatorActive = true,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const childrenArray = Array.isArray(children) ? children : [children];

  const handleSlideChange = (swiper) => {
    const index = swiper.activeIndex % childrenArray.length;
    setActiveIndex(index);
    onSlideIndexChange?.(index);
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div
        className={`flex gap-2 justify-end items-center ${style.carouselDiv}`}
      >
        <Button variant="secondary" onClick={() => swiperInstance?.slidePrev()}>
          &lt;
        </Button>

        {isPaginatorActive && (
          <div className={style.carrouselPaginator}>
            {Array.from({ length: childrenArray.length }).map((_, index) => (
              <div
                key={index}
                className={`${style.line} ${
                  activeIndex === index ? style.active : ""
                }`}
              />
            ))}
          </div>
        )}

        <Button variant="secondary" onClick={() => swiperInstance?.slideNext()}>
          &gt;
        </Button>
      </div>

      <div className="relative w-full pb-8">
        <Swiper
          loop={loop}
          slidesPerView="auto"
          spaceBetween={gap}
          className="w-full"
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
        >
          {childrenArray.map((child, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              {React.cloneElement(child, {
                isActive: activeIndex === index,
              })}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
