import Actions from "@/shared/ui/userActions/Actions";

import EventRow from "@/shared/sections/Calendario/EventRow.js";
import style from "../movie.module.css";
import { parseScreeningDate, dateToISO } from "@/lib/dates";

const MovieActions = ({ date }) => {
  const d = dateToISO(parseScreeningDate(date)); // "23/12/26" → "2026-12-23"
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
          date={d}
          event={"En cartelera"}
          isPastMonth={false}
          isMovieAction={true}
        />
      </div>
    </div>
  );
};

export default MovieActions;
