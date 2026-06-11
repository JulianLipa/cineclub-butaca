"use client";

import React from "react";
import Link from "next/link";
import Icon from "@/shared/components/icon/Icon";
import Image from "next/image";

import style from "@/shared/ui/button/Button.module.css";

const Button = ({
  children,
  variant,
  href,
  onClick,
  type = "button",
  icon,
  className = "",
  color,
  img,
}) => {
  const iconVariant = variant === "secondary" ? "negative" : "default";

  const [isHovered, setIsHovered] = React.useState(false);

  // Color dinámico del ícono
  const getIconColor = () => {
    if (variant === "buttonText") return "var(--primary)";
    if (variant === "secondary") {
      return isHovered ? "var(--white)" : "var(--touchable)";
    }
    if (variant === "primary") {
      return isHovered ? "var(--touchable)" : "var(--white)";
    }
    return "var(--white)";
  };

  const iconComponent = icon && (
    <div className="h-4 w-4 shrink-0">
      <Icon name={icon} variant={iconVariant} color={color || getIconColor()} />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${style.button} ${style[variant]} gap-2 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {iconComponent}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${style.button} ${style[variant]} ${className} gap-2`}
    >
      {iconComponent}
      {img && (
        <div className="h-6 w-6 shrink-0">
          <Image
            src={`/imgs/${img}.png`}
            alt=""
            width={100}
            height={100}
            className="h-full w-full object-contain"
          />
        </div>
      )}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
