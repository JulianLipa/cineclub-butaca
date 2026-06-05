import Image from "next/image";
import Skeleton from "@/shared/components/skeleton/Skeleton.js";
import FadeIn from "@/shared/components/skeleton/FadeIn.js";

const PersonaSidebar = ({ data }) => (
  <div className="w-full sm:w-[30%] sm:sticky top-(--header-height) sm:max-h-svh rounded-3xl flex sm:flex-col gap-4 sm:px-4 sm:overflow-y-auto">
    {/* Foto */}
    <div className="w-50 sm:w-[80%] bg-(--white) rounded-3xl sm:p-4 sm:-ml-4">
      <FadeIn
        loading={!data}
        skeleton={<Skeleton className="w-full aspect-[2/3] rounded-3xl" />}
      >
        {data &&
          (data.foto ? (
            <Image
              src={data.foto}
              alt={data.nombre || ""}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full rounded-3xl object-cover object-top"
            />
          ) : (
            <div className="w-full aspect-[2/3] rounded-3xl bg-(--secondary)" />
          ))}
      </FadeIn>
    </div>

    <div className="w-full flex flex-col gap-4">
      {/* Nombre */}
      <FadeIn
        loading={!data}
        skeleton={<Skeleton className="h-8 w-3/4" />}
      >
        {data && <h1 className="font-[600] text-[24px]">{data.nombre}</h1>}
      </FadeIn>

      {/* Departamento */}
      <FadeIn
        loading={!data}
        skeleton={<Skeleton className="h-5 w-1/2" />}
      >
        {data?.departamento && (
          <h2 className="font-[300] text-[16px]">{data.departamento}</h2>
        )}
      </FadeIn>

      {/* Fechas y lugar */}
      <FadeIn
        loading={!data}
        skeleton={<Skeleton className="h-10 w-full" />}
      >
        {data && (
          <div className="flex flex-col gap-1 bodyText" style={{ opacity: 0.7 }}>
            {data.nacimiento && <p>Nació el {data.nacimiento}</p>}
            {data.lugarNacimiento && <p>{data.lugarNacimiento}</p>}
            {data.fallecimiento && <p>Falleció el {data.fallecimiento}</p>}
          </div>
        )}
      </FadeIn>
    </div>
  </div>
);

export default PersonaSidebar;
