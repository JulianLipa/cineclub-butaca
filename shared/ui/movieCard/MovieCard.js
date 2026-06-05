"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MovieText from "@/shared/ui/movieCard/MovieText";
import Link from "next/link";
import style from "@/shared/ui/movieCard/movieCard.module.css";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import FadeIn from "@/shared/components/skeleton/FadeIn";

const MovieCard = ({ tmdbId, text, actionsIcons, className }) => {
  const [data, setData] = useState(null);
  const [imgReady, setImgReady] = useState(false);

  useEffect(() => {
    if (!tmdbId) return;
    fetch(`/api/movies?id=${tmdbId}&preview=true`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [tmdbId]);

  const showSkeleton = !data || (!!data.poster && !imgReady);

  return (
    <Link
      className={`flex w-full flex-col overflow-hidden rounded-xl borderButton ${className} ${style.movieCard} ${
        !text ? style.noHover : ""
      }`}
      href={`/movie/${tmdbId}`}
    >
      <FadeIn
        loading={showSkeleton}
        skeleton={
          <Skeleton className="w-full aspect-[2/3] rounded-[.5em] sm:rounded-[1em]" />
        }
      >
        {data?.poster ? (
          <Image
            src={data.poster}
            alt={data.titulo || ""}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="eager"
            onLoad={() => setImgReady(true)}
          />
        ) : data ? (
          <div className="w-full aspect-[2/3] rounded-[.5em] sm:rounded-[1em] bg-(--secondary)" />
        ) : null}
      </FadeIn>

      {text &&
        (showSkeleton ? (
          <Skeleton className="h-6 w-3/4 mx-1 mt-2" />
        ) : (
          <MovieText data={data} actionsIcons={actionsIcons} />
        ))}
    </Link>
  );
};

export default MovieCard;
