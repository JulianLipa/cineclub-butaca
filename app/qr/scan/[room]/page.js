"use client";

import { use, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/shared/ui/button/Button";

// Página a la que llega el celular tras escanear el QR de la pantalla 2.
// Registra al usuario en la sala (room = tmdbId) para que su nombre aparezca
// en la proyección. Si está logueado usa su username; si no, pide un nombre.
export default function ScanPage({ params }) {
  const { room } = use(params);
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

  // Si está logueado, se registra automáticamente al entrar.
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-(--primary) p-8 text-center text-(--white)">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/logo-white.svg"
        alt="Cineclub Butaca"
        className="h-16 w-auto"
      />

      {status === "done" && (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[1.8rem] font-[700]">¡Listo, {registered}!</h1>
          <p className="opacity-80">Ya apareciste en la pantalla.</p>
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

      {/* Logueado: registrando automáticamente */}
      {user?.username && status === "sending" && (
        <p className="opacity-80">Sumándote…</p>
      )}

      {/* Invitado: pedir nombre */}
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
