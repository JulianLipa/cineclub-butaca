import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export async function POST(request) {
  const { nombre, apellido, username, mail, password } = await request.json();

  if (!nombre || !apellido || !username || !mail || !password) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const dataPath = join(process.cwd(), "data.json");
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));

  if (data.usuarios.find((u) => u.username === username)) {
    return NextResponse.json(
      { field: "username", error: "El nombre de usuario ya está en uso" },
      { status: 400 }
    );
  }

  if (data.usuarios.find((u) => u.mail === mail)) {
    return NextResponse.json(
      { field: "mail", error: "El mail ya está registrado" },
      { status: 400 }
    );
  }

  const newUser = {
    id: data.usuarios.length + 1,
    nombre,
    apellido,
    username,
    mail,
    password,
    bio: "",
    peliculasVistas: [],
  };

  data.usuarios.push(newUser);
  writeFileSync(dataPath, JSON.stringify(data, null, 2));

  const { password: _, ...userWithoutPassword } = newUser;
  return NextResponse.json({ user: userWithoutPassword });
}
