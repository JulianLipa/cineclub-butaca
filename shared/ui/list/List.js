import MovieCard from "@/shared/ui/movieCard/MovieCard";
import Button from "@/shared/ui/button/Button";
import UserBadge from "@/shared/ui/user/userBadge/UserBadge";
import Actions from "@/shared/ui/userActions/Actions.js";

const List = () => {
  return (
    <div className="rounded-2xl border-1 border-(--primary) gap-4 p-4 sm:p-8 flex sm:hover:bg-(--primary-opacidad) cursor-pointer w-full">
      <div className="w-1/3">
        <MovieCard tmdbId={7340} text={false}></MovieCard>
      </div>

      <div className="w-2/3 flex gap-2 flex-col">
        <Button variant="buttonText" className="font-[600]!">
          Lista
        </Button>

        <UserBadge />

        <p className="font-[500]! bodyText">11 Películas</p>

        <p className="bodyText">
          Es un clásico del terror psicológico con un final muy fuerte. No es
          solo miedo, es tristeza y rabia acumulada.
        </p>

        <Actions
          icons={["eye", "like", "comentarios"]}
          className="text-[.9em]"
          variant="buttonText"
        />
      </div>
    </div>
  );
};

export default List;
