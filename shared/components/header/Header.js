import React from "react";
import style from "./Header.module.css";
import Image from "next/image";

import Button from "@/shared/ui/button/Button";

const Header = () => {
  return (
    <div className={`${style.header} flex gap-10 items-center justify-between`}>
      <div className="flex w-full sm:w-auto gap-10 items-center">
        <div className="w-full flex justify-center">
          <Image
            src={"/logo/logo-black.svg"}
            alt=""
            width={100}
            height={100}
            className="h-auto w-12 sm:w-15 object-contain"
          />
        </div>

        <div className="hidden gap-10 sm:flex">
          <p>Funciones</p>
          <p>Comunidad</p>
          <p>Archivo</p>
          <p>Perfil</p>
        </div>
      </div>

      <div className="hidden gap-10 sm:flex">
        <Button variant="primary">Quiero mi Butaca</Button>
      </div>
    </div>
  );
};

export default Header;
