"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import style from "@/shared/ui/card/card.module.css";
import Skeleton from "@/shared/components/skeleton/Skeleton";

const CardImage = ({ poster, loading }) => {
  const [imgReady, setImgReady] = useState(false);

  useEffect(() => {
    setImgReady(false);
  }, [poster]);

  return (
    <div className={`${style.cardImgDiv} relative`}>
      {(loading || !imgReady) && (
        <Skeleton className="absolute inset-0 rounded-none" />
      )}
      {!loading && (
        <Image
          src={poster || "/imgs/frame.jpg"}
          alt=""
          width={400}
          height={200}
          className="h-auto w-full object-contain"
          loading="eager"
          onLoad={() => setImgReady(true)}
        />
      )}
    </div>
  );
};

export default CardImage;
