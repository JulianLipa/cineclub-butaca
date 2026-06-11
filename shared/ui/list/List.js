"use client";

import { useRouter } from "next/navigation";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import Button from "@/shared/ui/button/Button";
import UserBadge from "@/shared/ui/user/userBadge/UserBadge";
import Actions from "@/shared/ui/userActions/Actions.js";

const List = () => {
  const router = useRouter();

  return (
    <div
      className="rounded-2xl gap-4 p-4 sm:p-8 flex cursor-pointer w-full borderButton"
      onClick={() => router.push("/lista")}
    >
      <div className="w-[30%] hidden sm:block">
        <MovieCard tmdbId={7340} interactive={false} />
      </div>

      <div className="sm:w-2/3 flex gap-4 flex-col">
        <Button variant="buttonText" className="bodyText font-[600]!">
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
