"use client";

import Icon from "@/shared/components/icon/Icon";

// Cartel de estado (feedback). Reutiliza los tokens de color del sistema:
//   success -> greenFill / greenBorder
//   error   -> redFill / redBorder
//   info    -> secondary / touchable
//
// Uso:
//   <Banner variant="success" title="¡Listo!">Tu reseña se publicó.</Banner>
const VARIANTS = {
  success: {
    bg: "var(--greenFill)",
    border: "var(--greenBorder)",
    text: "var(--primary)",
    icon: "circle",
  },
  error: {
    bg: "var(--white)",
    border: "var(--redFill)",
    text: "var(--redFill)",
    icon: "close",
  },
  info: {
    bg: "var(--secondary)",
    border: "var(--touchable)",
    text: "var(--touchable)",
    icon: "comillas",
  },
};

const Banner = ({ variant = "info", title, children, icon, className = "" }) => {
  const v = VARIANTS[variant] ?? VARIANTS.info;
  const iconName = icon ?? v.icon;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 ${className}`}
      style={{ backgroundColor: v.bg, borderColor: v.border, color: v.text }}
    >
      {iconName && (
        <div className="h-5 w-5 shrink-0">
          <Icon name={iconName} variant="default" color={v.text} size="h-5" />
        </div>
      )}
      <div className="flex flex-col gap-1">
        {title && (
          <p className="bodyText font-[700]! leading-tight">{title}</p>
        )}
        {children && <p className="bodyText">{children}</p>}
      </div>
    </div>
  );
};

export default Banner;
