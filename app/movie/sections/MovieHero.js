"use client";

import { useState } from "react";
import Image from "next/image";
import Skeleton from "@/shared/components/skeleton/Skeleton.js";
import FadeIn from "@/shared/components/skeleton/FadeIn.js";

const MovieHero = ({ img, className = "sm:block hidden" }) => {
  const [imgReady, setImgReady] = useState(false);

  return (
    <div className={`${className} relative overflow-hidden`}>
      <FadeIn
        loading={!img || !imgReady}
        skeleton={<Skeleton className="w-full h-[40svh]" />}
      >
        {img && (
          <div className="relative w-full h-[50svh]">
            <Image
              src={img}
              alt=""
              fill
              className="object-cover object-top"
              loading="eager"
              onLoad={() => setImgReady(true)}
            />
          </div>
        )}
      </FadeIn>
    </div>
  );
};

export default MovieHero;
