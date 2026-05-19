import React from "react";
import Image from "next/image";
import style from "@/shared/ui/card/card.module.css";

const CardImage = () => {
  return (
    <div className={`${style.cardImgDiv}`}>
      <Image
        src={"/imgs/frame.jpg"}
        alt={"alt"}
        width={100}
        height={100}
        className={`
              h-auto
              w-full
              object-contain
            `}
      />
    </div>
  );
};

export default CardImage;
