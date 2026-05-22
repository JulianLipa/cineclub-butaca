import Funciones from "@/shared/sections/Funciones/section.js";
import Calendario from "@/shared/sections/Calendario/section.js";
import Popular from "@/shared/sections/Popular/section.js";
import Reviews from "@/shared/sections/Reviews/section.js";
import VoteBanner from "@/shared/sections/VoteBanner/VoteBanner";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Funciones />
      <Calendario />
      <VoteBanner />
      <Reviews />
      <Popular />
    </div>
  );
}
