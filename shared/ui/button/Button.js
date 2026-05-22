import React from "react";
import Link from "next/link";
import Icon from "@/shared/components/icon/Icon";

import style from "@/shared/ui/button/Button.module.css";

const Button = ({
  children,
  variant,
  href,
  onClick,
  type = "button",
  icon,
  className = "",
}) => {
  /* si tiene href => Link */
  if (href) {
    return (
      <Link href={href} className={`${style.button} ${style[variant]}`}>
        {icon && (
          <div className="w-[15px] shrink-0">
            <Icon name={icon} variant="default" />
          </div>
        )}

        <span className={className}>{children}</span>
      </Link>
    );
  }

  /* si no => button normal */
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style.button} ${style[variant]}`}
    >
      {icon && (
        <div className="w-[13px] shrink-0">
          <Icon name={icon} variant="default" />
        </div>
      )}

      <span className={`${className}`}>{children}</span>
    </button>
  );
};

export default Button;
