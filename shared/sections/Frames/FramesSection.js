"use client";

import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import FrameCard from "@/shared/ui/frameCard/FrameCard";

const FRAMES = [
  { img: "/imgs/frame-godfather-HQ.webp", movieTitle: "El Padrino", anio: 1972, tmdbId: 238, caption: "La escena más icónica del cine. Ese silencio lo dice todo.", username: "ana_cine" },
  { img: "/imgs/frame-godfather.webp", movieTitle: "El Padrino", anio: 1972, tmdbId: 238, caption: "La luz de Gordon Willis hace magia acá.", username: "pepe_films" },
  { img: "/imgs/frame.jpg", movieTitle: "Carrie", anio: 1976, tmdbId: 8077, caption: "Un frame que resume toda la película en un segundo.", username: "sofi_vhs" },
  { img: "/imgs/frame-godfather-HQ.webp", movieTitle: "El Padrino", anio: 1972, tmdbId: 238, username: "martin_b" },
  { img: "/imgs/frame.jpg", movieTitle: "Carrie", anio: 1976, tmdbId: 8077, caption: "La composición acá es perfecta.", username: "luci_k" },
];

const FramesSection = () => (
  <CarouselSection
    title="Frames de la semana"
    icon="eye"
    items={FRAMES}
    renderItem={(frame) => <FrameCard data={frame} />}
    breakpoints={{
      0: { slidesPerView: 1.2, spaceBetween: 12 },
      640: { slidesPerView: 2.2, spaceBetween: 16 },
      1024: { slidesPerView: 3.2, spaceBetween: 16 },
    }}
  />
);

export default FramesSection;
