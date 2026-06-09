import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function POST(request) {
  const { identifier, password } = await request.json();

  if (!identifier || !password) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const dataPath = join(process.cwd(), "data.json");
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));

  const user = data.usuarios.find(
    (u) =>
      (u.mail === identifier || u.username === identifier) &&
      u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { error: "Usuario o contraseña incorrectos" },
      { status: 401 }
    );
  }

  const { password: _, ...userWithoutPassword } = user;
  return NextResponse.json({ user: userWithoutPassword });
}
