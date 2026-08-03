"use client";

import { useState } from "react";
import MovieHero from "@/app/(main)/movie/sections/MovieHero";
import BackButton from "@/shared/components/backButton/BackButton";
import Button from "@/shared/ui/button/Button";
import UserBadge from "@/shared/ui/user/userBadge/UserBadge";
import Actions from "@/shared/ui/userActions/Actions";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import MovieRow from "@/shared/ui/movieCard/MovieRow";
import { useHeroLayout } from "@/shared/hooks/useHeroLayout";
import { useMovieData } from "@/shared/hooks/useMovieData";

const MOCK_MOVIES = [7340, 539, 238, 19460, 155];

const ListaPageWrapper = ({ lista }) => {
  useHeroLayout();
  const [view, setView] = useState("grid");

  const title = lista?.title ?? "Lista";
  const description =
    lista?.description ?? "Lista de películas para ver en MUBI.";
  const username = lista?.username;
  const movies = lista?.movies ?? MOCK_MOVIES;
  const movieCount = movies.length;

  const heroId = lista?.cover ?? movies[0];
  const firstMovieData = useMovieData(heroId, true);
  const heroFrame = firstMovieData?.frame ?? null;

  return (
    <div>
      <MovieHero img={heroFrame} className="block" />

      <div className="sectionMain flex justify-start pb-0! md:mt-10">
        <BackButton />
      </div>

      <div className="sectionMain flex flex-col gap-6! md:mt-4">
        <h1 className="text-[1.5rem]! sm:text-[2rem]! font-[700]!">{title}</h1>

        <UserBadge username={username} />

        <p className="bodyText font-[500]!">{movieCount} Películas</p>

        <p className="bodyText">{description}</p>

        <Actions
          icons={["eye", "like", "comentarios"]}
          className="text-[.9em]"
          variant="buttonText"
        />
      </div>

      <div className="sectionMain flex flex-col gap-6!">
        <div className="flex items-center justify-between">
          <h2 className="text-[1.1rem]! font-[700]!">Películas</h2>
          <div className="flex gap-2">
            <Button
              variant={view === "grid" ? "primary" : "secondary"}
              onClick={() => setView("grid")}
              icon="grid"
              className="w-10! justify-center!"
            />
            <Button
              variant={view === "list" ? "primary" : "secondary"}
              onClick={() => setView("list")}
              icon="list"
              className="w-10! justify-center!"
            />
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((id, i) => (
              <MovieCard key={i} tmdbId={id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {movies.map((id, i) => (
              <MovieRow key={id} tmdbId={id} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaPageWrapper;
