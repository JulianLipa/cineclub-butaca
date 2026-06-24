import { MongoClient } from "mongodb";

// Conexión a MongoDB cacheada para serverless (Vercel).
//
// En serverless cada request puede reutilizar la misma instancia "caliente",
// pero también puede crear nuevas. Si abriéramos un cliente nuevo por request
// agotaríamos el pool de conexiones de Atlas. Por eso cacheamos el cliente (y
// su promesa de conexión) en `globalThis`, que sobrevive entre invocaciones de
// una misma instancia.

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "butaca";

let cached = globalThis._butacaMongo;
if (!cached) {
  cached = globalThis._butacaMongo = { client: null, promise: null };
}

export async function getDb() {
  if (!uri) {
    throw new Error(
      "MONGODB_URI no está configurada",
    );
  }

  if (cached.client) return cached.client.db(dbName);

  if (!cached.promise) {
    cached.promise = new MongoClient(uri).connect().then((client) => {
      cached.client = client;
      return client;
    });
  }

  const client = await cached.promise;
  return client.db(dbName);
}
