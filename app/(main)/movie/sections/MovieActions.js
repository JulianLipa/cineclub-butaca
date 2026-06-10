import Actions from "@/shared/ui/userActions/Actions";

import EventRow from "@/shared/sections/Calendario/EventRow.js";
import style from "../movie.module.css";
import { parseScreeningDate, dateToISO } from "@/lib/dates";

const MovieActions = ({ date }) => {
  const d = date ? dateToISO(parseScreeningDate(date)) : null;
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 items-center sm:items-start pr-(--padding-body-mobile-w)">
      {d && (
        <div className={`${style.eventActionDiv} hidden sm:block sm:w-auto`}>
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
        className="text-[.9em]! sm:w-fit flex-1 sm:flex-none justify-center flex-col sm:flex-row gap-1! sm:gap-2!"
        divClassname="w-full sm:w-fit sm:flex-wrap h-full"
        variant="secondary"
      />
    </div>
  );
};

export default MovieActions;
