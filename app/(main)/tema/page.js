import ComunidadList from "@/shared/sections/Comunidad/ComunidadList";
import { temas } from "@/data/comunidad";

const Page = () => (
  <ComunidadList title="Temas" icon="triangle" variant="tema" items={temas} />
);

export default Page;
