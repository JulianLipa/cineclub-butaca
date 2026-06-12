"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";

import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarouselHandler from "@/shared/components/carouselHandler/CarouselHandler";
import NewsCard from "@/shared/ui/newsCard/NewsCard";
import { fadeIn } from "@/shared/ui/animations/motionPresets";

const NOTICIAS = [
  {
    id: "1",
    img: "/imgs/frame-godfather-HQ.webp",
    titulo: "El cine argentino arrasa en los festivales internacionales de 2026",
    copete: "Tres películas nacionales compiten en Cannes, Berlín y San Sebastián.",
    tematicas: ["Cine argentino", "Festivales", "Internacional"],
    descripcion: "Una nueva generación de directores y directoras argentinas está conquistando los principales festivales de cine del mundo. Con propuestas arriesgadas y una mirada propia, el cine nacional vuelve a posicionarse en el mapa global.",
  },
  {
    id: "2",
    img: "/imgs/frame-godfather-HQ.webp",
    titulo: "Restauran en 4K los clásicos del cine latinoamericano de los 60 y 70",
    copete: "La Cinemateca Nacional lidera un ambicioso proyecto de preservación.",
    tematicas: ["Restauración", "Patrimonio", "Clásicos"],
    descripcion: "Un proyecto sin precedentes busca recuperar y digitalizar más de 200 títulos del cine latinoamericano de las décadas del 60 y 70. Las copias originales, muchas en estado crítico, serán escaneadas en 4K para preservarlas para las futuras generaciones.",
  },
  {
    id: "3",
    img: "/imgs/frame.jpg",
    titulo: "Los cine-clubes independientes resisten y crecen en las grandes ciudades",
    copete: "Nuevos espacios de proyección y debate cinéfilo emergen en todo el país.",
    tematicas: ["Cine-clubes", "Cultura", "Comunidad"],
    descripcion: "A contracorriente de las plataformas de streaming y los multiplex, los cine-clubes independientes están viviendo un momento de renovado interés. Nuevas generaciones de espectadores buscan el debate colectivo y la experiencia compartida del cine.",
  },
  {
    id: "4",
    img: "/imgs/frame-godfather.webp",
    titulo: "Entrevista exclusiva: el director de fotografía detrás de las imágenes del año",
    copete: "Hablamos con quien redefine el lenguaje visual del cine contemporáneo.",
    tematicas: ["Entrevista", "Fotografía", "Técnica"],
    descripcion: "En una charla íntima y reveladora, el director de fotografía más premiado del último año comparte su proceso creativo, sus influencias y su visión sobre el futuro del lenguaje cinematográfico en la era digital.",
  },
  {
    id: "5",
    img: "/imgs/frame.jpg",
    titulo: "El debate sobre la IA en el cine: ¿herramienta o amenaza?",
    copete: "Directores, guionistas y técnicos se dividen frente a la inteligencia artificial.",
    tematicas: ["IA", "Industria", "Debate"],
    descripcion: "La irrupción de la inteligencia artificial en la producción cinematográfica genera posiciones encontradas. Mientras algunos la ven como una herramienta liberadora, otros advierten sobre sus riesgos para los trabajadores de la industria y la autenticidad del arte.",
  },
];

const ALL_CHIPS = ["Todos", ...Array.from(new Set(NOTICIAS.flatMap((n) => n.tematicas)))];

const NoticiasSection = ({ title = "Noticias" }) => {
  const [activo, setActivo] = useState("Todos");
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const filtradas =
    activo === "Todos"
      ? NOTICIAS
      : NOTICIAS.filter((n) => n.tematicas.includes(activo));

  return (
    <motion.section {...fadeIn} className="flex w-full flex-col gap-4">
      {/* Título + handler */}
      <div className="flex w-full items-center justify-between">
        <SectionTitleIcon icon="triangle">{title}</SectionTitleIcon>
        <CarouselHandler
          totalItems={filtradas.length}
          activeIndex={activeIndex}
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
          isPaginatorActive={false}
        />
      </div>

      {/* Chips de filtro */}
      <div className="relative">
        <Swiper
          modules={[FreeMode]}
          freeMode
          slidesPerView="auto"
          spaceBetween={8}
          className="w-full"
        >
          {ALL_CHIPS.map((chip) => (
            <SwiperSlide key={chip} className="!w-auto">
              <button
                onClick={() => { setActivo(chip); swiperInstance?.slideTo(0); }}
                className={`shrink-0 text-[.78em] font-[500] px-3 py-1.5 rounded-full border transition-colors duration-150 cursor-pointer ${
                  activo === chip
                    ? "border-(--primary) bg-(--primary) text-(--white)"
                    : "border-(--primary) text-(--primary) opacity-70 hover:opacity-100"
                }`}
              >
                {chip}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-(--white) to-transparent z-10" />
      </div>

      {/* Carrusel */}
      <Swiper
        loop={false}
        onSwiper={setSwiperInstance}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="w-full"
        breakpoints={{
          0: { slidesPerView: 1.1, spaceBetween: 16 },
          640: { slidesPerView: 1.6, spaceBetween: 16 },
          1024: { slidesPerView: 2.3, spaceBetween: 16 },
        }}
      >
        {filtradas.map((noticia) => (
          <SwiperSlide key={noticia.id}>
            <NewsCard data={noticia} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default NoticiasSection;
