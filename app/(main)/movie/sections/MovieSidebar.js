import MovieCard from "@/shared/ui/movieCard/MovieCard";
import CardDetails from "@/shared/ui/card/CardDetails";
import Button from "@/shared/ui/button/Button";
import Skeleton from "@/shared/components/skeleton/Skeleton.js";
import FadeIn from "@/shared/components/skeleton/FadeIn.js";
import EventRow from "@/shared/sections/Calendario/EventRow.js";
import { parseScreeningDate, dateToISO } from "@/lib/dates";
import style from "../movie.module.css";

const MovieSidebar = ({ data, loading, date }) => {
  const d = date ? dateToISO(parseScreeningDate(date)) : null;
  return (
    <div className="w-full sm:w-[30%] sm:min-w-[200px] sm:sticky top-(--header-height) sm:max-h-svh rounded-3xl sm:-mt-40 flex flex-col gap-4 sm:px-4 sm:overflow-y-auto sm:pr-(--padding-body-desktop-w) pr-(--padding-body-mobile-w)">
      {/* Poster */}
      <div className="w-[55%] sm:w-[180px] sm:shrink-0 bg-(--white) rounded-3xl sm:p-4 sm:-ml-4">
        <FadeIn
          loading={loading}
          skeleton={<Skeleton className="w-full aspect-[2/3] rounded-3xl" />}
        >
          <MovieCard tmdbId={data?.tmdbId} />
        </FadeIn>
      </div>

      <div className="w-full flex flex-col gap-4">
        {/* Puntajes */}
        <div className="order-last sm:order-none w-full">
          <FadeIn
            loading={loading}
            skeleton={
              <div className="flex gap-4">
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
              </div>
            }
          >
            <div className="flex sm:flex-wrap gap-4 w-full sm:w-auto">
              <Button
                variant="socialMovieIcon"
                img="rotten"
                className="text-[.7em] sm:text-[.8em] font-light flex-1 sm:flex-none justify-center w-full! sm:w-fit! flex-col sm:flex-row gap-1! sm:gap-2!"
              >
                2.4
              </Button>
              <Button
                variant="socialMovieIcon"
                img="letterboxd"
                className="text-[.7em] sm:text-[.8em] font-light flex-1 sm:flex-none justify-center w-full! sm:w-fit! flex-col sm:flex-row gap-1! sm:gap-2!"
              >
                2.4
              </Button>
              <Button
                variant="socialMovieIcon"
                img="imdb"
                className="text-[.7em] sm:text-[.8em] font-light flex-1 sm:flex-none justify-center w-full! sm:w-fit! flex-col sm:flex-row gap-1! sm:gap-2!"
              >
                2.4
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* Título */}
        <FadeIn
          loading={loading}
          ready={!!data}
          skeleton={<Skeleton className="h-8 w-3/4" />}
        >
          {data && <h1 className="font-[600] text-[20px] sm:text-[24px]">{data.titulo}</h1>}
        </FadeIn>

        {/* Director */}
        <FadeIn
          loading={loading}
          ready={!!data}
          skeleton={<Skeleton className="h-5 w-1/2" />}
        >
          {data && (
            <h2 className="font-[300] text-[16px]">
              Dir. {data.director?.nombre}
            </h2>
          )}
        </FadeIn>

        {/* Detalles + En cartelera (mobile) */}
        <FadeIn
          loading={loading}
          ready={!!data}
          skeleton={<Skeleton className="h-10 w-full" />}
        >
          {data && (
            <div className="flex flex-col gap-4">
              <CardDetails
                duration={data.duracion}
                country={data.paisProduccion?.[0] ?? "No disponible"}
                year={data.anio}
                className="m-0!"
              />
              {d && (
                <div className={`${style.eventActionDiv} sm:hidden`}>
                  <EventRow
                    date={d}
                    event={"En cartelera"}
                    isPastMonth={false}
                    className="text-[.9em]!"
                  />
                </div>
              )}
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  );
};

export default MovieSidebar;
