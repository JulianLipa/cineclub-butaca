"use client";

import { useState } from "react";
import Image from "next/image";
import MovieText from "@/shared/ui/movieCard/MovieText";
import Link from "next/link";
import style from "@/shared/ui/movieCard/movieCard.module.css";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import FadeIn from "@/shared/components/skeleton/FadeIn";
import { useMovieData } from "@/shared/hooks/useMovieData";

const MovieCard = ({
  tmdbId,
  text,
  interactive = true,
  actionsIcons,
  className,
}) => {
  const data = useMovieData(tmdbId, true);
  const [imgReady, setImgReady] = useState(false);

  const showSkeleton = !data || (!!data.poster && !imgReady);

  return (
    <Link
      className={`flex w-full flex-col overflow-hidden rounded-xl borderButton ${className} ${style.movieCard} ${
        !interactive ? style.noHover : ""
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
