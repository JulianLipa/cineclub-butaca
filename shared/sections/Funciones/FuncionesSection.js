"use client";

import { motion } from "framer-motion";

import Card from "@/shared/ui/card/Card";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarouselHandler from "@/shared/components/carouselHandler/CarouselHandler";

import { useCarousel } from "@/shared/hooks/useCarousel";
import { fadeIn } from "@/shared/ui/animations/motionPresets";
import { isSameScreeningDay, sortByDateDesc } from "@/lib/dates";
import CicloCard from "@/shared/ui/cicloCard/CicloCard";

const FuncionesSection = ({
  items = [],
  title = "Próximas funciones",
  icon = "triangle",
  iconVariant,
  type = "funciones",
}) => {
  const cards = type === "funciones" ? sortByDateDesc(items) : items;

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
        <SectionTitleIcon icon={icon} iconVariant={iconVariant}>
          {title}
        </SectionTitleIcon>

        <CarouselHandler
          totalItems={cards.length}
          activeIndex={activeIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          isPaginatorActive={false}
        />
      </div>

      <div
        ref={containerRef}
        className="w-full snap-x snap-mandatory carousel rounded-xl"
      >
        <section className="flex gap-4 max-sm:pr-[var(--padding-body-mobile)]">
          {cards.map((card, index) => {
            const isActive = index === activeIndex;
            const onClick = () => handleCardClick(index);

            const previousCard = cards[index - 1];
            const hideDate = isSameScreeningDay(previousCard?.date, card.date);

            return (
              <motion.div
                key={`${card.tmdbId}-${index}`}
                ref={(element) => {
                  cardsRef.current[index] = element;
                }}
                className="snap-start max-sm:w-full max-sm:shrink-0"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {type === "ciclos" ? (
                  <CicloCard {...card} isActive={isActive} onClick={onClick} />
                ) : (
                  <Card {...card} hideDate={hideDate} isActive={isActive} onClick={onClick} />
                )}
              </motion.div>
            );
          })}
        </section>
      </div>
    </motion.section>
  );
};

export default FuncionesSection;
