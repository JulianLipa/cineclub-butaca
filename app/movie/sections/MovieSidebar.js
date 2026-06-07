import MovieCard from "@/shared/ui/movieCard/MovieCard";
import CardDetails from "@/shared/ui/card/CardDetails";
import Button from "@/shared/ui/button/Button";
import Skeleton from "@/shared/components/skeleton/Skeleton.js";
import FadeIn from "@/shared/components/skeleton/FadeIn.js";

const MovieSidebar = ({ data, loading }) => {
  return (
    <div className="w-full sm:w-[30%] sm:sticky top-(--header-height) sm:max-h-svh rounded-3xl sm:-mt-40 flex sm:flex-col gap-4 sm:px-4 sm:overflow-y-auto sm:pr-(--padding-body-desktop-w) pr-(--padding-body-mobile-w)">
      {/* Poster */}
      <div className="w-50 sm:w-[80%] bg-(--white) rounded-3xl sm:p-4 sm:-ml-4">
        <FadeIn
          loading={loading}
          skeleton={<Skeleton className="w-full aspect-[2/3] rounded-3xl" />}
        >
          <MovieCard tmdbId={data?.tmdbId} />
        </FadeIn>
      </div>

      <div className="w-full flex flex-col gap-4">
        {/* Puntajes */}
        <div className="flex gap-4 order-last sm:order-none">
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
            <div className="flex gap-4">
              <Button
                variant="terciary"
                img="rotten"
                className="text-[.7em] sm:text-[.8em] font-light"
              >
                2.4
              </Button>
              <Button
                variant="terciary"
                img="letterboxd"
                className="text-[.7em] sm:text-[.8em] font-light"
              >
                2.4
              </Button>
              <Button
                variant="terciary"
                img="imdb"
                className="text-[.7em] sm:text-[.8em] font-light"
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
          {data && <h1 className="font-[600] text-[24px]">{data.titulo}</h1>}
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

        {/* Detalles */}
        <FadeIn
          loading={loading}
          ready={!!data}
          skeleton={<Skeleton className="h-10 w-full" />}
        >
          {data && (
            <CardDetails
              duration={data.duracion}
              country={data.paisProduccion?.[0] ?? "No disponible"}
              year={data.anio}
              className="m-0!"
            />
          )}
        </FadeIn>
      </div>
    </div>
  );
};

export default MovieSidebar;
