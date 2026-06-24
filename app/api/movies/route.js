import { NextResponse } from "next/server";
import { getMoviePreview, searchMovie, getMovieById, formatMovie } from "@/lib/tmdb";
import { sanitizeText, LIMITS } from "@/lib/validation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = sanitizeText(searchParams.get("query") || "", LIMITS.search.max);
  const rawId = searchParams.get("id");
  // El id de TMDB es numérico: descartamos cualquier otra cosa.
  const id = rawId && /^\d+$/.test(rawId) ? rawId : null;
  const preview = searchParams.get("preview");

  if (!query && !id) {
    return NextResponse.json(
      { error: "Falta el parámetro query o id" },
      { status: 400 },
    );
  }

  try {
    let movieId = id;

    if (query) {
      const movie = await searchMovie(query);
      if (!movie) {
        return NextResponse.json(
          { error: "Película no encontrada" },
          { status: 404 },
        );
      }
      movieId = movie.id;
    }

    if (preview) {
      const data = await getMoviePreview(movieId);
      return NextResponse.json(data);
    }

    const { details, credits, videos } = await getMovieById(movieId);
    return NextResponse.json(formatMovie(details, credits, videos));
  } catch {
    return NextResponse.json(
      { error: "Error al obtener la película" },
      { status: 500 },
    );
  }
}
