import Actions from "@/shared/ui/userActions/Actions";

import EventRow from "@/shared/sections/Calendario/EventRow.js";
import style from "../movie.module.css";

const MovieActions = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4">
      <Actions
        icons={["eye", "like", "comentarios", "star"]}
        className="text-[.9em]! sm:w-fit px-[2.5em]! gap-2 sm:px-[1em]!"
        divClassname="w-full sm:w-fit flex justify-between"
        variant="secondary"
      />

      <div className={`${style.eventActionDiv} sm:block hidden`}>
        <EventRow
          date={"2026-05-02"}
          event={"En cartelera"}
          isPastMonth={false}
          isMovieAction={true}
        />
      </div>
    </div>
  );
};

export default MovieActions;
