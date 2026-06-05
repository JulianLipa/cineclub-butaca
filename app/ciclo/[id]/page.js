import { notFound } from "next/navigation";
import { ciclos } from "@/data.json";
import { getMoviePreview } from "@/lib/tmdb/fetchers";
import CicloPageWrapper from "../cicloPageWrapper";

export default async function Page({ params }) {
  const { id } = await params;
  const ciclo = ciclos.find((c) => c.id === id);

  if (!ciclo) notFound();

  const preview = await getMoviePreview(ciclo.tmdbId).catch(() => null);

  return <CicloPageWrapper ciclo={{ ...ciclo, frame: preview?.frame ?? null }} />;
}
