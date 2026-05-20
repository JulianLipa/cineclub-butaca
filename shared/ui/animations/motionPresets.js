/**
 * Presets de animaciones para usar con framer-motion.
 *
 * Usan `whileInView` para que la animación se dispare cuando el elemento
 * entra al viewport. `viewport.once: true` → corre una sola vez.
 *
 * Para items dentro de un contenedor scrolleable (ej. carrusel horizontal),
 * pasar `root` con la ref del contenedor — así el IntersectionObserver mide
 * la visibilidad dentro de ese contenedor, no del viewport del browser.
 *
 * Uso:
 *   // Sección entera, observa viewport del browser
 *   <motion.section {...fadeIn}>
 *
 *   // Item suelto en página, observa viewport del browser
 *   <motion.div {...fadeInUp({ delay: 0.1 })}>
 *
 *   // Item dentro de carrusel horizontal, observa el contenedor
 *   <motion.div {...fadeInUp({ delay: i * 0.05, root: containerRef })}>
 */

const easing = [0.22, 1, 0.36, 1]; // ease-out suave

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.4, ease: easing },
};

export const fadeInUp = ({ delay = 0, root, amount = 0.3 } = {}) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount, root },
  transition: { delay, duration: 0.45, ease: easing },
});
