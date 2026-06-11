"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="sectionMain flex flex-col gap-6! min-h-[60svh] justify-center">
      <h1 className="text-[2rem]! font-[700]!">Algo salió mal</h1>
      <p className="bodyText">
        Ocurrió un error inesperado. Podés volver al inicio o intentar de nuevo.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="borderButton rounded-2xl px-6 py-3 bodyText font-[500]!"
        >
          Ir al inicio
        </button>
        <button
          onClick={() => router.refresh()}
          className="bodyText opacity-60"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
