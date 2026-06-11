import { getMovieById, formatMovie } from "@/lib/tmdb";
import MoviePageWrapper from "../moviePageWrapper";

export default async function Page({ params }) {
  const { id } = await params;

  const { details, credits, videos, providers } = await getMovieById(id);
  const movie = formatMovie(details, credits, videos, providers);

  return <MoviePageWrapper movie={movie} />;
}
