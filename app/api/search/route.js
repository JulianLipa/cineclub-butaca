import { NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb";
import { sanitizeText, LIMITS } from "@/lib/validation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = sanitizeText(searchParams.get("q") || "", LIMITS.search.max);

  if (q.length < 2) return NextResponse.json([]);

  try {
    const results = await searchMovies(q);
    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { error: "Error al buscar películas" },
      { status: 500 },
    );
  }
}
