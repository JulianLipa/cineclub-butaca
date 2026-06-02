import FuncionesSection from "@/shared/sections/Funciones/FuncionesSection";
import CalendarioSection from "@/shared/sections/Calendario/CalendarioSection";
import PopularSection from "@/shared/sections/Popular/PopularSection";
import ReviewsSection from "@/shared/sections/Reviews/ReviewsSection";
import VoteBanner from "@/shared/sections/VoteBanner/VoteBanner";
import ListasSection from "@/shared/sections/Listas/ListasSection";
import Pricing from "@/shared/sections/Pricing/Pricing";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <FuncionesSection />
      <CalendarioSection />
      <VoteBanner />
      <ReviewsSection />
      <ListasSection />
      <PopularSection />
      <Pricing />
    </div>
  );
}
