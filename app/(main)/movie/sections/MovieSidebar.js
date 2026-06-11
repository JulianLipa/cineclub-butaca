import MovieCard from "@/shared/ui/movieCard/MovieCard";
import CardDetails from "@/shared/ui/card/CardDetails";
import Button from "@/shared/ui/button/Button";
import Skeleton from "@/shared/components/skeleton/Skeleton.js";
import FadeIn from "@/shared/components/skeleton/FadeIn.js";
import EventRow from "@/shared/sections/Calendario/EventRow.js";
import { parseScreeningDate, dateToISO } from "@/lib/dates";
import Image from "next/image";
import style from "../movie.module.css";

const MovieSidebar = ({ data, loading, date }) => {
  const d = date ? dateToISO(parseScreeningDate(date)) : null;
  return (
    <div className="w-full sm:w-[30%] sm:min-w-[200px] sm:sticky top-(--header-height) sm:max-h-svh rounded-3xl sm:-mt-40 flex flex-col gap-4 sm:px-4 sm:overflow-y-auto sm:pr-(--padding-body-desktop-w)">
      {/* Mobile: row (poster + info) | Desktop: col */}
      <div className="flex flex-row sm:flex-col gap-4">
        {/* Poster */}
        <div className="w-[30%] sm:w-[180px] sm:shrink-0 bg-(--white) rounded-3xl sm:p-4 sm:-ml-4">
          <FadeIn
            loading={loading}
            skeleton={<Skeleton className="w-full aspect-[2/3] rounded-3xl" />}
          >
            <MovieCard tmdbId={data?.tmdbId} interactive={false} />
          </FadeIn>
        </div>

        {/* Título + Director + Detalles */}
        <div className="flex-1 sm:w-full flex flex-col gap-4 justify-center">
          <FadeIn
            loading={loading}
            ready={!!data}
            skeleton={<Skeleton className="h-8 w-3/4" />}
          >
            {data && (
              <h1 className="font-[600] text-[18px] sm:text-[24px]">
                {data.titulo}
              </h1>
            )}
          </FadeIn>

          <FadeIn
            loading={loading}
            ready={!!data}
            skeleton={<Skeleton className="h-5 w-1/2" />}
          >
            {data && (
              <h2 className="font-[300] text-[14px] sm:text-[16px]">
                Dir. {data.director?.nombre}
              </h2>
            )}
          </FadeIn>

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

      {/* En cartelera + streaming — fila completa */}
      <FadeIn
        loading={loading}
        ready={!!data}
        skeleton={<Skeleton className="h-10 w-full" />}
      >
        {data && (
          <div className="flex flex-col gap-4 w-full">
            {data?.streaming && (
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-[500] opacity-60 uppercase tracking-wider">
                  Disponible en
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.streaming.map((p) => (
                    <div
                      key={p.id}
                      title={p.nombre}
                      className="w-8 h-8 rounded-lg overflow-hidden shrink-0"
                    >
                      {p.logo && (
                        <Image
                          src={p.logo}
                          alt={p.nombre}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </FadeIn>

      {/* Puntajes — siempre debajo */}
      <div className="w-full">
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
              className="text-[12px] sm:text-[13px] font-light flex-1 sm:flex-none justify-center w-full! sm:w-fit! flex-col sm:flex-row gap-1! sm:gap-2!"
            >
              2.4
            </Button>
            <Button
              variant="socialMovieIcon"
              img="letterboxd"
              className="text-[12px] sm:text-[13px] font-light flex-1 sm:flex-none justify-center w-full! sm:w-fit! flex-col sm:flex-row gap-1! sm:gap-2!"
            >
              2.4
            </Button>
            <Button
              variant="socialMovieIcon"
              img="imdb"
              className="text-[12px] sm:text-[13px] font-light flex-1 sm:flex-none justify-center w-full! sm:w-fit! flex-col sm:flex-row gap-1! sm:gap-2!"
            >
              2.4
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default MovieSidebar;
