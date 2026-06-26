"use client";

import { useState } from "react";
import MovieHero from "@/app/(main)/movie/sections/MovieHero";
import BackButton from "@/shared/components/backButton/BackButton";
import Button from "@/shared/ui/button/Button";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import MovieRow from "@/shared/ui/movieCard/MovieRow";
import { useHeroLayout } from "@/shared/hooks/useHeroLayout";

const CicloPageWrapper = ({ ciclo }) => {
  useHeroLayout();
  const [view, setView] = useState("grid");
  const movies = ciclo?.movies ?? [];

  return (
    <div>
      <MovieHero img={ciclo?.frame} className="block" />

      <div className="sectionMain flex justify-start pb-0! md:mt-10">
        <BackButton />
      </div>

      <div className="sectionMain flex flex-col gap-6! md:mt-4">
        <h1 className="text-[1.5rem]! sm:text-[2rem]! font-[700]!">{ciclo?.title}</h1>

        <p className="bodyText font-[500]!">{movies.length} Películas</p>

        <p className="bodyText">{ciclo?.description}</p>
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

export default CicloPageWrapper;
