import React from "react";
import Skeleton from "@/shared/components/skeleton/Skeleton.js";
import FadeIn from "@/shared/components/skeleton/FadeIn.js";

const MovieTrailer = ({ trailer }) => {
  const videoId = trailer?.split("v=")[1];

  return (
    <div className="colSection">
      <FadeIn
        loading={false}
        ready={!!trailer}
        skeleton={<Skeleton className="w-full aspect-video rounded-xl" />}
      >
        {trailer && (
          <iframe
            className="w-full aspect-video rounded-xl"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            allowFullScreen
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}
      </FadeIn>
    </div>
  );
};

export default MovieTrailer;
