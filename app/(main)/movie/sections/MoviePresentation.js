"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";

import Button from "@/shared/ui/button/Button";
import { useAuth } from "@/contexts/AuthContext";
import { isAdmin } from "@/lib/auth/roles";

// El QR siempre apunta al dominio de producción: la pantalla se proyecta desde
// cualquier equipo, pero los celulares que escanean deben llegar al sitio real.
const SITE_URL = "https://cineclub-butaca.vercel.app";

// Pantalla de "pre-función" para proyectar antes de cada función.
// Solo accesible para admins desde la página de cada película.
//   - Mitad izquierda: backdrop de la película (el mismo del header).
//   - Overlay abajo a la izquierda: QR a la página de la peli en Butaca.
//   - Mitad derecha: logo de Butaca + título, año y director.
const PreFunctionScreen = ({ movie, url, onClose }) => {
  const containerRef = useRef(null);
  // onClose puede cambiar de identidad entre renders; lo guardamos en un ref
  // para que el efecto principal corra una sola vez (al montar) y no re-pida
  // fullscreen en cada render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Al abrir, entramos en pantalla completa automáticamente.
    containerRef.current?.requestFullscreen?.().catch(() => {});

    // Salir de pantalla completa (ESC) vuelve a la página de la película.
    const onFsChange = () => {
      if (!document.fullscreenElement) onCloseRef.current?.();
    };
    document.addEventListener("fullscreenchange", onFsChange);

    // Fallback: si el navegador no concedió fullscreen, ESC igual cierra.
    const onKey = (e) => {
      if (e.key === "Escape" && !document.fullscreenElement) {
        onCloseRef.current?.();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    };
  }, []);

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[3000] flex flex-col bg-(--primary) text-(--white) md:flex-row"
    >
      {/* Izquierda: backdrop + QR overlay */}
      <div className="relative h-[45%] w-full overflow-hidden md:h-full md:w-[58%]">
        {movie?.frame && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={movie.frame}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-transparent" />

        {/* QR abajo a la izquierda */}
        <div className="absolute bottom-5 left-5 flex items-end gap-3 sm:bottom-8 sm:left-8">
          <div className="rounded-2xl bg-(--white) p-3 shadow-lg">
            <QRCodeSVG
              value={url}
              size={132}
              level="M"
              bgColor="transparent"
              fgColor="#48250b"
            />
          </div>
          <p className="mb-1 max-w-[10rem] text-[.8em] font-[600] leading-tight text-(--white) drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Escaneá para acceder a información de la película
          </p>
        </div>
      </div>

      {/* Derecha: logo + ficha */}
      <div className="flex w-full flex-1 flex-col items-start justify-center gap-8 p-8 text-center md:w-[42%] md:p-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/logo-white.svg"
          alt="Cineclub Butaca"
          className="h-12 w-auto sm:h-16"
        />
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-[2rem] font-[700] leading-tight sm:text-[2.6rem]">
            {movie?.titulo}
          </h1>
          {movie?.anio && (
            <p className="text-[1.1em] opacity-70">{movie.anio}</p>
          )}
          {movie?.director?.nombre && (
            <p className="text-[1em] opacity-80">
              Dir. {movie.director.nombre}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

// Botón "QR" (solo admin) + apertura de la pantalla de pre-función.
const MoviePresentation = ({ movie }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const url =
    movie?.tmdbId != null ? `${SITE_URL}/movie/${movie.tmdbId}` : SITE_URL;

  if (!mounted || !isAdmin(user)) return null;

  return (
    <>
      <Button
        variant="secondary"
        icon="fullscreen"
        onClick={() => setOpen(true)}
        className="text-[.9em]!"
      >
        QR
      </Button>

      {open && (
        <PreFunctionScreen
          movie={movie}
          url={url}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default MoviePresentation;
