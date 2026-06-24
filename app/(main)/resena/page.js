import ComunidadList from "@/shared/sections/Comunidad/ComunidadList";
import { resenas } from "@/data/comunidad";

const Page = () => (
  <ComunidadList
    title="Reseñas"
    icon="comillas"
    variant="review"
    items={resenas}
  />
);

export default Page;
