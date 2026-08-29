"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SectionTitle from "@/shared/components/section-title/SectionTitle";
import Button from "@/shared/ui/button/Button";
import Link from "next/link";
import HeroControls from "@/shared/sections/Hero/HeroControls";

const FieldError = ({ msg }) =>
  msg ? (
    <span className="block text-left leading-snug text-(--redFill)! text-[0.75rem]">
      {msg}
    </span>
  ) : null;

const INITIAL = {
  nombre: "",
  apellido: "",
  username: "",
  mail: "",
  password: "",
  repeatPassword: "",
};

const Page = () => {
  const router = useRouter();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
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

    if (!values.nombre.trim()) next.nombre = "Este campo es obligatorio";
    else if (values.nombre.trim().length < 2)
      next.nombre = "Mínimo 2 caracteres";

    if (!values.apellido.trim()) next.apellido = "Este campo es obligatorio";
    else if (values.apellido.trim().length < 2)
      next.apellido = "Mínimo 2 caracteres";

    if (!values.username.trim()) next.username = "Este campo es obligatorio";
    else if (values.username.trim().length < 3)
      next.username = "Mínimo 3 caracteres";
    else if (!/^[a-zA-Z0-9_]+$/.test(values.username))
      next.username = "Solo letras, números y guión bajo";

    if (!values.mail.trim()) next.mail = "Este campo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.mail))
      next.mail = "Ingresá un mail válido";

    if (!values.password) next.password = "Este campo es obligatorio";
    else if (
      values.password.length < 8 ||
      !/[a-z]/.test(values.password) ||
      !/[A-Z]/.test(values.password) ||
      !/[0-9]/.test(values.password)
    )
      next.password = "Mínimo 8 caracteres, con mayúscula, minúscula y número";

    if (!values.repeatPassword)
      next.repeatPassword = "Este campo es obligatorio";
    else if (values.repeatPassword !== values.password)
      next.repeatPassword = "Las contraseñas no coinciden";

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
      const { repeatPassword: _, ...payload } = values;
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.field) {
          setErrors((err) => ({ ...err, [data.field]: data.error }));
        } else {
          setServerError(data.error);
        }
      } else {
        router.push("/login");
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
    <div className="videoPage relative flex h-svh overflow-hidden">
      {/* Video de fondo — solo mobile */}
      <div className="sm:hidden absolute inset-0 overflow-hidden">
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
      <div className="sm:hidden absolute inset-0 bg-black/40" />

      <div className="relative w-1/2 h-svh overflow-hidden hidden sm:block">
        <Image
          src={"/imgs/frame-godfather-HQ.webp"}
          alt=""
          fill
          className="object-cover object-top"
          loading="eager"
        />
      </div>

      <div className="relative sectionMain w-full sm:w-1/2! noScrollbar sm:pr-(--padding-body-desktop-w) pr-(--padding-body-mobile-w) overflow-y-auto h-full">
        <div className="flex flex-col gap-10 sm:py-10 min-h-full justify-center">
          <div className="flex w-full justify-between items-center">
            <Link href="/" className="w-fit">
              <Image
                src="/logo/logo-black.svg"
                alt=""
                width={100}
                height={100}
                className="logoImg h-auto w-[70px] object-contain"
              />
            </Link>

            <HeroControls
              playing={playing}
              muted={muted}
              onTogglePlay={togglePlay}
              onToggleMute={toggleMute}
              className="sm:hidden h-fit"
            />
          </div>

          <div className="flex flex-col gap-4">
            <SectionTitle>Creá tu cuenta</SectionTitle>
            <p className="bodyText">Unite al club y seguí cada función</p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="flex gap-2">
              <div className="flex flex-col gap-2 flex-1">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={values.nombre}
                  onChange={handleChange("nombre")}
                  autoComplete="given-name"
                  className={`glassInput ${errClass("nombre")}`}
                />
                <FieldError msg={errors.nombre} />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <input
                  type="text"
                  placeholder="Apellido"
                  value={values.apellido}
                  onChange={handleChange("apellido")}
                  autoComplete="family-name"
                  className={`glassInput ${errClass("apellido")}`}
                />
                <FieldError msg={errors.apellido} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={values.username}
                onChange={handleChange("username")}
                autoComplete="username"
                className={`glassInput ${errClass("username")}`}
              />
              <FieldError msg={errors.username} />
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Mail"
                value={values.mail}
                onChange={handleChange("mail")}
                autoComplete="email"
                className={`glassInput ${errClass("mail")}`}
              />
              <FieldError msg={errors.mail} />
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="password"
                placeholder="Contraseña"
                value={values.password}
                onChange={handleChange("password")}
                autoComplete="new-password"
                className={`glassInput ${errClass("password")}`}
              />
              <FieldError msg={errors.password} />
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="password"
                placeholder="Repetir Contraseña"
                value={values.repeatPassword}
                onChange={handleChange("repeatPassword")}
                autoComplete="new-password"
                className={`glassInput ${errClass("repeatPassword")}`}
              />
              <FieldError msg={errors.repeatPassword} />
            </div>

            {serverError && (
              <p className="text-(--redFill) text-[0.8rem]">{serverError}</p>
            )}

            <Button
              variant="primary"
              type="submit"
              className="w-full! sm:w-fit!"
            >
              {loading ? "Registrando…" : "Registrarme gratis"}
            </Button>
          </form>

          <div className="flex flex-col items-center md:items-baseline gap-2">
            <p>¿Ya tenés cuenta?</p>
            <Button
              variant="secondary"
              href="/login"
              className="w-full! sm:w-fit! btn-mobile-login"
            >
              Ingresar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
