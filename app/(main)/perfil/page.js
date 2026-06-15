"use client";

import React, { useState } from "react";

import Button from "@/shared/ui/button/Button";
import CardDetails from "@/shared/ui/card/CardDetails";
import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import DetailIcon from "@/shared/components/detailIcon/DetailIcon";
import ReviewsSection from "@/shared/sections/Reviews/ReviewsSection";
import ListasSection from "@/shared/sections/Listas/ListasSection";

import { funciones as movies } from "@/data.json";
import { useAuth } from "@/contexts/AuthContext";

const STATS = [
  { key: "seguidores", label: "Seguidores", value: 11 },
  { key: "seguidos", label: "Seguidos", value: 8 },
  { key: "peliculas", label: "Películas", value: 47 },
  { key: "listas", label: "Listas", value: 3 },
  { key: "resenas", label: "Reseñas", value: 12 },
  { key: "temas", label: "Temas", value: 5 },
  { key: "watchlist", label: "Watchlist", value: 24 },
];

const page = () => {
  const { user, updateUser } = useAuth();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioValue, setBioValue] = useState("");
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const handleSaveBio = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/users/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, bio: bioValue }),
      });
      if (res.ok) {
        updateUser({ bio: bioValue });
        setIsEditingBio(false);
      }
    } finally {
      setSaving(false);
    }
  };

  const statsProps = Object.fromEntries(
    STATS.map(({ key, label, value }) => [
      key,
      <>
        <strong>{value}</strong> {label}
      </>,
    ]),
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div className={`profileImg w-30! md:w-45`}></div>

        <div className="flex gap-4">
          <Button variant="buttonText" className="font-[600]! text-[.9em]">
            @{user.username}
          </Button>

          <Button variant="primary" className="font-[600]! text-[.9em]">
            Seguir
          </Button>
        </div>

        {isEditingBio ? (
          <div className="flex flex-col gap-2 w-full max-w-xs bodyText">
            <textarea
              rows={3}
              placeholder="Contá algo sobre vos…"
              value={bioValue}
              onChange={(e) => setBioValue(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleSaveBio}>
                {saving ? "Guardando…" : "Guardar"}
              </Button>
              <Button
                variant="buttonText"
                onClick={() => setIsEditingBio(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            {user.bio && <p className="bodyText">{user.bio}</p>}
            <Button
              variant="buttonText"
              icon="pen"
              className="flex-row-reverse bodyText"
              onClick={() => {
                setBioValue(user.bio ?? "");
                setIsEditingBio(true);
              }}
            >
              {user.bio ? "Editar descripción" : "Descripción"}
            </Button>
          </div>
        )}

        <CardDetails
          isProfile={true}
          className="justify-center"
          {...statsProps}
        />
      </div>

      <div className="flex w-full justify-center">
        <CarouselSection
          title={"Favoritos"}
          icon="like"
          items={movies}
          renderItem={(movie) => (
            <MovieCard
              text={true}
              tmdbId={movie.tmdbId}
              actionsIcons={["like", "comentarios"]}
              className={"md:p-[0em]"}
            />
          )}
          setHandlers={false}
          sectionClassName={"md:w-[50svw]!"}
          breakpoints={{
            0: { slidesPerView: 4, spaceBetween: 4 },
            640: { slidesPerView: 4, spaceBetween: 4 },
            1024: { slidesPerView: 4, spaceBetween: 16 },
          }}
        />
      </div>

      <div className="flex w-full justify-center">
        <CarouselSection
          moreButton={true}
          title={"Vistas recientemente"}
          icon="calendario"
          items={user.peliculasVistas}
          className={"rounded-l-[0px]!"}
          renderItem={(movie) => (
            <div className="flex flex-col gap-2">
              <DetailIcon icon="calendario">{movie.watchedDate}</DetailIcon>
              <MovieCard
                tmdbId={movie.tmdbId}
                text={true}
                className={"md:p-[0]"}
              />
            </div>
          )}
          setHandlers={true}
          sectionClassName={""}
          loop={false}
          breakpoints={{
            0: { slidesPerView: 2.5, spaceBetween: 16 },
            640: { slidesPerView: 4, spaceBetween: 16 },
            1024: { slidesPerView: 6, spaceBetween: 16 },
          }}
        />
      </div>

      <ReviewsSection variant="review" title={"Reseñas"} moreButton={true} />
      <ReviewsSection variant="tema" title={"Temas"} moreButton={true} />
      <ListasSection title={"Listas"} moreButton={true} />
    </div>
  );
};

export default page;
