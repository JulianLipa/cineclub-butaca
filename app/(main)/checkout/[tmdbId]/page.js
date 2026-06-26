import { getMovieById, formatMovie } from "@/lib/tmdb";
import { funciones } from "@/data.json";
import CheckoutPageWrapper from "./CheckoutPageWrapper";

export default async function CheckoutPage({ params }) {
  const { tmdbId } = await params;
  const funcion = funciones.find((f) => String(f.tmdbId) === tmdbId) || null;

  let movie = null;
  if (funcion?.tmdbId) {
    try {
      const { details, credits, videos, providers } = await getMovieById(tmdbId);
      movie = formatMovie(details, credits, videos, providers);
    } catch {
      movie = null;
    }
  }

  return <CheckoutPageWrapper movie={movie} funcion={funcion} />;
}
