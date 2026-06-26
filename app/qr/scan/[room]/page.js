import { getMovieById, formatMovie } from "@/lib/tmdb";
import ScanPage from "./ScanPage";

export default async function ScanPageWrapper({ params }) {
  const { room } = await params;

  let movie = null;
  if (room) {
    try {
      const { details, credits, videos, providers } = await getMovieById(room);
      movie = formatMovie(details, credits, videos, providers);
    } catch {
      movie = null;
    }
  }

  return <ScanPage room={room} movie={movie} />;
}
