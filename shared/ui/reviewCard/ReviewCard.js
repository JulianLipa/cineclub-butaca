import Link from "next/link";
import UserBadge from "@/shared/ui/user/userBadge/UserBadge";
import Actions from "@/shared/ui/userActions/Actions.js";
import StarSection from "@/shared/components/starSection/StarSection";
import MovieCard from "@/shared/ui/movieCard/MovieCard";

const ReviewCard = ({ data, singleMovie, variant }) => {
  const isTema = variant === "tema";
  const href = data?.id
    ? `/${isTema ? "tema" : "resena"}/${data.id}`
    : undefined;
  const showMovie = !isTema && !singleMovie;

  return (
    <div className="relative flex w-full gap-4 rounded-2xl p-4 sm:p-8 borderButton">
      {/* Link que cubre toda la card (stretched link) */}
      {href && (
        <Link
          href={href}
          aria-label={isTema ? data?.titulo : `Reseña de @${data?.username}`}
          className="absolute inset-0 rounded-2xl"
        />
      )}

      {showMovie && (
        <div className="h-full w-[30%] shrink-0">
          <MovieCard tmdbId={data?.tmdbId} interactive={false} />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4">
        {/* UserBadge y Actions van por encima del link (z-10) */}
        <div className="relative z-10 w-fit">
          <UserBadge username={data?.username} />
        </div>

        {isTema && data?.titulo && (
          <h4 className="text-[1.05em]" style={{ color: "var(--primary)" }}>
            {data.titulo}
          </h4>
        )}

        {!isTema && <StarSection rating={data?.rating} />}

        <p className="bodyText line-clamp-4">
          {data?.text ??
            "Es un clásico del terror psicológico con un final muy fuerte. No es solo miedo, es tristeza y rabia acumulada."}
        </p>

        <div className="relative z-10 w-fit">
          <Actions
            icons={["like", "comentarios"]}
            values={{
              like: data?.likes,
              comentarios: data?.comentarios?.length,
            }}
            className="text-[.9em]"
            variant="buttonText"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
