import { getMovieById, formatMovie } from "@/lib/tmdb";
import QrScreens from "./QrScreens";

export default async function QrPage({ searchParams }) {
  const { movie: movieId } = await searchParams;

  let movie = null;
  if (movieId) {
    try {
      const { details, credits, videos, providers } =
        await getMovieById(movieId);
      movie = formatMovie(details, credits, videos, providers);
    } catch {
      movie = null;
    }
  }

  // El room (sala de escaneo) sale del parámetro de URL
  // así el muro de asistentes funciona aunque falle la metadata de TMDB
  return <QrScreens movie={movie} roomId={movieId ? String(movieId) : null} />;
}
