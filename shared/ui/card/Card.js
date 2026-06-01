"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import CardImage from "@/shared/ui/card/CardImage";
import CardText from "@/shared/ui/card/CardText";
import style from "@/shared/ui/card/card.module.css";
import Button from "@/shared/ui/button/Button";
import DetailIcon from "@/shared/components/detailIcon/DetailIcon";
import Skeleton from "@/shared/components/skeleton/Skeleton";

const Card = ({ tmdbId, isActive, hideDate, onClick, ...props }) => {
  const [tmdbData, setTmdbData] = useState(null);
  const loading = !tmdbData;

  useEffect(() => {
    if (!tmdbId) return;
    fetch(`/api/movies?id=${tmdbId}&preview=true`)
      .then((r) => r.json())
      .then(setTmdbData)
      .catch(() => {});
  }, [tmdbId]);

  return (
    <section className={`flex flex-col ${!isActive ? "gap-4" : ""}`}>
      <div
        className={`${!isActive ? "min-h-[3em]" : ""} flex items-center ${style.dateDetailSection}`}
      >
        {!isActive && !hideDate ? (
          <div className="flex items-center">
            <DetailIcon icon="calendario">{props.date}</DetailIcon>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`${style.cardBox} ${isActive ? style.card : ""} rounded-xl`}
      >
        <div
          className={`${style.cardContent} ${isActive ? style.visible : style.hidden}`}
        >
          <CardImage poster={tmdbData?.frame} loading={loading} />

          <CardText
            {...props}
            titulo={tmdbData?.titulo}
            anio={tmdbData?.anio}
            loading={loading}
            tmdbId={tmdbId}
            hrefMain=""
            hrefSecondary=""
            textButtonMain="Comprar entradas"
            textButtonSecondary="Ver más"
          />
        </div>

        <div
          className={`${style.contractedView} rounded-xl overflow-hidden ${!isActive ? style.visible : style.hidden}`}
          onClick={onClick}
          style={{ cursor: !isActive ? "pointer" : "default" }}
        >
          <div className={style.cardImgContracted}>
            {loading ? (
              <Skeleton className="w-full h-full rounded-none" />
            ) : (
              <Image
                src={tmdbData?.frame || "/imgs/frame.jpg"}
                alt={tmdbData?.titulo || ""}
                width={100}
                height={100}
                className="h-auto w-full object-contain"
              />
            )}
          </div>

          <div className={style.cardImgContractedText}>
            {loading ? (
              <Skeleton className="h-5 w-3/4" />
            ) : (
              <Button
                variant="buttonText"
                className="text-left text-[1em] font-[600]!"
              >
                {tmdbData?.titulo}, {tmdbData?.anio}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
