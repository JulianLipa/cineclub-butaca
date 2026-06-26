"use client";

import { useState, useEffect } from "react";

export function useMovieData(tmdbId, preview = false) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!tmdbId) return;
    fetch(`/api/movies?id=${tmdbId}${preview ? "&preview=true" : ""}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [tmdbId]);
  return data;
}
