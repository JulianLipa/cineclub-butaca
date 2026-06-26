"use client";

import Image from "next/image";
import Link from "next/link";
import { useMovieData } from "@/shared/hooks/useMovieData";

const MovieRow = ({ tmdbId, index }) => {
  const data = useMovieData(tmdbId);

  return (
    <Link
      href={`/movie/${tmdbId}`}
      className="flex items-center gap-4 py-3 border-b border-(--primary)/20 hover:opacity-70"
    >
      <span className="bodyText font-[500]! w-6 shrink-0 opacity-50 text-right">
        {index + 1}
      </span>
      <div className="w-10 shrink-0 rounded-md overflow-hidden aspect-[2/3] bg-(--secondary)">
        {data?.poster && (
          <Image
            src={data.poster}
            alt={data.titulo ?? ""}
            width={40}
            height={60}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="bodyText font-[600]! truncate">{data?.titulo ?? "—"}</p>
        <p className="bodyText opacity-60 truncate">
          {data?.director?.nombre ?? "—"}
          {data?.anio ? ` · ${data.anio}` : ""}
        </p>
      </div>
    </Link>
  );
};

export default MovieRow;
