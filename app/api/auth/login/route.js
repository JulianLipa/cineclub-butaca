import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { verifyPassword, hashPassword } from "@/lib/auth/passwords";
import { isString } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request) {
  const ip = getClientIp(request);
  const { allowed, retryAfter } = rateLimit(`login:${ip}`, {
    limit: 5,
    windowMs: 60_000,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Probá de nuevo en un momento." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const { identifier, password } = body || {};

  if (!isString(identifier) || !isString(password) || !identifier || !password) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const id = identifier.trim().toLowerCase();

  const dataPath = join(process.cwd(), "data.json");
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));

  const index = data.usuarios.findIndex(
    (u) =>
      u.mail.toLowerCase() === id || u.username.toLowerCase() === id,
  );

  // Mensaje genérico para no revelar si el usuario existe.
  const genericError = NextResponse.json(
    { error: "Usuario o contraseña incorrectos" },
    { status: 401 },
  );

  if (index === -1) return genericError;

  const user = data.usuarios[index];
  const { ok, needsRehash } = await verifyPassword(password, user.password);
  if (!ok) return genericError;

  // Migración perezosa: si la contraseña estaba en texto plano, la hasheamos.
  // El login no debe fallar si no se puede persistir (ej. FS de solo lectura en
  // Vercel): la verificación ya fue exitosa, el rehash es best-effort.
  if (needsRehash) {
    try {
      data.usuarios[index].password = await hashPassword(password);
      writeFileSync(dataPath, JSON.stringify(data, null, 2));
    } catch {
      // Ignorar: se reintentará en el próximo login.
    }
  }

  const { password: _, ...userWithoutPassword } = data.usuarios[index];
  return NextResponse.json({ user: userWithoutPassword });
}
