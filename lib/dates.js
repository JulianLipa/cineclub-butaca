/**
 * lib/dates.js
 * Utilidades centralizadas para manejo de fechas del sitio.
 *
 * Formatos usados en el proyecto:
 *  - Funciones (data.json):  "dd/mm/yy"   ej. "23/12/26"
 *  - Eventos  (data.json):   "YYYY-MM-DD" ej. "2026-01-03"
 */

const DAYS_ES = ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."];

export const DAYS_ES_FULL = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
export const MONTHS_ES_FULL = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

// ---------------------------------------------------------------------------
// Fechas de funciones  ("dd/mm/yy")
// ---------------------------------------------------------------------------

/**
 * Parsea una fecha de función al objeto Date correspondiente.
 * @param {string} str  — fecha en formato "dd/mm/yy" ej. "23/12/26"
 * @returns {Date}      — objeto Date con la fecha correspondiente
 */
export function parseScreeningDate(str) {
  const [day, month, year] = str.split("/").map(Number);
  return new Date(2000 + year, month - 1, day);
}

/**
 * Formatea una fecha de función para mostrar en la UI.
 * @param {string} str  — fecha en formato "dd/mm/yy" ej. "23/12/26"
 * @returns {string}    — fecha formateada ej. "Vie. 23/12"
 */
export function formatScreeningDisplay(str) {
  if (!str) return "";
  const date = parseScreeningDate(str);
  const dayName = DAYS_ES[date.getDay()];
  const [day, month] = str.split("/");
  return `${dayName} ${day}/${month}`;
}

/**
 * Compara si dos fechas de función (dd/mm/yy) caen el mismo día.
 * Usado para la lógica de hideDate en FuncionesSection.
 * @param {string|undefined} a  — fecha en formato "dd/mm/yy" ej. "23/12/26"
 * @param {string|undefined} b  — fecha en formato "dd/mm/yy" ej. "23/12/26"
 * @returns {boolean}           — true si ambas fechas son el mismo día
 */
export function isSameScreeningDay(a, b) {
  if (!a || !b) return false;
  const [da, ma] = a.split("/");
  const [db, mb] = b.split("/");
  return da === db && ma === mb;
}

/**
 * Convierte un objeto Date al formato ISO esperado por EventRow ("YYYY-MM-DD").
 * Usar cuando se tiene un Date (ej. resultado de parseScreeningDate)
 * y se necesita pasarlo a EventRow sin modificar su lógica interna.
 * @param {Date} date     — objeto Date
 * @returns {string}      — fecha en formato "YYYY-MM-DD" ej. "2026-12-23"
 */
export function dateToISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ---------------------------------------------------------------------------
// Fechas de eventos del calendario  ("YYYY-MM-DD")
// ---------------------------------------------------------------------------

/**
 * Parsea una fecha ISO a un objeto Date (sin desfase de zona horaria).
 * @param {string} isoStr  — fecha en formato "YYYY-MM-DD" ej. "2026-01-03"
 * @returns {Date}         — objeto Date con la fecha correspondiente
 */
export function parseISODate(isoStr) {
  const [year, month, day] = isoStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Devuelve el día y mes de una fecha ISO para mostrar en EventRow.
 * @param {string} isoStr  — fecha en formato "YYYY-MM-DD" ej. "2026-01-03"
 * @returns {string}       — día y mes sin ceros ej. "3/1"
 */
export function formatISODayMonth(isoStr) {
  const date = parseISODate(isoStr);
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

export const sortByDateDesc = (items) =>
  [...items].sort((a, b) => new Date(b.date) - new Date(a.date));

export function formatScreeningFullDate(str) {
  if (!str) return "";
  const date = parseScreeningDate(str);
  return `${DAYS_ES_FULL[date.getDay()]} ${date.getDate()} de ${MONTHS_ES_FULL[date.getMonth()]}, ${date.getFullYear()}`;
}
