"use client";

import { useState } from "react";

import Icon from "@/shared/components/icon/Icon";
import SectionTitle from "@/shared/components/section-title/SectionTitle";
import PricingDiv from "@/shared/sections/Pricing/PricingDiv";
import Button from "@/shared/ui/button/Button";
import { Swiper, SwiperSlide } from "swiper/react";

import { motion } from "framer-motion";

import { fadeIn } from "@/shared/ui/animations/motionPresets";
import { pricing } from "@/data.json";
import { div } from "framer-motion/client";

const Pricing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="sm:pr-(--padding-body-desktop-w) pr-(--padding-body-mobile-w)">
      <motion.section
        {...fadeIn}
        className="bg-(--secondary) py-8 sm:px-10 flex flex-col gap-8 border-2 border-(--secondary) rounded-4xl"
      >
        <div className="w-full px-4 flex flex-col gap-16 sm:gap-12">
          <div className="flex flex-col gap-6 sm:gap-8 items-center text-center w-full">
            <Icon
              name={"logo"}
              color={"var(--primary)"}
              variant={"negative"}
              size="h-[2em]"
            />
            <SectionTitle>Nuestra comunidad depende de vos</SectionTitle>
            <div className="w-[80%] md:w-[50%]">
              <p className={"bodyText text-[.9em]!"}>
                Convertite en Socio Butaca. Tu suscripción es el motor colectivo
                que financia un espacio libre para el cine de autor nacional e
                internacional.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="bodyText text-[.9em]!">Aporte</p>

              <div className="flex">
                <Button variant="primary" className="">
                  Mensual
                </Button>

                <Button variant="secondary" className="">
                  Anual
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          className="w-full"
          spaceBetween={16}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 2.2,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3,
              centeredSlides: false,
            },
          }}
        >
          {pricing.map((p, index) => (
            <SwiperSlide key={index}>
              <PricingDiv data={p} key={index} className="w-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>
    </div>
  );
};

export default Pricing;
