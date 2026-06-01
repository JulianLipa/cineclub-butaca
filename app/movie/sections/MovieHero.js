"use client";

import { useState } from "react";
import Image from "next/image";
import Skeleton from "@/shared/components/skeleton/Skeleton.js";
import FadeIn from "@/shared/components/skeleton/FadeIn.js";

const MovieHero = ({ img }) => {
  const [imgReady, setImgReady] = useState(false);

  return (
    <div className="sm:block hidden relative overflow-hidden">
      <FadeIn
        loading={!img || !imgReady}
        skeleton={<Skeleton className="w-full h-[45svh]" />}
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
