"use client";

import { motion } from "framer-motion";

import Card from "@/shared/ui/card/Card";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarrouselHandler from "@/shared/components/carrouselHandler/CarrouselHandler";

import { useCarousel } from "@/shared/hooks/useCarousel";
import { fadeIn } from "@/shared/ui/animations/motionPresets";
import { funciones as cards } from "@/data.json";

const Funciones = () => {
  const {
    activeIndex,
    cardsRef,
    containerRef,
    handlePrev,
    handleNext,
    handleCardClick,
  } = useCarousel({ itemsLength: cards.length });

  return (
    <motion.section {...fadeIn} className="flex w-full flex-col gap-4">
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

      <div ref={containerRef} className="w-full snap-x snap-mandatory carousel">
        <section className="flex gap-4 max-sm:mr-[var(--padding-body-mobile)] max-sm:pr-[var(--padding-body-mobile)]">
          {cards.map((card, index) => {
            const previousCard = cards[index - 1];
            const hideDate = previousCard?.date === card.date;

            return (
              <motion.div
                key={`${card.title}-${index}`}
                ref={(element) => {
                  cardsRef.current[index] = element;
                }}
                className="snap-center max-sm:w-full max-sm:shrink-0"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  {...card}
                  hideDate={hideDate}
                  isActive={index === activeIndex}
                  onClick={() => handleCardClick(index)}
                />
              </motion.div>
            );
          })}
        </section>
      </div>
    </motion.section>
  );
};

export default Funciones;
