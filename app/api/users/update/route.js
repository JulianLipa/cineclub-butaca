import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import {
  sanitizeText,
  isStrongPassword,
  LIMITS,
  isString,
} from "@/lib/validation";
import { verifyPassword, hashPassword } from "@/lib/auth/passwords";

// Campos que el dueño de la cuenta puede editar vía este endpoint.
// NUNCA se permite tocar id, username, mail, role ni password por acá:
// eso evita escalamiento de privilegios y toma de cuentas aunque el rol
// del cliente esté falseado.
function buildSafeUpdates(updates) {
  const safe = {};
  if (isString(updates.nombre))
    safe.nombre = sanitizeText(updates.nombre, LIMITS.nombre.max);
  if (isString(updates.apellido))
    safe.apellido = sanitizeText(updates.apellido, LIMITS.apellido.max);
  if (isString(updates.bio))
    safe.bio = sanitizeText(updates.bio, LIMITS.bio.max);

  if (Array.isArray(updates.peliculasVistas)) {
    safe.peliculasVistas = updates.peliculasVistas
      .filter((p) => p && isString(p.tmdbId))
      .slice(0, 5000)
      .map((p) => ({
        tmdbId: sanitizeText(p.tmdbId, 20),
        watchedDate: sanitizeText(p.watchedDate || "", 30),
      }));
  }

  return safe;
}

export async function PATCH(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const { id, currentPassword, newPassword, ...updates } = body || {};

  if (typeof id !== "number") {
    return NextResponse.json({ error: "Falta el id" }, { status: 400 });
  }

  const dataPath = join(process.cwd(), "data.json");
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));

  const index = data.usuarios.findIndex((u) => u.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  const safeUpdates = buildSafeUpdates(updates);

  // Cambio de contraseña: requiere la contraseña actual válida.
  if (newPassword !== undefined) {
    const { ok } = await verifyPassword(
      currentPassword,
      data.usuarios[index].password,
    );
    if (!ok) {
      return NextResponse.json(
        { field: "currentPassword", error: "La contraseña actual es incorrecta" },
        { status: 401 },
      );
    }
    if (!isStrongPassword(newPassword)) {
      return NextResponse.json(
        {
          field: "newPassword",
          error:
            "La contraseña debe tener mín. 8 caracteres, con mayúscula, minúscula y número",
        },
        { status: 400 },
      );
    }
    safeUpdates.password = await hashPassword(newPassword);
  }

  if (Object.keys(safeUpdates).length === 0) {
    return NextResponse.json(
      { error: "No hay cambios válidos para aplicar" },
      { status: 400 },
    );
  }

  data.usuarios[index] = { ...data.usuarios[index], ...safeUpdates };
  writeFileSync(dataPath, JSON.stringify(data, null, 2));

  const { password: _, ...userWithoutPassword } = data.usuarios[index];
  return NextResponse.json({ user: userWithoutPassword });
}
