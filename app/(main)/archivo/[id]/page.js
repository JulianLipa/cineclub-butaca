import { notFound } from "next/navigation";
import { funcionesPasadas } from "@/data.json";
import { getMoviePreview } from "@/lib/tmdb/fetchers";
import FuncionPageWrapper from "./FuncionPageWrapper";

export default async function Page({ params }) {
  const { id } = await params;
  const funcion = funcionesPasadas.find((f) => f.id === id);

  if (!funcion) notFound();

  const preview = await getMoviePreview(funcion.tmdbId).catch(() => null);

  return <FuncionPageWrapper funcion={funcion} frame={preview?.frame ?? null} />;
}
