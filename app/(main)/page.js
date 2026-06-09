import FuncionesSection from "@/shared/sections/Funciones/FuncionesSection";
import CalendarioSection from "@/shared/sections/Calendario/CalendarioSection";
import PopularSection from "@/shared/sections/Popular/PopularSection";
import ReviewsSection from "@/shared/sections/Reviews/ReviewsSection";
import VoteBanner from "@/shared/sections/VoteBanner/VoteBanner";
import ListasSection from "@/shared/sections/Listas/ListasSection";
import Pricing from "@/shared/sections/Pricing/Pricing";
import Button from "@/shared/ui/button/Button";
import HeroSection from "@/shared/sections/Hero/HeroSection";
import StickyHeaderBar from "@/shared/components/header/StickyHeaderBar";

import styles from "./home.module.css";
import { funciones } from "@/data.json";

export default function Home() {
  return (
    <>
      <div className={styles.heroWrapper}>
        <HeroSection />
      </div>

      <StickyHeaderBar className={styles.headerFullBleed} />

      <div className="flex flex-col gap-10 pt-10">
        <FuncionesSection items={funciones} />
        <CalendarioSection />
        <VoteBanner />
        <ReviewsSection variant="review" title={"Reseñas destacadas"} />
        <ReviewsSection variant="tema" title={"Temas recientes"} />
        <ListasSection title={"Listas de la comunidad"} />
        <PopularSection title={"Popular entre miembros"} />

        <div className="flex justify-center w-full sm:pr-(--padding-body-desktop-w) pr-(--padding-body-mobile-w)">
          <Button variant="primary" className="w-full! sm:w-fit!">
            Ver Comunidad
          </Button>
        </div>

        <Pricing />
      </div>
    </>
  );
}
