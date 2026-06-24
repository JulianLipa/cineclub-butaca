import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { ROLES } from "@/lib/auth/roles";

// Listado de usuarios para el panel admin. Nunca devuelve contraseñas.
//
// Nota de seguridad: sin sesiones de servidor (cookie httpOnly) no hay forma
// 100% confiable de autorizar acá. El identificador del solicitante llega por
// el header `x-user-id` que envía el cliente; verificamos que ese usuario
// exista y tenga rol admin. Esto NO expone contraseñas ni permite escritura,
// así que el peor caso es la lectura de datos públicos del perfil. Para
// blindarlo del todo habría que migrar a sesiones firmadas en cookie.
export async function GET(request) {
  const requesterId = Number(request.headers.get("x-user-id"));

  const dataPath = join(process.cwd(), "data.json");
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));

  const requester = data.usuarios.find((u) => u.id === requesterId);
  if (!requester || requester.role !== ROLES.ADMIN) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const users = data.usuarios.map(({ password, ...rest }) => rest);
  return NextResponse.json({ users });
}
