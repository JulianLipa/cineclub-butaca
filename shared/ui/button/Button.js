import React from "react";
import Link from "next/link";

import style from "@/shared/ui/button/Button.module.css";

const Button = ({ children, variant, href, onClick, type = "button" }) => {
  /* si tiene href => Link */
  if (href) {
    return (
      <Link href={href} className={`${style.button} ${style[variant]}`}>
        {children}
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
      {children}
    </button>
  );
};

export default Button;
