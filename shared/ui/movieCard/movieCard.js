import React from "react";
import Image from "next/image";

import MovieText from "@/shared/ui/movieCard/movieText";

import style from "@/shared/ui/movieCard/movieCard.module.css";

const MovieCard = ({ data, text, actionsIcons }) => {
  return (
    <div
      className={`flex w-fit sm:w-full flex-col overflow-hidden rounded-xl ${style.movieCard} ${
        !text ? style.noHover : ""
      }`}
    >
      <Image
        src="/imgs/carrie-img.jpg"
        alt="Carrie"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full rounded-xl"
      />

      {text && <MovieText data={data} actionsIcons={actionsIcons} />}
    </div>
  );
};

export default MovieCard;
