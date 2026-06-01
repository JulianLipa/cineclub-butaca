const IMG = "https://image.tmdb.org/t/p";

const formatDuracion = (minutos) => {
  if (!minutos) return null;
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
};

const findTrailer = (videos) =>
  videos.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube" && v.iso_639_1 === "es",
  ) ||
  videos.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
  null;

export function formatMovie(details, credits, videos) {
  const director = credits.crew.find((c) => c.job === "Director");
  const trailer = findTrailer(videos);

  return {
    tmdbId: details.id,
    titulo: details.title,
    sinopsis: details.overview,
    duracion: formatDuracion(details.runtime),
    fechaEstreno: details.release_date,
    anio: details.release_date
      ? new Date(details.release_date).getFullYear()
      : null,
    paisProduccion: details.production_countries.map((p) => p.iso_3166_1),
    frame: details.backdrop_path
      ? `${IMG}/w1280${details.backdrop_path}`
      : null,
    poster: details.poster_path ? `${IMG}/w500${details.poster_path}` : null,
    trailer: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
    director: {
      nombre: director?.name ?? null,
      foto: director?.profile_path
        ? `${IMG}/w185${director.profile_path}`
        : null,
    },
    actores: credits.cast.slice(0, 10).map((a) => ({
      nombre: a.name,
      personaje: a.character,
      foto: a.profile_path ? `${IMG}/w185${a.profile_path}` : null,
    })),
    equipo: credits.crew
      .filter((c) =>
        ["Producer", "Screenplay", "Director of Photography"].includes(c.job),
      )
      .map((c) => ({
        nombre: c.name,
        rol: c.job,
        foto: c.profile_path ? `${IMG}/w185${c.profile_path}` : null,
      })),
  };
}
