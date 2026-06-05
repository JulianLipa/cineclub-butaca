"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import CardImage from "@/shared/ui/card/CardImage";
import Button from "@/shared/ui/button/Button";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import style from "@/shared/ui/card/card.module.css";

const CicloCard = ({ id, title, description, portada, tmdbId, isActive, onClick }) => {
  const router = useRouter();
  const [tmdbData, setTmdbData] = useState(null);
  const loading = !portada && !tmdbData;

  useEffect(() => {
    if (!tmdbId || portada) return;
    fetch(`/api/movies?id=${tmdbId}&preview=true`)
      .then((r) => r.json())
      .then(setTmdbData)
      .catch(() => {});
  }, [tmdbId, portada]);

  const imgSrc = portada || tmdbData?.frame;

  return (
    <section className="flex flex-col">
      <div
        className={`${style.cardBox} ${isActive ? style.card : ""} rounded-xl`}
        onClick={isActive ? () => router.push(`/ciclo/${id}`) : undefined}
      >
        {/* Vista expandida */}
        <div className={`${style.cardContent} ${isActive ? style.visible : style.hidden}`}>
          <CardImage poster={imgSrc} loading={loading} />

          <div className={style.cardDivText}>
            <div className="w-fit">
              {loading ? (
                <Skeleton className="h-8 w-48 mb-2" />
              ) : (
                <Button variant="buttonText" className="text-left text-[24px]! font-[600]!">
                  {title}
                </Button>
              )}
            </div>

            {description && (
              loading ? (
                <Skeleton className="h-12 w-full" />
              ) : (
                <p className="bodyText text-[0.9em] opacity-80">{description}</p>
              )
            )}

            <div className={`flex w-full gap-2 ${style.buttonDiv}`}>
              <Button variant="primary">Ver ciclo</Button>
              <Button variant="secondary">Ver programa</Button>
            </div>
          </div>
        </div>

        {/* Vista contraída */}
        <div
          className={`${style.contractedView} rounded-xl overflow-hidden borderButton ${!isActive ? style.visible : style.hidden}`}
          onClick={onClick}
          style={{ cursor: !isActive ? "pointer" : "default" }}
        >
          <div className={style.cardImgContracted}>
            {loading ? (
              <Skeleton className="w-full h-full rounded-none" />
            ) : (
              <Image
                src={imgSrc || "/imgs/frame.jpg"}
                alt={title || ""}
                width={200}
                height={100}
                className="h-auto w-full object-contain"
              />
            )}
          </div>

          <div className={style.cardImgContractedText}>
            {loading ? (
              <Skeleton className="h-5 w-3/4" />
            ) : (
              <p className="text-left bodyText text-[1em]! font-[600]!">{title}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CicloCard;
