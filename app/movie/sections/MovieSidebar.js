import MovieCard from "@/shared/ui/movieCard/movieCard";
import CardDetails from "@/shared/ui/card/CardDetails";
import Button from "@/shared/ui/button/Button";

const MovieSidebar = ({ data }) => {
  return (
    <div className="w-full sm:w-[30%] sm:sticky top-(--header-height) sm:h-svh rounded-3xl sm:-mt-40 flex sm:flex-col gap-4 sm:px-4 sm:overflow-y-auto">
      <div className="w-50 sm:w-[80%] bg-(--white) rounded-3xl sm:p-4 sm:-ml-4">
        <MovieCard />
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-4 order-last sm:order-none">
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

        <h1 className="font-[600] text-[24px]">{data.title}</h1>
        <h1 className="font-[300] text-[16px]">Dir. {data.director}</h1>

        <CardDetails
          duration={data.duration}
          country={data.country}
          year={data.year}
          className="m-0!"
        />
      </div>
    </div>
  );
};

export default MovieSidebar;
