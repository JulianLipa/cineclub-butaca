import Image from "next/image";
import Link from "next/link";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import ArchivoPhoto from "@/shared/ui/archivoPhoto/ArchivoPhoto";
import { funcionesPasadas } from "@/data.json";

const FOTOS = [
  { img: "/imgs/image18.png",  alt: "Proyección El Padrino",  span: "col-span-2 row-span-2" },
  { img: "/imgs/image20.png",  alt: "Función Carrie",         span: "col-span-1 row-span-1" },
  { img: "/imgs/image22.png",  alt: "Debate cinéfilo",        span: "col-span-1 row-span-2" },
  { img: "/imgs/image242.png", alt: "Sala llena",             span: "col-span-1 row-span-1" },
  { img: "/imgs/image55.png",  alt: "Presentación",           span: "col-span-2 row-span-1" },
  { img: "/imgs/image56.png",  alt: "Detalle sala",           span: "col-span-1 row-span-1" },
  { img: "/imgs/image57.png",  alt: "Sesión de cierre",       span: "col-span-1 row-span-2" },
  { img: "/imgs/image58.png",  alt: "Pantalla grande",        span: "col-span-2 row-span-1" },
  { img: "/imgs/image59.png",  alt: "Charla post-función",    span: "col-span-1 row-span-1" },
  { img: "/imgs/image60.png",  alt: "Entrada al cine",        span: "col-span-1 row-span-1" },
];


// Asocia una foto del grid con la función pasada a la que pertenece (por path).
const findFuncion = (img) =>
  funcionesPasadas.find((f) => f.fotos?.includes(img));

export default function ArchivoPage() {
  return (
    <div className="flex flex-col gap-12">

      {/* Galería de fotos */}
      <section className="flex flex-col gap-4">
        <SectionTitleIcon icon="triangle">Fotos del proyecto</SectionTitleIcon>
        <div className="grid grid-cols-4 max-[600px]:grid-cols-2 auto-rows-[120px] sm:auto-rows-[160px] gap-2">
          {FOTOS.map((foto, i) => (
            <ArchivoPhoto
              key={i}
              img={foto.img}
              alt={foto.alt}
              funcion={findFuncion(foto.img)}
              span={foto.span}
            />
          ))}
        </div>
      </section>

      {/* Funciones pasadas */}
      <section className="flex flex-col gap-4">
        <SectionTitleIcon icon="triangle">Funciones pasadas</SectionTitleIcon>
        <div className="flex flex-col gap-4">
          {funcionesPasadas.map((f) => (
            <Link
              key={f.id}
              href={`/archivo/${f.id}`}
              className="flex gap-4 rounded-2xl overflow-hidden [box-shadow:inset_0_0_0_1px_var(--primary)] p-3 sm:p-4 hover:opacity-70 transition-opacity duration-150"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={f.fotos?.[0] ?? "/imgs/frame.jpg"}
                  alt={f.titulo}
                  fill
                  sizes="(max-width: 600px) 96px, 128px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-1.5 min-w-0">
                <p className="bodyText font-[700]! text-[1em] leading-snug">
                  {f.titulo}
                  <span className="font-[400]! opacity-60 ml-1.5 text-[.85em]">{f.anio}</span>
                </p>
                <p className="bodyText text-[.82em] opacity-70">{f.director}</p>
                <p className="bodyText text-[.78em] opacity-50">{f.fecha}</p>
                <p className="bodyText text-[.78em] opacity-60 mt-0.5">
                  {f.asistentes} asistentes
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
