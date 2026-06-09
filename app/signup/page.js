"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SectionTitle from "@/shared/components/section-title/SectionTitle";
import Button from "@/shared/ui/button/Button";

const ERROR_COLOR = "#c0392b";

const FieldError = ({ msg }) =>
  msg ? (
    <span
      style={{ color: ERROR_COLOR, fontSize: "0.75rem", marginTop: "-8px" }}
    >
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
    else if (values.password.length < 6) next.password = "Mínimo 6 caracteres";

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

  const inputStyle = (field) =>
    errors[field] ? { borderColor: `${ERROR_COLOR} !important` } : {};

  return (
    <div className="flex sm:pr-[0] pr-(--padding-body-mobile-w)">
      <div className="relative w-1/2 h-svh overflow-hidden hidden sm:block">
        <Image
          src={"/imgs/frame-godfather-HQ.webp"}
          alt=""
          fill
          className="object-cover object-top"
          loading="eager"
        />
      </div>

      <div className="sectionMain sm:mt-10 w-full sm:w-1/2! flex flex-col gap-10! justify-center sm:pr-(--padding-body-desktop-w) pr-(--padding-body-mobile-w)">
        <Image
          src="/logo/logo-black.svg"
          alt=""
          width={100}
          height={100}
          className="h-auto w-[70px] object-contain"
        />

        <div className="flex flex-col gap-4">
          <SectionTitle>Creá tu cuenta</SectionTitle>
          <p className="bodyText">Unite al club y seguí cada función</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 flex-1">
              <input
                type="text"
                placeholder="Nombre"
                value={values.nombre}
                onChange={handleChange("nombre")}
                style={inputStyle("nombre")}
                autoComplete="given-name"
              />
              <FieldError msg={errors.nombre} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <input
                type="text"
                placeholder="Apellido"
                value={values.apellido}
                onChange={handleChange("apellido")}
                style={inputStyle("apellido")}
                autoComplete="family-name"
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
              style={inputStyle("username")}
              autoComplete="username"
            />
            <FieldError msg={errors.username} />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Mail"
              value={values.mail}
              onChange={handleChange("mail")}
              style={inputStyle("mail")}
              autoComplete="email"
            />
            <FieldError msg={errors.mail} />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Contraseña"
              value={values.password}
              onChange={handleChange("password")}
              style={inputStyle("password")}
              autoComplete="new-password"
            />
            <FieldError msg={errors.password} />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Repetir Contraseña"
              value={values.repeatPassword}
              onChange={handleChange("repeatPassword")}
              style={inputStyle("repeatPassword")}
              autoComplete="new-password"
            />
            <FieldError msg={errors.repeatPassword} />
          </div>

          {serverError && (
            <p style={{ color: ERROR_COLOR, fontSize: "0.8rem" }}>
              {serverError}
            </p>
          )}

          <Button variant="primary" type="submit" className="w-full! sm:w-fit!">
            {loading ? "Registrando…" : "Registrarme gratis"}
          </Button>
        </form>

        <div className="flex flex-col gap-2">
          <p>¿Ya tenés cuenta?</p>
          <Button
            variant="secondary"
            href="/login"
            className="w-full! sm:w-fit!"
          >
            Ingresar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
