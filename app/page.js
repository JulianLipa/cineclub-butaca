import Funciones from "@/shared/sections/Funciones/section.js";
import Calendario from "@/shared/sections/Calendario/section.js";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Funciones />
      <Calendario></Calendario>
    </div>
  );
}
