"use client";

import { motion } from "framer-motion";

import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import CarrouselHandler from "@/shared/components/carrouselHandler/CarrouselHandler";
import MonthCard from "./MonthCard";
import Icon from "@/shared/components/icon/Icon";
import Button from "@/shared/ui/button/Button";

import { useCarousel } from "@/shared/hooks/useCarousel";
import { fadeIn } from "@/shared/ui/animations/motionPresets";
import { eventos as events } from "@/data.json";

import style from "./MonthCard.module.css";

const MONTHS = Array.from({ length: 12 }, (_, i) => i);

const CalendarioClubSection = () => {
  const today = new Date();

  const year = today.getFullYear();

  const { activeIndex, cardsRef, containerRef, handlePrev, handleNext } =
    useCarousel({
      itemsLength: MONTHS.length,
      initialIndex: today.getMonth(),
    });

  return (
    <motion.section {...fadeIn} className="flex w-full flex-col gap-5">
      <div className="flex w-full items-center justify-between">
        <SectionTitleIcon icon="calendario">
          Calendario del club
        </SectionTitleIcon>

        <CarrouselHandler
          totalItems={MONTHS.length}
          activeIndex={activeIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          isPaginatorActive={false}
        />
      </div>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 carousel"
      >
        {MONTHS.map((monthIndex) => {
          const monthEvents = Object.entries(events).filter(([date]) => {
            const eventDate = new Date(date);

            return (
              eventDate.getMonth() === monthIndex &&
              eventDate.getFullYear() === year
            );
          });

          return (
            <div
              key={monthIndex}
              ref={(el) => {
                cardsRef.current[monthIndex] = el;
              }}
              className="flex snap-center flex-col gap-3"
            >
              <MonthCard
                year={year}
                monthIndex={monthIndex}
                today={today}
                events={events}
              />

              {/* Eventos */}
              <div className="flex flex-col gap-2">
                {monthEvents.map(([date, event]) => {
                  const day = new Date(date).getDate();

                  return (
                    <div
                      key={date}
                      className="flex items-center gap-2 text-xs border-[var(--touchable)]!"
                    >
                      <button
                        className={`${style.dayBox} ${style.event} ${style.event2} w-auto h-full! button seecondary`}
                      >
                        {day}
                        {event && <span className={style.eventIndicator} />}
                      </button>

                      <Button variant="secondary">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-full">
                            <Icon
                              name={
                                event.type === "cycle" ? "circle" : "triangle"
                              }
                              variant="default"
                            ></Icon>
                          </div>
                          {event.title}
                        </div>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default CalendarioClubSection;
