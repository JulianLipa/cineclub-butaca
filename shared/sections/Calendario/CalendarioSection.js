"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarouselHandler from "@/shared/components/carouselHandler/CarouselHandler";
import MonthSlide from "./MonthSlide";

import { fadeIn } from "@/shared/ui/animations/motionPresets";
import { eventos as events } from "@/data.json";
import { useState } from "react";
import { maskStyle } from "./calendarioUtils";

const MONTHS = Array.from({ length: 12 }, (_, i) => i);

const FILTERS = [
  { label: "Todos", value: null, icon: null },
  { label: "Funciones", value: "funcion", icon: "funcion" },
  { label: "Ciclos", value: "ciclo", icon: "rectangle" },
];

const ChipIcon = ({ name, active }) => (
  <span
    className="shrink-0 w-3 h-3 inline-block"
    style={maskStyle(`i-${name}-default.svg`, active ? "var(--white)" : "var(--primary)")}
  />
);

const CalendarioClubSection = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [activeIndex, setActiveIndex] = useState(today.getMonth());
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [filter, setFilter] = useState(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex % MONTHS.length);
  };

  return (
    <motion.section {...fadeIn} className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <SectionTitleIcon icon="calendario">
          Calendario del club
        </SectionTitleIcon>

        <CarouselHandler
          totalItems={MONTHS.length}
          activeIndex={activeIndex}
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
          isPaginatorActive={false}
        />
      </div>

      <div className="flex gap-2">
        {FILTERS.map(({ label, value, icon }) => {
          const active = filter === value;
          return (
            <button
              key={label}
              onClick={() => setFilter(value)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border border-(--primary) transition-colors cursor-pointer ${
                active
                  ? "bg-(--primary) text-(--white)"
                  : "bg-transparent text-(--primary) hover:bg-(--primary)/10"
              }`}
            >
              {icon && <ChipIcon name={icon} active={active} />}
              {label}
            </button>
          );
        })}
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
              filter={filter}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default CalendarioClubSection;
