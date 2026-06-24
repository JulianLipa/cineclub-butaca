// Migración única: hashea cualquier contraseña en texto plano de data.json y
// asegura que todos los usuarios tengan un campo `role`.
//
//   node scripts/hash-passwords.mjs
//
// Idempotente: las contraseñas ya hasheadas se dejan intactas.

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;
const BCRYPT_RE = /^\$2[aby]\$\d{2}\$/;

const dataPath = join(process.cwd(), "data.json");
const data = JSON.parse(readFileSync(dataPath, "utf-8"));

let hashed = 0;
let roled = 0;

for (const user of data.usuarios) {
  if (typeof user.password === "string" && !BCRYPT_RE.test(user.password)) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    hashed++;
  }
  if (!user.role) {
    user.role = "user";
    roled++;
  }
}

writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log(`✓ Contraseñas hasheadas: ${hashed}`);
console.log(`✓ Roles asignados (user): ${roled}`);
console.log(`✓ Usuarios totales: ${data.usuarios.length}`);
