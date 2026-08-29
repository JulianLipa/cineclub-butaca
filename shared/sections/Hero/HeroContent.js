"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/shared/ui/button/Button";

// Animación palabra por palabra: cada palabra cae desde abajo apareciendo
// con opacidad y saliendo del desenfoque, de forma escalonada.
const WORD_STAGGER = 0.09;
const WORD_DELAY = 0.1;

const AnimatedLine = ({ text, className, startIndex = 0 }) => (
  <span className={`block ${className}`}>
    {text.split(" ").map((word, i) => (
      <motion.span
        key={`${word}-${i}`}
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: WORD_DELAY + (startIndex + i) * WORD_STAGGER,
        }}
        className="inline-block mr-[0.25em]"
        style={{ willChange: "transform, filter, opacity" }}
      >
        {word}
      </motion.span>
    ))}
  </span>
);

const HeroContent = () => {
  const [small, setSmall] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 600px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setSmall(true), 5000);
    return () => {
      clearTimeout(t1);
    };
  }, []);

  const fontSize = small
    ? isMobile
      ? "1.5rem"
      : "40px"
    : isMobile
      ? "40px"
      : "clamp(40px, 8vw, 100px)";

  return (
    <div className="relative z-10 flex flex-col gap-6 px-(--padding-body-mobile-w) sm:px-(--padding-body-desktop-w) py-(--padding-body-mobile) sm:py-(--padding-body-desktop)">
      <div
        style={{ fontSize, transition: "font-size .5s ease", lineHeight: 1.15 }}
        className="tracking-tight text-(--hero-white)"
      >
        <AnimatedLine
          text="El cine que te marca,"
          className="font-[300]"
          startIndex={0}
        />
        <AnimatedLine
          text="analizado entre amigos"
          className="font-[600]"
          startIndex={5}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="flex gap-2 flex-wrap"
      >
        <Button variant="primary" href="/funciones">
          Próximas funciones
        </Button>
        <Button variant="terciary" href="/movie/1104937">
          El Jockey, 2024 (Dir. Luis Ortega)
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroContent;
