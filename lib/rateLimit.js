// Rate limiter en memoria (ventana deslizante por clave/IP).
// Nota: en serverless con múltiples instancias es best-effort, no un límite
// global estricto. Suficiente para frenar fuerza bruta básica en este proyecto.

const buckets = new Map();

/**
 * @param {string} key     identificador (p. ej. `login:<ip>`)
 * @param {object} opts
 * @param {number} opts.limit      máximos intentos por ventana
 * @param {number} opts.windowMs   tamaño de la ventana en ms
 * @returns {{ allowed: boolean, retryAfter: number }} retryAfter en segundos
 */
export function rateLimit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);

  if (hits.length >= limit) {
    const retryAfter = Math.ceil((windowMs - (now - hits[0])) / 1000);
    buckets.set(key, hits);
    return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
  }

  hits.push(now);
  buckets.set(key, hits);

  // Limpieza oportunista para que el Map no crezca sin límite.
  if (buckets.size > 5000) {
    for (const [k, ts] of buckets) {
      if (ts.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }

  return { allowed: true, retryAfter: 0 };
}

/** Extrae la IP del cliente desde los headers de la request. */
export function getClientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
