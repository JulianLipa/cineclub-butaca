// Crea (o actualiza) el usuario admin con una contraseña fuerte generada al
// azar. Guarda SOLO el hash en data.json e imprime la contraseña en claro una
// única vez por consola: guardala en tu gestor de contraseñas, no se vuelve a
// mostrar.
//
//   node scripts/seed-admin.mjs
//
// Variables opcionales:
//   ADMIN_USERNAME (default "admin"), ADMIN_MAIL (default "admin@butaca.club")

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { randomInt } from "crypto";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

function generatePassword(length = 20) {
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "23456789";
  const symbols = "!@#$%^&*-_=+";
  const all = lower + upper + digits + symbols;

  // Garantiza al menos uno de cada clase.
  const pick = (set) => set[randomInt(set.length)];
  const chars = [pick(lower), pick(upper), pick(digits), pick(symbols)];
  while (chars.length < length) chars.push(pick(all));

  // Fisher-Yates con randomInt (CSPRNG).
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

const username = process.env.ADMIN_USERNAME || "admin";
const mail = (process.env.ADMIN_MAIL || "admin@butaca.club").toLowerCase();

const dataPath = join(process.cwd(), "data.json");
const data = JSON.parse(readFileSync(dataPath, "utf-8"));

const password = generatePassword();
const hash = await bcrypt.hash(password, SALT_ROUNDS);

const existing = data.usuarios.find(
  (u) => u.username.toLowerCase() === username.toLowerCase(),
);

if (existing) {
  existing.password = hash;
  existing.role = "admin";
  console.log(`✓ Usuario admin existente actualizado: @${existing.username}`);
} else {
  const newAdmin = {
    id: data.usuarios.reduce((max, u) => Math.max(max, u.id), 0) + 1,
    nombre: "Admin",
    apellido: "Butaca",
    username,
    mail,
    password: hash,
    role: "admin",
    bio: "",
    peliculasVistas: [],
  };
  data.usuarios.push(newAdmin);
  console.log(`✓ Usuario admin creado: @${username} (${mail})`);
}

writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log("\n──────────────────────────────────────────────");
console.log("  CONTRASEÑA ADMIN (se muestra una sola vez):");
console.log(`  ${password}`);
console.log("──────────────────────────────────────────────");
console.log("  Guardala ahora. Solo se almacenó su hash.\n");
