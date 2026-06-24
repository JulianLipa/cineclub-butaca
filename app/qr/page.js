import { getMovieById, formatMovie } from "@/lib/tmdb";
import QrScreens from "./QrScreens";

// Pantalla de proyección (pre-función). Se accede desde el botón "QR" de cada
// película: /qr?movie=<tmdbId>. Tiene dos pantallas navegables con flechas:
//   1. Inicio de función (backdrop + QR a la peli + ficha).
//   2. Muro de asistentes (logo + usuarios que escanean en vivo).
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

  // El room (sala de escaneo) sale del parámetro de URL, no del objeto movie:
  // así el muro de asistentes funciona aunque falle la metadata de TMDB.
  return <QrScreens movie={movie} roomId={movieId ? String(movieId) : null} />;
}
