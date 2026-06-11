import Button from "@/shared/ui/button/Button";

export default function NotFound() {
  return (
    <div
      style={{
        fontFamily: "var(--font-inter, sans-serif)",
        color: "var(--primary, #48250b)",
        backgroundColor: "var(--white, #fff8f2)",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px var(--padding-body-desktop-w, 80px)",
        gap: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          fontSize: "clamp(6rem, 30vw, 18rem)",
          fontWeight: 800,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "2px var(--primary, #48250b)",
          opacity: 0.08,
          position: "absolute",
          left: "var(--padding-body-desktop-w, 80px)",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          userSelect: "none",
          margin: 0,
        }}
      >
        404
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "relative" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, margin: 0 }}>
          Error 404
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.1, margin: 0 }}>
          Esta función<br />no existe.
        </h1>
        <p style={{ fontSize: "0.8rem", fontWeight: 350, maxWidth: "28rem", margin: 0, lineHeight: 1.6 }}>
          La página que buscás no está en cartelera. Puede que haya sido removida o que la URL sea incorrecta.
        </p>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", position: "relative" }}>
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
