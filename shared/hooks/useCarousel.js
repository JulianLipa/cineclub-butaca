"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

// useLayoutEffect en cliente, useEffect en server (evita warnings en SSR)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const useCarousel = ({ itemsLength, initialIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const cardsRef = useRef([]);
  const containerRef = useRef(null);
  const isMounted = useRef(false);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? itemsLength - 1 : prev - 1));
  }, [itemsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === itemsLength - 1 ? 0 : prev + 1));
  }, [itemsLength]);

  const handleCardClick = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  // Corre antes del paint → el scroll inicial ya está aplicado cuando el browser dibuja
  useIsomorphicLayoutEffect(() => {
    const activeCard = cardsRef.current[activeIndex];
    const container = containerRef.current;
    if (!activeCard || !container) return;

    const cardLeft =
      activeCard.getBoundingClientRect().left -
      container.getBoundingClientRect().left +
      container.scrollLeft;

    container.scrollTo({
      left: cardLeft,
      behavior: isMounted.current ? "smooth" : "instant",
    });

    isMounted.current = true;
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
