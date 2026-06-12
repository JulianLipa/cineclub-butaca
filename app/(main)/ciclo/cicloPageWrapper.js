"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLayout } from "@/contexts/LayoutContext";

import MovieHero from "@/app/(main)/movie/sections/MovieHero";
import BackButton from "@/shared/components/backButton/BackButton";
import Button from "@/shared/ui/button/Button";
import MovieCard from "@/shared/ui/movieCard/MovieCard";

const MovieRow = ({ tmdbId, index }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!tmdbId) return;
    fetch(`/api/movies?id=${tmdbId}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [tmdbId]);

  return (
    <Link
      href={`/movie/${tmdbId}`}
      className="flex items-center gap-4 py-3 border-b border-(--primary)/20 hover:opacity-70"
    >
      <span className="bodyText font-[500]! w-6 shrink-0 opacity-50 text-right">{index + 1}</span>
      <div className="w-10 shrink-0 rounded-md overflow-hidden aspect-[2/3] bg-(--secondary)">
        {data?.poster && (
          <Image
            src={data.poster}
            alt={data.titulo ?? ""}
            width={40}
            height={60}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="bodyText font-[600]! truncate">{data?.titulo ?? "—"}</p>
        <p className="bodyText opacity-60 truncate">
          {data?.director?.nombre ?? "—"}{data?.anio ? ` · ${data.anio}` : ""}
        </p>
      </div>
    </Link>
  );
};

const CicloPageWrapper = ({ ciclo }) => {
  const { setHasPaddingTop } = useLayout();
  const [view, setView] = useState("grid");

  const movies = ciclo?.movies ?? [];

  useEffect(() => {
    setHasPaddingTop(false);
    return () => setHasPaddingTop(true);
  }, [setHasPaddingTop]);

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
