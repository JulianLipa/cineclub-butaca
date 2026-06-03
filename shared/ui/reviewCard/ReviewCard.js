import UserBadge from "@/shared/ui/user/userBadge/UserBadge";
import Actions from "@/shared/ui/userActions/Actions.js";
import Image from "next/image";
import StarSection from "@/shared/components/starSection/StarSection";

const ReviewCard = ({ data, singleMovie, variant }) => {
  return (
    <div className="flex w-full rounded-2xl p-4 sm:p-8 gap-4 borderButton">
      {variant !== "tema" && !singleMovie && (
        <div className="h-full w-[30%]">
          <Image
            src="/imgs/carrie-img.jpg"
            alt="Carrie"
            width={200}
            height={300}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-auto w-full rounded-[.5em] sm:rounded-[1em] object-cover"
            priority={false}
          />
        </div>
      )}

      <div className="gap-4 flex flex-col flex-1">
        <UserBadge />

        {variant !== "tema" && <StarSection />}

        <p className="bodyText">
          Es un clásico del terror psicológico con un final muy fuerte. No es
          solo miedo, es tristeza y rabia acumulada.
        </p>

        <Actions
          icons={["like", "comentarios"]}
          className="text-[.9em]"
          variant="buttonText"
        />
      </div>
    </div>
  );
};

export default ReviewCard;
