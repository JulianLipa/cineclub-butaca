import React from "react";
import Skeleton from "@/shared/components/skeleton/Skeleton.js";
import FadeIn from "@/shared/components/skeleton/FadeIn.js";

const MovieSinopsis = ({ text, loading }) => {
  return (
    <div>
      <FadeIn
        loading={loading}
        ready={!!text}
        skeleton={
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        }
      >
        {text && <p className="bodyText">{text}</p>}
      </FadeIn>
    </div>
  );
};

export default MovieSinopsis;
