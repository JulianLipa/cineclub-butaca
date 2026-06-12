import Image from "next/image";
import Link from "next/link";
import Button from "@/shared/ui/button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";

const NewsCard = ({ data }) => {
  const { id, img, titulo, copete, descripcion, tematicas } = data;

  return (
    <div className="flex flex-col max-[600px]:flex-col sm:flex-row w-full rounded-2xl overflow-hidden [box-shadow:inset_0_0_0_1px_var(--primary)] hover:scale-[0.98] hover:cursor-pointer transition-transform duration-200">
      {/* Imagen */}
      <div className="relative max-[600px]:w-full max-[600px]:h-[200px] sm:w-[38%] sm:shrink-0 sm:min-h-[200px]">
        <Image
          src={img}
          alt={titulo}
          fill
          sizes="(max-width: 600px) 100vw, 40vw"
          className="object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-3 p-4 sm:p-6 flex-1 min-w-0">
        <p className="bodyText font-[700]! text-[1em] leading-snug line-clamp-2">
          {titulo}
        </p>

        <p className="bodyText text-[.85em] font-[500]! opacity-70 line-clamp-2">
          {copete}
        </p>

        {/* Chips de temáticas */}
        <div className="relative">
          <Swiper
            modules={[FreeMode]}
            freeMode
            slidesPerView="auto"
            spaceBetween={6}
            className="w-full !overflow-visible"
          >
            {tematicas.map((t) => (
              <SwiperSlide key={t} className="!w-auto">
                <span className="shrink-0 text-[.72em] font-[500] px-2.5 py-1 rounded-full border border-(--primary) opacity-70">
                  {t}
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <p className="bodyText text-[.8em] opacity-60 line-clamp-3 flex-1">
          {descripcion}
        </p>

        <Button variant="secondary" href={`/noticia/${id}`} className="w-fit! text-[.85em]!">
          Leer nota
        </Button>
      </div>
    </div>
  );
};

export default NewsCard;
