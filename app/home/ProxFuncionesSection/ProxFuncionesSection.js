"use client";

import { useEffect, useRef, useState, useCallback } from "react";

import CardSection from "@/shared/ui/card/Card";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarrouselHandler from "@/shared/components/carrouselHandler/CarrouselHandler";

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
  const [activeIndex, setActiveIndex] = useState(0);

  const cardsRef = useRef([]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  }, []);

  const handleCardClick = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const activeCard = cardsRef.current[activeIndex];

    if (!activeCard) return;

    activeCard.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }, [activeIndex]);

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

      <div className="w-full overflow-hidden">
        <section className={`flex gap-5`}>
          {cards.map((card, index) => (
            <div
              key={`${card.title}-${index}`}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
            >
              <CardSection
                {...card}
                isActive={index === activeIndex}
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
