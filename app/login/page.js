"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import SectionTitle from "@/shared/components/section-title/SectionTitle";
import Button from "@/shared/ui/button/Button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import HeroControls from "@/shared/sections/Hero/HeroControls";

const ERROR_COLOR = "#c0392b";

const FieldError = ({ msg }) =>
  msg ? (
    <span
      className="block text-left leading-snug"
      style={{ color: ERROR_COLOR, fontSize: "0.75rem" }}
    >
      {msg}
    </span>
  ) : null;

const Page = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [values, setValues] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: "" }));
    setServerError("");
  };

  const validate = () => {
    const next = {};
    if (!values.identifier.trim())
      next.identifier = "Este campo es obligatorio";
    if (!values.password) next.password = "Este campo es obligatorio";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error);
      } else {
        login(data.user);
        router.push("/");
      }
    } catch {
      setServerError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Clase de error: tiñe de rojo el border real del input (ver globals.css).
  const errClass = (field) => (errors[field] ? "inputError" : "");

  return (
    <div className="videoPage relative flex min-h-svh md:min-h-0 md:pr-[0] pr-(--padding-body-mobile-w)">
      {/* Video de fondo — solo mobile */}
      <div className="md:hidden absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/imgs/jockey-trailer.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="md:hidden absolute inset-0 bg-black/40" />

      <HeroControls
        playing={playing}
        muted={muted}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        className="md:hidden absolute top-0 left-0 z-20 p-(--padding-body-mobile-w)"
      />

      <div className="relative w-1/2 h-svh overflow-hidden hidden md:block">
        <Image
          src={"/imgs/frame-godfather-HQ.webp"}
          alt=""
          fill
          className="object-cover object-top"
          loading="eager"
        />
      </div>

      <div className="relative sectionMain md:mt-10 w-full md:w-1/2! flex flex-col gap-10! justify-center md:pr-(--padding-body-desktop-w) pr-(--padding-body-mobile-w)">
        <Link href="/" className="w-fit">
          <Image
            src="/logo/logo-black.svg"
            alt=""
            width={100}
            height={100}
            className="logoImg h-auto w-[70px] object-contain"
          />
        </Link>

        <div className="flex flex-col gap-4">
          <SectionTitle>¡Volviste!</SectionTitle>
          <p className="bodyText">
            Ingresá para ver qué hay de nuevo en el club
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <div className={`glassInput ${errClass("identifier")}`}>
              <input
                type="text"
                placeholder="Mail o Nombre de Usuario"
                value={values.identifier}
                onChange={handleChange("identifier")}
                autoComplete="username"
              />
            </div>
            <FieldError msg={errors.identifier} />
          </div>

          <div className="flex flex-col gap-1">
            <div className={`glassInput ${errClass("password")}`}>
              <input
                type="password"
                placeholder="Contraseña"
                value={values.password}
                onChange={handleChange("password")}
                autoComplete="current-password"
                className="glassInput"
              />
            </div>
            <FieldError msg={errors.password} />
          </div>

          {serverError && (
            <p style={{ color: ERROR_COLOR, fontSize: "0.8rem" }}>
              {serverError}
            </p>
          )}

          <div className="flex gap-2">
            <Button
              variant="primary"
              type="submit"
              className="w-full! md:w-fit!"
            >
              {loading ? "Ingresando…" : "Ingresar"}
            </Button>

            <Button variant="buttonText" className="bodyText w-full! md:w-fit!">
              ¿Olvidaste tu contraseña?
            </Button>
          </div>
        </form>

        <div className="flex flex-col gap-2">
          <p>¿No tenés cuenta?</p>
          <Button
            variant="secondary"
            href="/signup"
            className="w-full! md:w-fit!"
          >
            Registrarme gratis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
