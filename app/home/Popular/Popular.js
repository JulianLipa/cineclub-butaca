"use client";

import { motion } from "framer-motion";

import MovieCard from "@/shared/ui/movieCard/movieCard";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarrouselHandler from "@/shared/components/carrouselHandler/CarrouselHandler";

import { useCarousel } from "@/shared/hooks/useCarousel";
import { fadeIn } from "@/shared/ui/animations/motionPresets";

const MOVIES = Array.from({ length: 10 }, (_, i) => i);

const Popular = () => {
  const { activeIndex, cardsRef, containerRef, handlePrev, handleNext } =
    useCarousel({
      itemsLength: MOVIES.length,
      initialIndex: 0,
    });

  return (
    <motion.section {...fadeIn} className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <SectionTitleIcon icon="like">Popular entre miembros</SectionTitleIcon>

        <CarrouselHandler
          totalItems={MOVIES.length}
          activeIndex={activeIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          isPaginatorActive={false}
        />
      </div>

      <div
        ref={containerRef}
        className="carousel w-full snap-x snap-mandatory overflow-x-auto"
      >
        <section className="flex gap-4 pb-2">
          {MOVIES.map((movie, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="snap-start shrink-0 w-[90%] sm:w-auto"
            >
              <MovieCard />
            </div>
          ))}
        </section>
      </div>
    </motion.section>
  );
};

export default Popular;
