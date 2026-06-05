import Image from "next/image";
import Link from "next/link";
import Skeleton from "@/shared/components/skeleton/Skeleton.js";
import FadeIn from "@/shared/components/skeleton/FadeIn.js";
import style from "@/shared/ui/movieCard/movieCard.module.css";

const PersonCard = ({ data, loading }) => {
  const Wrapper = data?.id ? Link : "div";
  const wrapperProps = data?.id
    ? { href: `/persona/${data.id}` }
    : {};

  return (
    <FadeIn
      loading={loading}
      ready={!!data}
      skeleton={
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full aspect-square rounded-2xl" />
          <Skeleton className="h-4 w-3/4 rounded" />
          <Skeleton className="h-3 w-1/2 rounded" />
        </div>
      }
    >
      {data && (
        <Wrapper
          {...wrapperProps}
          className={`flex w-full flex-col ${style.movieCard}`}
        >
          {data.foto ? (
            <Image
              src={data.foto}
              alt={data.nombre || ""}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full aspect-square object-cover object-top rounded-2xl"
            />
          ) : (
            <div className="w-full aspect-square rounded-2xl bg-(--secondary)" />
          )}

          <div className={`flex flex-col gap-1 pt-2 ${style.content}`}>
            <p className="text-[.9em] font-[500]">{data.nombre}</p>
            <p className="text-[.8em] font-[300] opacity-70">
              {data.personaje || data.rol}
            </p>
          </div>
        </Wrapper>
      )}
    </FadeIn>
  );
};

export default PersonCard;
