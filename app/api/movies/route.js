import { NextResponse } from "next/server";
import { getMoviePreview, searchMovie, getMovieById, formatMovie } from "@/lib/tmdb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const id = searchParams.get("id");
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
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
