import Link from "next/link";
import Button from "@/shared/ui/button/Button";

export default function NotFound() {
  return (
    <div className="sectionMain min-h-[80svh] flex flex-col justify-center gap-8!">

      <p
        className="font-[800] leading-none select-none"
        style={{
          fontSize: "clamp(6rem, 30vw, 18rem)",
          color: "transparent",
          WebkitTextStroke: "2px var(--primary)",
          opacity: 0.12,
          position: "absolute",
          left: "var(--padding-body-desktop-w)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        404
      </p>

      <div className="flex flex-col gap-4 relative">
        <p className="bodyText font-[500]! uppercase tracking-widest opacity-50">
          Error 404
        </p>
        <h1 className="text-[2rem]! sm:text-[3rem]! font-[700]! leading-tight!">
          Esta función<br />no existe.
        </h1>
        <p className="bodyText max-w-sm">
          La página que buscás no está en cartelera. Puede que haya sido removida o que la URL sea incorrecta.
        </p>
      </div>

      <div className="flex gap-4 flex-wrap relative">
        <Button variant="primary" href="/">
          Ir al inicio
        </Button>
        <Button variant="secondary" href="/funciones">
          Ver funciones
        </Button>
      </div>

    </div>
  );
}
