import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

// Un hash de bcrypt siempre arranca con $2a$, $2b$ o $2y$.
const BCRYPT_RE = /^\$2[aby]\$\d{2}\$/;

export function isHashed(value) {
  return typeof value === "string" && BCRYPT_RE.test(value);
}

export async function hashPassword(plain) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

/**
 * Verifica una contraseña contra el valor almacenado.
 * Soporta migración perezosa: si `stored` está en texto plano (datos viejos),
 * compara directo y marca `needsRehash` para que el caller lo re-hashee.
 *
 * @returns {{ ok: boolean, needsRehash: boolean }}
 */
export async function verifyPassword(plain, stored) {
  if (isHashed(stored)) {
    const ok = await bcrypt.compare(plain, stored);
    return { ok, needsRehash: false };
  }
  // Contraseña legacy en texto plano.
  const ok = plain === stored;
  return { ok, needsRehash: ok };
}
