"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import UserBadge from "@/shared/ui/user/userBadge/UserBadge";
import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import PopularSection from "@/shared/sections/Popular/PopularSection";
import VoteBanner from "@/shared/sections/VoteBanner/VoteBanner";
import ReviewsSection from "@/shared/sections/Reviews/ReviewsSection";
import ListasSection from "@/shared/sections/Listas/ListasSection";
import AhoraViendo from "@/shared/sections/AhoraViendo/AhoraViendo";
import FramesSection from "@/shared/sections/Frames/FramesSection";

const miembros = [
  { username: "ana_cine" },
  { username: "pepe_films" },
  { username: "luci_k" },
  { username: "martin_b" },
  { username: "sofi_vhs" },
  { username: "tomas_r" },
  { username: "vale_m" },
  { username: "nico_d" },
  { username: "juli_c" },
  { username: "ro_v" },
  { username: "fede_z" },
  { username: "clau_p" },
];

const ComunidadPageWrapper = () => {
  const { setHasPaddingTop } = useLayout();

  useEffect(() => {
    setHasPaddingTop(false);
    return () => setHasPaddingTop(true);
  }, [setHasPaddingTop]);

  return (
    <div>
      <div className="w-full sectionMain bg-(--secondary) sm:pt-(--padding-body-desktop) pt-(--padding-body-mobile)">
        <SectionTitleIcon icon="comunidad" iconVariant="default" size="h-[5em]">
          Comunidad
        </SectionTitleIcon>
      </div>

      <div className="sectionMain pt-20 gap-10! flex flex-col">
        <CarouselSection
          title="Miembros destacados"
          items={miembros}
          renderItem={(miembro) => <UserBadge variant="vertical" username={miembro.username} />}
          breakpoints={{
            0: { slidesPerView: 3.3, spaceBetween: 8 },
            640: { slidesPerView: 5.5, spaceBetween: 8 },
            1024: { slidesPerView: 10, spaceBetween: 8 },
          }}
        />

        <AhoraViendo />

        <FramesSection />

        <ReviewsSection variant="review" title={"Reseñas destacadas"} />

        <ReviewsSection variant="tema" title={"Temas recientes"} />

        <VoteBanner />

        <ListasSection title={"Nuestra selección"} />

        <PopularSection title={"Popular entre miembros"} />
      </div>
    </div>
  );
};

export default ComunidadPageWrapper;
