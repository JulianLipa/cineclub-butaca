import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { isString } from "@/lib/validation";

// Sala de escaneo de la pantalla de pre-función.
//   - POST: un celular que escaneó el QR se "registra" con su username/nombre.
//   - GET:  la pantalla pollea la lista de quienes se registraron.
//
// La sala se identifica por el id de la función (tmdbId). Cada documento expira
// solo a las pocas horas vía índice TTL, así que la sala se autolimpia.

const COLLECTION = "qr_scans";
const TTL_SECONDS = 6 * 60 * 60; // 6 horas

// Evita recrear el índice TTL en cada request dentro de la misma instancia.
let indexReady = null;

async function getCollection() {
  const db = await getDb();
  const col = db.collection(COLLECTION);
  if (!indexReady) {
    indexReady = Promise.all([
      col.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 }),
      col.createIndex({ room: 1, username: 1 }, { unique: true }),
    ]).catch((e) => {
      // Si falla la creación del índice, no bloqueamos la feature.
      indexReady = null;
      throw e;
    });
  }
  await indexReady;
  return col;
}

export async function GET(_request, { params }) {
  const { room } = await params;
  if (!room) {
    return NextResponse.json({ error: "Falta room" }, { status: 400 });
  }

  try {
    const col = await getCollection();
    const docs = await col
      .find({ room: String(room) })
      .sort({ joinedAt: 1 })
      .project({ _id: 0, username: 1, name: 1, joinedAt: 1 })
      .toArray();
    return NextResponse.json({ users: docs });
  } catch (err) {
    return NextResponse.json(
      { error: "No se pudo leer la sala", detail: String(err?.message || err) },
      { status: 500 },
    );
  }
}

export async function POST(request, { params }) {
  const { room } = await params;
  if (!room) {
    return NextResponse.json({ error: "Falta room" }, { status: 400 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const rawName = isString(body?.name) ? body.name.trim() : "";
  const rawUsername = isString(body?.username) ? body.username.trim() : "";

  // username es la clave única dentro de la sala. Si no hay username (invitado),
  // usamos el nombre como clave.
  const username = (rawUsername || rawName).slice(0, 40);
  const name = (rawName || rawUsername).slice(0, 60);

  if (!username || !name) {
    return NextResponse.json(
      { error: "Falta nombre o username" },
      { status: 400 },
    );
  }

  try {
    const col = await getCollection();
    const now = new Date();
    await col.updateOne(
      { room: String(room), username },
      {
        $set: {
          name,
          joinedAt: now,
          expireAt: new Date(now.getTime() + TTL_SECONDS * 1000),
        },
        $setOnInsert: { room: String(room), username },
      },
      { upsert: true },
    );
    return NextResponse.json({ ok: true, username, name });
  } catch (err) {
    return NextResponse.json(
      {
        error: "No se pudo registrar",
        detail: String(err?.message || err),
      },
      { status: 500 },
    );
  }
}

// Vacía la sala: se llama al entrar a la pantalla del muro para empezar limpio.
export async function DELETE(_request, { params }) {
  const { room } = await params;
  if (!room) {
    return NextResponse.json({ error: "Falta room" }, { status: 400 });
  }

  try {
    const col = await getCollection();
    const { deletedCount } = await col.deleteMany({ room: String(room) });
    return NextResponse.json({ ok: true, deletedCount });
  } catch (err) {
    return NextResponse.json(
      { error: "No se pudo limpiar", detail: String(err?.message || err) },
      { status: 500 },
    );
  }
}
