"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/shared/ui/button/Button";

export default function ScanPage({ room, movie }) {
  const { user } = useAuth();

  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [name, setName] = useState("");
  const [registered, setRegistered] = useState(null);

  const register = async ({ username, name }) => {
    setStatus("sending");
    try {
      const res = await fetch(`/api/qr/${room}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name }),
      });
      if (!res.ok) throw new Error("fail");
      const data = await res.json();
      setRegistered(data.name || data.username);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (user?.username && status === "idle") {
      register({
        username: user.username,
        name: user.nombre || user.username,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    register({ username: trimmed, name: trimmed });
  };

  const movieLabel =
    movie?.titulo && movie?.anio
      ? `${movie.titulo}, ${movie.anio}`
      : movie?.titulo || null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-(--primary) p-8 text-center text-(--white)">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/logo-white.svg"
        alt="Cineclub Butaca"
        className="h-16 w-auto"
      />

      {status === "done" && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-[1.8rem] font-[700]">¡Listo, {registered}!</h1>
            <p className="opacity-80">Ya apareciste en la pantalla.</p>
          </div>
          <div className="flex flex-col items-center gap-3 w-full">
            <Button variant="primary" href="/" className="w-full! justify-center">
              Menú principal
            </Button>
            {movieLabel && room && (
              <Button
                variant="secondary"
                href={`/movie/${room}`}
                className="w-full! justify-center !text-(--white) !border-(--white)"
              >
                {movieLabel}
              </Button>
            )}
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4">
          <p className="opacity-90">Hubo un problema. Probá de nuevo.</p>
          <Button
            variant="primary"
            onClick={() =>
              user?.username
                ? register({
                    username: user.username,
                    name: user.nombre || user.username,
                  })
                : setStatus("idle")
            }
          >
            Reintentar
          </Button>
        </div>
      )}

      {user?.username && status === "sending" && (
        <p className="opacity-80">Sumándote…</p>
      )}

      {!user?.username && (status === "idle" || status === "sending") && (
        <form
          onSubmit={handleGuestSubmit}
          className="flex w-full flex-col items-center gap-4 text-center"
        >
          <h1 className="text-[1.6rem] font-[700]">Sumate a la función</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            maxLength={40}
            className="w-full rounded-xl bg-(--white)/10 px-4 py-3 text-center text-(--white) outline-none placeholder:text-(--white)/50"
          />
          <Button
            variant="primary"
            type="submit"
            className="w-full! justify-center"
          >
            {status === "sending" ? "Enviando…" : "Aparecer en pantalla"}
          </Button>
        </form>
      )}
    </div>
  );
}
