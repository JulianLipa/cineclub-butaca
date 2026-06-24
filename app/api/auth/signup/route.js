import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { hashPassword } from "@/lib/auth/passwords";
import { ROLES } from "@/lib/auth/roles";
import { validateSignup } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request) {
  const ip = getClientIp(request);
  const { allowed, retryAfter } = rateLimit(`signup:${ip}`, {
    limit: 5,
    windowMs: 60_000,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Probá de nuevo en un momento." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const { valid, errors, clean } = validateSignup(payload);
  if (!valid) {
    const [field, error] = Object.entries(errors)[0];
    return NextResponse.json({ field, error, errors }, { status: 400 });
  }

  const { nombre, apellido, username, mail, password } = clean;

  const dataPath = join(process.cwd(), "data.json");
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));

  if (data.usuarios.find((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return NextResponse.json(
      { field: "username", error: "El nombre de usuario ya está en uso" },
      { status: 400 },
    );
  }

  if (data.usuarios.find((u) => u.mail.toLowerCase() === mail)) {
    return NextResponse.json(
      { field: "mail", error: "El mail ya está registrado" },
      { status: 400 },
    );
  }

  const newUser = {
    id: data.usuarios.reduce((max, u) => Math.max(max, u.id), 0) + 1,
    nombre,
    apellido,
    username,
    mail,
    password: await hashPassword(password),
    role: ROLES.USER,
    bio: "",
    peliculasVistas: [],
  };

  data.usuarios.push(newUser);
  writeFileSync(dataPath, JSON.stringify(data, null, 2));

  const { password: _, ...userWithoutPassword } = newUser;
  return NextResponse.json({ user: userWithoutPassword });
}
