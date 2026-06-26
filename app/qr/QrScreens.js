"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

// Filas de alto fijo: así el desplazamiento del listado es un cálculo exacto
// (sin medir el DOM) y el orador activo queda siempre pegado al top.
const ROW_HEIGHT = 64; // h-16
const ROW_GAP = 16; // gap-4
const ROW_STEP = ROW_HEIGHT + ROW_GAP;

// El QR debe apuntar a un dominio que el celular pueda alcanzar. Por defecto el
// de producción; para probar en local se puede sobreescribir con
// NEXT_PUBLIC_SITE_URL (ej. la IP de la compu en la LAN o un túnel ngrok).
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://cineclub-butaca.vercel.app";

const POLL_MS = 2000;


const QrScreens = ({ movie, roomId }) => {
  const router = useRouter();
  const [screen, setScreen] = useState(1);

  // room sale del parámetro de URL (no del fetch de TMDB), así el muro de
  // asistentes funciona aunque falle la metadata de la película.
  const room = roomId || (movie?.tmdbId != null ? String(movie.tmdbId) : null);

  const movieUrl = room ? `${SITE_URL}/movie/${room}` : SITE_URL;
  const scanUrl = room ? `${SITE_URL}/qr/scan/${room}` : SITE_URL;

  // Bloquear el scroll del body mientras se proyecta.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Navegación por teclado: ←/→ cambian de pantalla, ESC vuelve a la película.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setScreen(2);
      else if (e.key === "ArrowLeft") setScreen(1);
      else if (e.key === "Escape") {
        // Al salir de la vista QR se vacía la sala (keepalive para que el
        // pedido se complete aunque la página ya esté navegando).
        if (room) {
          try {
            fetch(`/api/qr/${room}`, { method: "DELETE", keepalive: true });
          } catch {}
          router.push(`/movie/${room}`);
        } else {
          router.back();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [room, router]);

  // ── Muro de asistentes (solo en pantalla 2) ───────────────────────────────
  const [users, setUsers] = useState([]);
  // Índice del usuario "activo": siempre se muestra primero y resaltado.
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (screen !== 2 || !room) return;
    let alive = true;
    setActiveIndex(0);

    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/qr/${room}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (alive && Array.isArray(data.users)) {
          setUsers(data.users);
        }
      } catch {}
    };

    fetchUsers();
    const id = setInterval(fetchUsers, POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [screen, room]);

  // Navegación del listado con ↑/↓: rota qué usuario queda en el primer lugar
  // (el activo). El primero siempre es el resaltado.
  useEffect(() => {
    if (screen !== 2) return;
    const n = users.length;
    if (n === 0) return;
    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % n);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + n) % n);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [screen, users.length]);

  // En lugar de reordenar el array, dejamos los oradores en su orden natural y
  // desplazamos toda la lista hacia arriba para que el activo quede arriba de
  // todo. Como cada fila mide lo mismo, el offset es un cálculo exacto.
  const offsetY = activeIndex * ROW_STEP;

  return (
    <div className="fixed inset-0 z-[3000] flex flex-col bg-(--primary) text-(--white) md:flex-row">
      {/* Izquierda: backdrop + QR overlay (igual en ambas pantallas) */}
      <div className="relative h-[45%] w-full overflow-hidden md:h-full md:w-[58%]">
        {movie?.frame && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={movie.frame}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

        {/* QR abajo a la izquierda */}
        <div className="absolute bottom-5 left-5 flex items-end gap-3 sm:bottom-8 sm:left-8">
          <div className="rounded-2xl bg-(--white) p-3 shadow-lg">
            <QRCodeSVG
              value={screen === 1 ? movieUrl : scanUrl}
              size={132}
              level="M"
              bgColor="transparent"
              fgColor="#48250b"
            />
          </div>
          <p className="mb-1 max-w-[10rem] text-[.8em] font-[600] leading-tight text-(--white) drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {screen === 1
              ? "Escaneá para acceder a información de la película"
              : "Escaneá para aparecer en pantalla"}
          </p>
        </div>
      </div>

      {/* Derecha */}
      <div className="relative flex w-full flex-1 flex-col items-start justify-between gap-8 p-8 text-center md:w-[42%] md:p-12">
        {screen === 1 ? (
          // ── Pantalla 1: inicio de función (logo + ficha) ──────────────────
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/logo-white.svg"
              alt="Cineclub Butaca"
              className="h-25 w-auto"
            />
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-[2rem] font-[700] leading-tight sm:text-[2.6rem]">
                {movie?.titulo}
              </h1>
              {movie?.anio && movie?.director?.nombre && (
                <p className="text-[1.1em] opacity-70">
                  {movie.anio} · Dir. {movie.director.nombre}
                </p>
              )}
            </div>
          </>
        ) : (
          // ── Pantalla 2: muro de asistentes (logo + usernames) ─────────────
          <div className="flex h-full w-full flex-col items-start gap-15 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/logo-white.svg"
              alt="Cineclub Butaca"
              className="h-25 w-auto shrink-0"
            />
            <div className="flex w-full flex-1 flex-col gap-4 overflow-hidden">
              <h1 className="shrink-0 text-[1.2em] font-medium">
                Listado de oradores
              </h1>
              {users.length === 0 ? (
                <p className="text-left opacity-60">
                  Escaneá el QR para sumarte…
                </p>
              ) : (
                <div className="relative w-full flex-1 overflow-hidden">
                  <motion.div
                    className="flex w-full flex-col gap-4"
                    animate={{ y: -offsetY }}
                    transition={{ type: "spring", stiffness: 300, damping: 32 }}
                  >
                    {users.map((u, idx) => (
                      <div
                        key={u.username}
                        className={
                          idx === activeIndex
                            ? "flex h-16 w-full shrink-0 items-center rounded-2xl border border-(--white) bg-(--white-opacidad) px-5 text-left text-[1.4em] font-[700] backdrop-blur-sm"
                            : "flex h-16 w-full shrink-0 items-center rounded-2xl bg-(--white-opacidad) px-5 text-left text-[1.2em] font-[600] opacity-40"
                        }
                      >
                        {u.name || u.username}
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrScreens;
