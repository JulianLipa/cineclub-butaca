"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarouselHandler from "@/shared/components/carouselHandler/CarouselHandler";
import Button from "@/shared/ui/button/Button";
import { fadeIn } from "@/shared/ui/animations/motionPresets";

const CarouselSection = ({
  title,
  icon,
  iconVariant,
  items = [],
  renderItem,
  breakpoints,
  className,
  sectionClassName,
  loop = true,
  setHandlers = true,
  moreButton = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const defaultBreakpoints = {
    0: { slidesPerView: 1.2, spaceBetween: 16 },
    640: { slidesPerView: 2.2, spaceBetween: 16 },
    1024: { slidesPerView: 3, spaceBetween: 16 },
  };

  return (
    <motion.section
      {...fadeIn}
      className={`flex w-full flex-col gap-4 ${sectionClassName}`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-5">
          <SectionTitleIcon icon={icon} iconVariant={iconVariant}>
            {title}
          </SectionTitleIcon>

          {moreButton && <Button variant="primary" icon="arrow" />}
        </div>

        {setHandlers && (
          <CarouselHandler
            totalItems={items.length}
            activeIndex={activeIndex}
            onPrev={() => swiperInstance?.slidePrev()}
            onNext={() => swiperInstance?.slideNext()}
            isPaginatorActive={false}
          />
        )}
      </div>

      <Swiper
        loop={loop}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={`w-full rounded-xl ${className}`}
        breakpoints={breakpoints ?? defaultBreakpoints}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default CarouselSection;
