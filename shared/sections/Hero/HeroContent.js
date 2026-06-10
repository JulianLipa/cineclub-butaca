"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/shared/ui/button/Button";

const HeroContent = () => {
  const [small, setSmall] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSmall(true), 5000);
    return () => {
      clearTimeout(t1);
    };
  }, []);

  const fontSize = small ? "40px" : "clamp(40px, 8vw, 100px)";
  const fontTransition = { duration: 1.5, ease: "easeInOut" };

  return (
    <div className="relative z-10 flex flex-col gap-6 px-(--padding-body-mobile-w) sm:px-(--padding-body-desktop-w) pb-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col gap-2"
      >
        {["El cine", "como experiencia", "compartida."].map((line, i) => (
          <motion.p
            key={line}
            animate={{ fontSize }}
            transition={fontTransition}
            className={`leading-none tracking-tight text-(--white) ${i === 1 ? "font-[600]" : "font-[300]"}`}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>

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
