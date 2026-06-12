import Image from "next/image";
import UserBadge from "@/shared/ui/user/userBadge/UserBadge";
import Button from "@/shared/ui/button/Button";
import Actions from "@/shared/ui/userActions/Actions";

const FrameCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Image
          src={data.img}
          alt={data.movieTitle}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <UserBadge username={data.username} />
          <Button variant="buttonText" className="font-[400]! bodyText text-left!" href={`/movie/${data.tmdbId}`}>
            {data.movieTitle}{data.anio && `, ${data.anio}`}
          </Button>
        </div>
        {data.caption && (
          <p className="bodyText text-sm">{data.caption}</p>
        )}
        <Actions icons={["like", "comentarios"]} className="text-[.9em]" variant="buttonText" />
      </div>
    </div>
  );
};

export default FrameCard;
