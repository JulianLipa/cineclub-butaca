import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export async function PATCH(request) {
  const { id, ...updates } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Falta el id" }, { status: 400 });
  }

  const dataPath = join(process.cwd(), "data.json");
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));

  const index = data.usuarios.findIndex((u) => u.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  data.usuarios[index] = { ...data.usuarios[index], ...updates };
  writeFileSync(dataPath, JSON.stringify(data, null, 2));

  const { password: _, ...userWithoutPassword } = data.usuarios[index];
  return NextResponse.json({ user: userWithoutPassword });
}
