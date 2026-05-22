import React from "react";
import Image from "next/image";

import MovieText from "@/shared/ui/movieCard/movieText";

import style from "@/shared/ui/movieCard/movieCard.module.css";

const MovieCard = ({ title = "default" }) => {
  return (
    <div
      className={`flex w-[160px] flex-col overflow-hidden rounded-xl gap-2 ${style.movieCard}`}
    >
      <Image
        src="/imgs/carrie-img.jpg"
        alt="Carrie"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full rounded-xl"
      />
      <MovieText title={title}></MovieText>
    </div>
  );
};

export default MovieCard;
