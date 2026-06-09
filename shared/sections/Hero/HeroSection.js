"use client";

import { motion } from "framer-motion";
import Button from "@/shared/ui/button/Button";

const HeroSection = () => {
  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <div className="relative z-10 flex flex-col gap-6 px-(--padding-body-mobile-w) sm:px-(--padding-body-desktop-w) pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-2"
        >
          <p className="font-[300] text-[clamp(40px,8vw,100px)] leading-none tracking-tight text-(--primary)">
            El cine
          </p>
          <p className="font-[600] text-[clamp(40px,8vw,100px)] leading-none tracking-tight text-(--primary)">
            como experiencia
          </p>
          <p className="font-[300] text-[clamp(40px,8vw,100px)] leading-none tracking-tight text-(--primary)">
            compartida.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex gap-3 flex-wrap"
        >
          <Button variant="primary" href="/funciones">
            Próximas funciones
          </Button>
          <Button variant="secondary" href="/comunidad">
            El Jockey, 2024 (Dir. Luis Ortega)
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
