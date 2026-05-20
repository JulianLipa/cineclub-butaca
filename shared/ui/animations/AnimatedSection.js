"use client";

import { motion } from "framer-motion";

import { fadeInUp } from "@/shared/ui/animations/motionPresets";

/**
 * Wrapper que envuelve cualquier hijo con animación de entrada (fade + slide Y).
 * La animación se dispara cuando el wrapper entra al viewport y se ejecuta una sola vez.
 *
 * Uso desde page.js:
 *   <AnimatedSection>
 *     <ProxFuncionesSection />
 *   </AnimatedSection>
 *
 *   <AnimatedSection delay={0.1}>
 *     <CalendarioClubSection />
 *   </AnimatedSection>
 */
const AnimatedSection = ({ children, delay = 0, className = "" }) => (
  <motion.div {...fadeInUp(delay)} className={className}>
    {children}
  </motion.div>
);

export default AnimatedSection;
