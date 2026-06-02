"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import List from "@/shared/ui/list/List";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarouselHandler from "@/shared/components/carouselHandler/CarouselHandler";

import { fadeIn } from "@/shared/ui/animations/motionPresets";

const LISTS = [{}, {}, {}, {}, {}, {}];

const ListasSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <motion.section {...fadeIn} className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <SectionTitleIcon>Listas de la comunidad</SectionTitleIcon>

        <CarouselHandler
          totalItems={LISTS.length}
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
          0: { slidesPerView: 1.2, spaceBetween: 16 },
          640: { slidesPerView: 2.2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 16 },
        }}
      >
        {LISTS.map((list, index) => (
          <SwiperSlide key={index}>
            <List {...list} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default ListasSection;
