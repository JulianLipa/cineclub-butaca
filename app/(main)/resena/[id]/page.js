"use client";

import { useParams } from "next/navigation";

import BackButton from "@/shared/components/backButton/BackButton";
import UserBadge from "@/shared/ui/user/userBadge/UserBadge";
import StarSection from "@/shared/components/starSection/StarSection";
import Actions from "@/shared/ui/userActions/Actions";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import CommentsSection from "@/shared/sections/Comments/CommentsSection";
import { getResenaById } from "@/data/comunidad";

const Page = () => {
  const { id } = useParams();
  const resena = getResenaById(id);

  if (!resena) {
    return <div className="pt-20 bodyText">Reseña no encontrada.</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8! pb-20">
      <BackButton />

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <div className="w-[55%] max-w-[220px] shrink-0 sm:w-[200px] md:w-[240px]">
          <MovieCard tmdbId={resena.tmdbId} />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <UserBadge username={resena.username} />

          <StarSection rating={resena.rating} />

          <span className="bodyText text-[.8em] opacity-50">
            {resena.fecha}
          </span>

          <p className="bodyText text-[1em]">{resena.text}</p>

          <Actions
            icons={["like", "comentarios"]}
            values={{
              like: resena.likes,
              comentarios: resena.comentarios.length,
            }}
            variant="buttonText"
          />
        </div>
      </div>

      <div className="border-t border-(--primary) opacity-20" />

      <CommentsSection comentarios={resena.comentarios} />
    </div>
  );
};

export default Page;
