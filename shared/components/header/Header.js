"use client";

import { useEffect } from "react";
import style from "./Header.module.css";
import Image from "next/image";

import Button from "@/shared/ui/button/Button";
import Link from "next/link";

const Header = () => {
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${header.offsetHeight}px`,
        );
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  return (
    <div className={`${style.header} flex gap-10 items-center justify-between`}>
      <div className="flex w-full sm:w-auto gap-10 items-center">
        <div className="w-full flex justify-center">
          <Link href={"/"}>
            <Image
              src={"/logo/logo-black.svg"}
              alt=""
              width={100}
              height={100}
              className="h-auto w-12 sm:w-15 object-contain"
            />
          </Link>
        </div>

        <div className="hidden gap-10 sm:flex">
          <Button
            variant="buttonText"
            className="bodyText text-(--primary) text-[1em]!"
          >
            Funciones
          </Button>

          <Button
            variant="buttonText"
            className="bodyText text-(--primary) text-[1em]!"
          >
            Comunidad
          </Button>

          <Button
            variant="buttonText"
            className="bodyText text-(--primary) text-[1em]!"
          >
            Archivo
          </Button>

          <Button
            variant="buttonText"
            className="bodyText text-(--primary) text-[1em]!"
          >
            Perfil
          </Button>
        </div>
      </div>

      <div className="hidden gap-10 sm:flex">
        <Button variant="primary">Quiero mi Butaca</Button>
      </div>
    </div>
  );
};

export default Header;
