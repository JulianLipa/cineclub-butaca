// Helpers de validación y sanitización de inputs del usuario.
// Puros y sin dependencias: reutilizables desde cualquier route handler.

export const LIMITS = {
  username: { min: 3, max: 20 },
  password: { min: 8, max: 100 },
  nombre: { min: 1, max: 50 },
  apellido: { min: 1, max: 50 },
  bio: { min: 0, max: 500 },
  mail: { max: 254 },
  search: { max: 100 },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_RE = /^[a-zA-Z0-9_]+$/;
// Caracteres de control C0 (0x00-0x1F) + DEL (0x7F).
const CONTROL_RE = /[\x00-\x1f\x7f]/g;

export function isString(v) {
  return typeof v === "string";
}

/**
 * Limpia texto: fuerza string, elimina caracteres de control, recorta espacios
 * y trunca a `max`. Devuelve "" para entradas no-string.
 */
export function sanitizeText(value, max = 1000) {
  if (!isString(value)) return "";
  return value.replace(CONTROL_RE, "").trim().slice(0, max);
}

export function isEmail(value) {
  return (
    isString(value) &&
    value.length <= LIMITS.mail.max &&
    EMAIL_RE.test(value.trim())
  );
}

export function isValidUsername(value) {
  if (!isString(value)) return false;
  const v = value.trim();
  return (
    v.length >= LIMITS.username.min &&
    v.length <= LIMITS.username.max &&
    USERNAME_RE.test(v)
  );
}

/** Mín. 8, al menos una mayúscula, una minúscula y un número. */
export function isStrongPassword(value) {
  return (
    isString(value) &&
    value.length >= LIMITS.password.min &&
    value.length <= LIMITS.password.max &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /[0-9]/.test(value)
  );
}

/**
 * Valida el payload de signup. Devuelve { valid, errors, clean }.
 * `errors` mapea campo -> mensaje (compatible con el front que usa field/error).
 */
export function validateSignup(payload) {
  const errors = {};
  const data = payload && typeof payload === "object" ? payload : {};

  const nombre = sanitizeText(data.nombre, LIMITS.nombre.max);
  const apellido = sanitizeText(data.apellido, LIMITS.apellido.max);
  const username = isString(data.username) ? data.username.trim() : "";
  const mail = isString(data.mail) ? data.mail.trim().toLowerCase() : "";

  if (!nombre) errors.nombre = "El nombre es obligatorio";
  if (!apellido) errors.apellido = "El apellido es obligatorio";
  if (!isValidUsername(username))
    errors.username =
      "El usuario debe tener 3-20 caracteres (letras, números o _)";
  if (!isEmail(mail)) errors.mail = "Email inválido";
  if (!isStrongPassword(data.password))
    errors.password =
      "La contraseña debe tener mín. 8 caracteres, con mayúscula, minúscula y número";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    clean: { nombre, apellido, username, mail, password: data.password },
  };
}
