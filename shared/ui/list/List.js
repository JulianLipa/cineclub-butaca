"use client";

import { useRouter } from "next/navigation";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import Button from "@/shared/ui/button/Button";
import UserBadge from "@/shared/ui/user/userBadge/UserBadge";
import Actions from "@/shared/ui/userActions/Actions.js";

const List = ({ id, title, description, username, cover, movies = [] }) => {
  const router = useRouter();

  return (
    <div
      className="rounded-2xl gap-4 p-4 sm:p-8 flex cursor-pointer w-full borderButton"
      onClick={() => router.push(`/lista/${id}`)}
    >
      <div className="w-[30%] hidden sm:block">
        <MovieCard tmdbId={cover} interactive={false} />
      </div>

      <div className="sm:w-2/3 flex gap-4 flex-col">
        <Button variant="buttonText" className="bodyText font-[600]!">
          {title}
        </Button>

        <UserBadge username={username} />

        <p className="font-[500]! bodyText">{movies.length} Películas</p>

        <p className="bodyText">{description}</p>

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
