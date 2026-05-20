"use client";

import { useEffect, useState } from "react";

import Card from "@/shared/ui/card/Card";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarrouselHandler from "@/shared/components/carrouselHandler/CarrouselHandler";

import { useCarousel } from "@/shared/hooks/useCarousel";

import style from "@/shared/ui/card/card.module.css";

const cards = [
  {
    title: "Carrie",
    year: "1976",
    date: "Sab. 24/12",
    hour: "19:45hs",
    subtitle: "Brian de Palma",
    place: "Sala Malba",
    cycle: "Culto",
  },
  {
    title: "Suspiria",
    year: "1977",
    date: "Dom. 25/12",
    hour: "20:00hs",
    subtitle: "Dario Argento",
    place: "Sala Lugones",
    cycle: "Terror Italiano",
  },
  {
    title: "Possession",
    year: "1981",
    date: "Lun. 26/12",
    hour: "22:10hs",
    subtitle: "Andrzej Żuławski",
    place: "MALBA",
    cycle: "Culto",
  },
  {
    title: "The Thing",
    year: "1982",
    date: "Mar. 27/12",
    hour: "21:30hs",
    subtitle: "John Carpenter",
    place: "Sala Cosmos",
    cycle: "Sci-Fi Horror",
  },
  {
    title: "Alien",
    year: "1979",
    date: "Jue. 28/12",
    hour: "20:15hs",
    subtitle: "Ridley Scott",
    place: "Sala Lugones",
    cycle: "Sci-Fi Horror",
  },
  {
    title: "Halloween",
    year: "1978",
    date: "Vie. 29/12",
    hour: "23:00hs",
    subtitle: "John Carpenter",
    place: "Sala Malba",
    cycle: "Slasher Clásico",
  },
  {
    title: "The Shining",
    year: "1980",
    date: "Sab. 30/12",
    hour: "21:00hs",
    subtitle: "Stanley Kubrick",
    place: "Sala Cosmos",
    cycle: "Culto",
  },
  {
    title: "Rosemary's Baby",
    year: "1968",
    date: "Dom. 31/12",
    hour: "19:30hs",
    subtitle: "Roman Polanski",
    place: "Sala Lugones",
    cycle: "Clásicos del Horror",
  },
];

const ProxFuncionesSection = () => {
  const [isMobile, setIsMobile] = useState(true);

  const {
    activeIndex,
    cardsRef,
    containerRef,
    handlePrev,
    handleNext,
    handleCardClick,
  } = useCarousel({ itemsLength: cards.length });

  // Detectar si es mobile (SE MANTIENE IGUAL)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="flex w-full flex-col gap-5">
      <div className="flex w-full items-center justify-between">
        <SectionTitleIcon icon="circle">Próximas funciones</SectionTitleIcon>

        <CarrouselHandler
          totalItems={cards.length}
          activeIndex={activeIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          isPaginatorActive={false}
        />
      </div>

      <div
        ref={containerRef}
        className={`w-full snap-x snap-mandatory ${style.sectionWrapperCard}`}
      >
        <section
          className="flex gap-5"
          style={isMobile ? { paddingLeft: "var(--padding-body-mobile)", paddingRight: "var(--padding-body-mobile)" } : undefined}
        >
          {cards.map((card, index) => (
            <div
              key={`${card.title}-${index}`}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              className={`snap-center ${isMobile ? "w-full shrink-0" : ""}`}
            >
              <Card
                {...card}
                isActive={isMobile ? true : index === activeIndex}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default ProxFuncionesSection;
