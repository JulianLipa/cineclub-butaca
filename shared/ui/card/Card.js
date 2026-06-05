"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import CardImage from "@/shared/ui/card/CardImage";
import CardText from "@/shared/ui/card/CardText";
import style from "@/shared/ui/card/card.module.css";
import DetailIcon from "@/shared/components/detailIcon/DetailIcon";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import { formatScreeningDisplay } from "@/lib/dates";

const Card = ({ tmdbId, isActive, hideDate, onClick, ...props }) => {
  const router = useRouter();
  const [tmdbData, setTmdbData] = useState(null);
  const loading = !tmdbData;

  const displayDate = formatScreeningDisplay(props.date);

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
            <DetailIcon icon="calendario">{displayDate}</DetailIcon>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`${style.cardBox} ${isActive ? style.card : ""} rounded-xl`}
        onClick={isActive ? () => router.push(`/movie/${tmdbId}`) : undefined}
      >
        <div
          className={`${style.cardContent} ${isActive ? style.visible : style.hidden}`}
        >
          <CardImage poster={tmdbData?.frame} loading={loading} />

          <CardText
            {...props}
            date={displayDate}
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
          className={`${style.contractedView} rounded-xl overflow-hidden borderButton ${!isActive ? style.visible : style.hidden}`}
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
              <p
                className="text-left bodyText text-[1em]! font-[600]!"
              >
                {tmdbData?.titulo}, {tmdbData?.anio}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
