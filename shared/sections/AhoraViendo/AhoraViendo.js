"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarouselHandler from "@/shared/components/carouselHandler/CarouselHandler";
import { fadeIn } from "@/shared/ui/animations/motionPresets";

const ACTIVIDAD = [
  { username: "julianMotorizado", tmdbId: "7340", hace: "hace 2 min" },
  { username: "anitsugga", tmdbId: "58429", hace: "hace 8 min" },
  { username: "cine_malena", tmdbId: "499", hace: "hace 15 min" },
  { username: "rodrigo_film", tmdbId: "655", hace: "hace 23 min" },
  { username: "pau_cinefila", tmdbId: "18079", hace: "hace 41 min" },
  { username: "mati_35mm", tmdbId: "36785", hace: "hace 1 h" },
  { username: "sofi_nuevo_cine", tmdbId: "97020", hace: "hace 1 h" },
  { username: "el_proyeccionista", tmdbId: "11778", hace: "hace 2 h" },
];

const ActivityCard = ({ username, tmdbId, hace }) => {
  const [poster, setPoster] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    fetch(`/api/movies?id=${tmdbId}&preview=true`)
      .then((r) => r.json())
      .then((d) => {
        setPoster(d.poster);
        setTitle(d.titulo);
      })
      .catch(() => {});
  }, [tmdbId]);

  return (
    <div className="relative flex flex-col gap-2 w-full group rounded-xl p-1.5 transition-colors duration-200 hover:bg-(--primary-opacidad) border border-transparent hover:border-(--primary)">
      {/* Link que cubre toda la tarjeta para navegar a la película */}
      <Link href={`/movie/${tmdbId}`} className="absolute inset-0 z-0 rounded-xl" aria-label={title || "Ver película"} />

      {/* Poster */}
      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-(--secondary)">
        {poster && (
          <Image
            src={poster}
            alt={title || ""}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {/* Avatar badge — z-10 para quedar sobre el link de la tarjeta */}
        <Link
          href={`/perfil/${username}`}
          className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-(--white)/80 backdrop-blur-sm rounded-full px-2 py-1 transition-all duration-200 hover:bg-(--touchable) hover:-translate-y-1 hover:text-(--white) z-10"
        >
          <div className="w-4 h-4 rounded-full bg-(--secondary) shrink-0" />
          <span className="text-[10px] font-medium leading-none truncate max-w-[60px]">
            @{username}
          </span>
        </Link>
      </div>

      {/* Info */}
      <div className="relative z-0 flex flex-col gap-0.5 px-0.5">
        <span className="bodyText text-xs font-medium truncate">
          {title || "—"}
        </span>
        <span className="text-[10px] opacity-50">{hace}</span>
      </div>
    </div>
  );
};

const AhoraViendo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <motion.section {...fadeIn} className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <SectionTitleIcon icon="eye" iconVariant="default">
          ¿Qué están viendo ahora?
        </SectionTitleIcon>
        <CarouselHandler
          totalItems={ACTIVIDAD.length}
          activeIndex={activeIndex}
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
          isPaginatorActive={false}
        />
      </div>

      <Swiper
        onSwiper={setSwiperInstance}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        spaceBetween={8}
        breakpoints={{
          0: { slidesPerView: 2.2 },
          640: { slidesPerView: 4.2 },
          1024: { slidesPerView: 7.2 },
        }}
        className="w-full"
      >
        {ACTIVIDAD.map((item) => (
          <SwiperSlide key={item.username}>
            <ActivityCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default AhoraViendo;
