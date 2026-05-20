"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useCarousel = ({ itemsLength }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef([]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? itemsLength - 1 : prev - 1));
  }, [itemsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === itemsLength - 1 ? 0 : prev + 1));
  }, [itemsLength]);

  const handleCardClick = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    const activeCard = cardsRef.current[activeIndex];
    const container = containerRef.current;
    if (!activeCard || !container) return;

    const cardLeft = activeCard.getBoundingClientRect().left - container.getBoundingClientRect().left + container.scrollLeft;

    container.scrollTo({
      left: cardLeft,
      behavior: "smooth",
    });
  }, [activeIndex]);

  return {
    activeIndex,
    cardsRef,
    containerRef,
    handlePrev,
    handleNext,
    handleCardClick,
  };
};
