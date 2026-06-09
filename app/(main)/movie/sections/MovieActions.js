import Actions from "@/shared/ui/userActions/Actions";

import EventRow from "@/shared/sections/Calendario/EventRow.js";
import style from "../movie.module.css";
import { parseScreeningDate, dateToISO } from "@/lib/dates";

const MovieActions = ({ date }) => {
  const d = date ? dateToISO(parseScreeningDate(date)) : null;
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 items-center sm:items-start pr-(--padding-body-mobile-w)">
      {d && (
        <div className={`${style.eventActionDiv} sm:block hidden`}>
          <EventRow
            date={d}
            event={"En cartelera"}
            isPastMonth={false}
            isMovieAction={true}
          />
        </div>
      )}

      <Actions
        icons={["eye", "like", "comentarios", "star"]}
        className="text-[.9em]! sm:w-fit gap-2"
        divClassname="sm:w-fit h-full"
        variant="secondary"
      />
    </div>
  );
};

export default MovieActions;
