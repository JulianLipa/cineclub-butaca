"use client";

import { useParams } from "next/navigation";

import BackButton from "@/shared/components/backButton/BackButton";
import UserBadge from "@/shared/ui/user/userBadge/UserBadge";
import Actions from "@/shared/ui/userActions/Actions";
import CommentsSection from "@/shared/sections/Comments/CommentsSection";
import { getTemaById } from "@/data/comunidad";

const Page = () => {
  const { id } = useParams();
  const tema = getTemaById(id);

  if (!tema) {
    return <div className="pt-20 bodyText">Tema no encontrado.</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8! pb-20">
      <BackButton />

      <div className="flex flex-col gap-4">
        <UserBadge username={tema.username} />

        {tema.titulo && (
          <h1
            className="text-[1.6em] font-[700] leading-tight sm:text-[2em]"
            style={{ color: "var(--primary)" }}
          >
            {tema.titulo}
          </h1>
        )}

        <span className="bodyText text-[.8em] opacity-50">{tema.fecha}</span>

        <p className="bodyText text-[1em]">{tema.text}</p>

        <Actions
          icons={["like", "comentarios"]}
          values={{ like: tema.likes, comentarios: tema.comentarios.length }}
          variant="buttonText"
        />
      </div>

      <div className="border-t border-(--primary) opacity-20" />

      <CommentsSection comentarios={tema.comentarios} />
    </div>
  );
};

export default Page;
