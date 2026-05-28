import React from "react";
import Image from "next/image";

import MovieText from "@/shared/ui/movieCard/movieText";
import Link from "next/link";

import style from "@/shared/ui/movieCard/movieCard.module.css";

const MovieCard = ({ data, text, actionsIcons }) => {
  return (
    <Link
      className={`flex w-full flex-col overflow-hidden rounded-xl ${style.movieCard} ${
        !text ? style.noHover : ""
      }`}
      href={"/movie"}
    >
      <Image
        src="/imgs/carrie-img.jpg"
        alt="Carrie"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full rounded-[.5em] sm:rounded-[1em]"
      />

      {text && <MovieText data={data} actionsIcons={actionsIcons} />}
    </Link>
  );
};

export default MovieCard;
