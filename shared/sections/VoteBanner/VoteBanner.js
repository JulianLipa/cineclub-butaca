import React from "react";

import Button from "@/shared/ui/button/Button";
import { funciones as movies } from "@/data.json";
import MovieCard from "@/shared/ui/movieCard/movieCard";

const VoteBanner = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full border border-solid border-(--primary) rounded-xl sm:p-15 p-8 gap-4">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:w-1/2">
        <div className="flex flex-col h-fit">
          <p className="font-[600] text-[40px] sm:text-[80px] leading-none tracking-tight">
            Votá que película
          </p>
          <p className="font-[300] text-[40px] sm:text-[80px] leading-none tracking-tight">
            vamos a ver
          </p>
        </div>

        <div className="flex gap-2 w-fit">
          <Button variant="primary">Quiero votar</Button>
          <Button variant="secondary">Comunidad</Button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex gap-4 w-full sm:w-1/2 overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-xl">
        {movies.map(
          (movie, index) =>
            index < 3 && (
              <div
                key={index}
                className="flex-shrink-0 snap-start sm:w-1/3"
              >
                <MovieCard
                  text={true}
                  actionsIcons={["like", "eye", "comentarios"]}
                  data={movie}
                />
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default VoteBanner;
