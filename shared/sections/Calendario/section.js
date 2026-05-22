"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarrouselHandler from "@/shared/components/carrouselHandler/CarrouselHandler";
import MonthSlide from "./MonthSlide";

import { fadeIn } from "@/shared/ui/animations/motionPresets";
import { eventos as events } from "@/data.json";
import { useState } from "react";

const MONTHS = Array.from({ length: 12 }, (_, i) => i);

const CalendarioClubSection = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [activeIndex, setActiveIndex] = useState(today.getMonth());
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex % MONTHS.length);
  };

  return (
    <motion.section {...fadeIn} className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <SectionTitleIcon icon="calendario">
          Calendario del club
        </SectionTitleIcon>

        <CarrouselHandler
          totalItems={MONTHS.length}
          activeIndex={activeIndex}
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
          isPaginatorActive={false}
        />
      </div>

      <Swiper
        loop={true}
        initialSlide={today.getMonth()}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        className="w-full"
        spaceBetween={16}
        breakpoints={{
          0: {
            slidesPerView: 1.15,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {MONTHS.map((monthIndex) => (
          <SwiperSlide key={monthIndex}>
            <MonthSlide
              year={year}
              monthIndex={monthIndex}
              today={today}
              events={events}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default CalendarioClubSection;
