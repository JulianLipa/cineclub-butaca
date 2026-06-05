const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p";

// Los datos de TMDB son estáticos — revalidar cada hora
const CACHE = { next: { revalidate: 3600 } };

const getApiKey = () => {
  const key = process.env.TMDB_API;
  if (!key) throw new Error("TMDB_API env variable is not set");
  return key;
};

export async function getMoviePreview(id) {
  const API = getApiKey();
  const res = await fetch(
    `${BASE}/movie/${id}?api_key=${API}&language=es-AR`,
    CACHE,
  );
  if (!res.ok) throw new Error(`TMDB preview error: ${res.status}`);
  const { title, release_date, poster_path, backdrop_path } = await res.json();
  return {
    titulo: title,
    anio: release_date ? new Date(release_date).getFullYear() : null,
    poster: poster_path ? `${IMG}/w500${poster_path}` : null,
    frame: backdrop_path ? `${IMG}/w1280${backdrop_path}` : null,
  };
}

export async function searchMovie(query) {
  const API = getApiKey();
  const res = await fetch(
    `${BASE}/search/movie?api_key=${API}&query=${encodeURIComponent(query)}&language=es-AR`,
    CACHE,
  );
  if (!res.ok) throw new Error(`TMDB search error: ${res.status}`);
  const data = await res.json();
  return data.results[0] ?? null;
}

export async function searchMovies(query, limit = 6) {
  const API = getApiKey();
  const res = await fetch(
    `${BASE}/search/multi?api_key=${API}&query=${encodeURIComponent(query)}&language=es-AR`,
  );
  if (!res.ok) throw new Error(`TMDB search error: ${res.status}`);
  const { results } = await res.json();

  return results
    .filter(({ media_type }) => ["movie", "tv", "person"].includes(media_type))
    .slice(0, limit)
    .map((item) => {
      if (item.media_type === "person") {
        return {
          id: item.id,
          titulo: item.name,
          tipo: "person",
          subtitulo: item.known_for_department ?? null,
          poster: item.profile_path ? `${IMG}/w185${item.profile_path}` : null,
        };
      }
      const isMovie = item.media_type === "movie";
      const date = isMovie ? item.release_date : item.first_air_date;
      return {
        id: item.id,
        titulo: isMovie ? item.title : item.name,
        tipo: item.media_type,
        subtitulo: date ? String(new Date(date).getFullYear()) : null,
        poster: item.poster_path ? `${IMG}/w200${item.poster_path}` : null,
      };
    });
}

export async function getPersonById(id) {
  const API = getApiKey();
  const [detailsRes, creditsRes] = await Promise.all([
    fetch(`${BASE}/person/${id}?api_key=${API}&language=es-AR`, CACHE),
    fetch(`${BASE}/person/${id}/movie_credits?api_key=${API}&language=es-AR`, CACHE),
  ]);
  if (!detailsRes.ok) throw new Error(`TMDB person error: ${detailsRes.status}`);
  if (!creditsRes.ok) throw new Error(`TMDB person credits error: ${creditsRes.status}`);
  const [details, credits] = await Promise.all([detailsRes.json(), creditsRes.json()]);
  return { details, credits };
}

export async function getMovieById(id) {
  const API = getApiKey();
  const [detailsRes, creditsRes, videosRes] = await Promise.all([
    fetch(`${BASE}/movie/${id}?api_key=${API}&language=es-AR`, CACHE),
    fetch(`${BASE}/movie/${id}/credits?api_key=${API}&language=es-AR`, CACHE),
    fetch(`${BASE}/movie/${id}/videos?api_key=${API}&language=es-AR,en-US`, CACHE),
  ]);

  if (!detailsRes.ok) throw new Error(`TMDB details error: ${detailsRes.status}`);
  if (!creditsRes.ok) throw new Error(`TMDB credits error: ${creditsRes.status}`);
  if (!videosRes.ok) throw new Error(`TMDB videos error: ${videosRes.status}`);

  const [details, credits, videos] = await Promise.all([
    detailsRes.json(),
    creditsRes.json(),
    videosRes.json(),
  ]);

  return { details, credits, videos };
}
