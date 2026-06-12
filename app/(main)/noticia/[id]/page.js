"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import BackButton from "@/shared/components/backButton/BackButton";

const NOTICIAS = [
  {
    id: "1",
    img: "/imgs/noticia-festival.jpg",
    titulo: "El cine argentino arrasa en los festivales internacionales de 2026",
    copete: "Tres películas nacionales compiten en Cannes, Berlín y San Sebastián.",
    tematicas: ["Cine argentino", "Festivales", "Internacional"],
    descripcion: "Una nueva generación de directores y directoras argentinas está conquistando los principales festivales de cine del mundo. Con propuestas arriesgadas y una mirada propia, el cine nacional vuelve a posicionarse en el mapa global.\n\nEste año, tres largometrajes compiten en las secciones oficiales de Cannes, Berlín y San Sebastián, marcando un hito histórico para la industria nacional. Los realizadores destacan la importancia del apoyo estatal y la formación de nuevos talentos en escuelas de cine.\n\nLos críticos internacionales señalan la madurez narrativa y la valentía estética de estas obras como factores determinantes en su selección. Una tendencia que, esperan, se consolide en los próximos años.",
    autor: "Redacción Butaca",
    fecha: "10 de junio, 2026",
  },
  {
    id: "2",
    img: "/imgs/cineteca-nacional.jpg",
    titulo: "Restauran en 4K los clásicos del cine latinoamericano de los 60 y 70",
    copete: "La Cinemateca Nacional lidera un ambicioso proyecto de preservación.",
    tematicas: ["Restauración", "Patrimonio", "Clásicos"],
    descripcion: "Un proyecto sin precedentes busca recuperar y digitalizar más de 200 títulos del cine latinoamericano de las décadas del 60 y 70.\n\nLas copias originales, muchas en estado crítico, serán escaneadas en 4K para preservarlas para las futuras generaciones. El trabajo implica meses de limpieza fotograma a fotograma y reconstrucción de bandas sonoras deterioradas.\n\nLa iniciativa cuenta con el apoyo de cinematecas de Argentina, Brasil, México y Chile, y se espera que los primeros títulos restaurados estén disponibles para proyección pública a finales de año.",
    autor: "Lucía Martínez",
    fecha: "8 de junio, 2026",
  },
  {
    id: "3",
    img: "/imgs/cineclub.jpg",
    titulo: "Los cine-clubes independientes resisten y crecen en las grandes ciudades",
    copete: "Nuevos espacios de proyección y debate cinéfilo emergen en todo el país.",
    tematicas: ["Cine-clubes", "Cultura", "Comunidad"],
    descripcion: "A contracorriente de las plataformas de streaming y los multiplex, los cine-clubes independientes están viviendo un momento de renovado interés.\n\nNuevas generaciones de espectadores buscan el debate colectivo y la experiencia compartida del cine. Espacios como salas de barrio, centros culturales y bares con proyector se convierten en puntos de encuentro donde la película es solo el punto de partida.\n\nBuenos Aires, Córdoba, Rosario y Mendoza encabezan este movimiento, con más de 40 cine-clubes activos que programan ciclos temáticos, retrospectivas y estrenos alternativos.",
    autor: "Tomás Rodríguez",
    fecha: "5 de junio, 2026",
  },
  {
    id: "4",
    img: "/imgs/dir-fotografia.jpg",
    titulo: "Entrevista exclusiva: el director de fotografía detrás de las imágenes del año",
    copete: "Hablamos con quien redefine el lenguaje visual del cine contemporáneo.",
    tematicas: ["Entrevista", "Fotografía", "Técnica"],
    descripcion: "En una charla íntima y reveladora, el director de fotografía más premiado del último año comparte su proceso creativo y sus influencias.\n\nDesde sus primeros trabajos en publicidad hasta convertirse en el referente visual de una nueva generación de cineastas, su trayectoria es un ejemplo de dedicación y búsqueda constante. Habla de la luz natural, del trabajo con actores y de cómo la tecnología digital transformó su manera de pensar la imagen.\n\n\"La cámara no miente, pero sí puede mentir el ojo que está detrás\", dice, sintetizando una filosofía que atraviesa toda su obra.",
    autor: "Ana Fernández",
    fecha: "3 de junio, 2026",
  },
  {
    id: "5",
    img: "/imgs/ia.webp",
    titulo: "El debate sobre la IA en el cine: ¿herramienta o amenaza?",
    copete: "Directores, guionistas y técnicos se dividen frente a la inteligencia artificial.",
    tematicas: ["IA", "Industria", "Debate"],
    descripcion: "La irrupción de la inteligencia artificial en la producción cinematográfica genera posiciones encontradas.\n\nMientras algunos la ven como una herramienta liberadora que reduce costos y amplía posibilidades creativas, otros advierten sobre sus riesgos para los trabajadores de la industria y la autenticidad del arte. Los sindicatos de guionistas y actores ya negocian cláusulas específicas en sus contratos.\n\nEl debate está lejos de resolverse, pero todos coinciden en que la IA llegó para quedarse y que el cine deberá encontrar la manera de integrarla sin perder su esencia humana.",
    autor: "Martín Bello",
    fecha: "1 de junio, 2026",
  },
];

const Page = () => {
  const { id } = useParams();
  const noticia = NOTICIAS.find((n) => n.id === id);

  if (!noticia) return <div className="sectionMain pt-20 bodyText">Noticia no encontrada.</div>;

  return (
    <div className="flex flex-col gap-8! pb-20">
      <BackButton />

      <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden">
        <Image
          src={noticia.img}
          alt={noticia.titulo}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {noticia.tematicas.map((t) => (
          <span
            key={t}
            className="text-[.8em] font-[500] px-3 py-1 rounded-full border border-(--primary) opacity-70"
          >
            {t}
          </span>
        ))}
      </div>

      <h1 className="text-[1.6em] sm:text-[2em] font-[700] leading-tight" style={{ color: "var(--primary)" }}>
        {noticia.titulo}
      </h1>

      <p className="bodyText text-[1.05em] font-[500] opacity-80">{noticia.copete}</p>

      <p className="bodyText text-[.85em] opacity-50">{noticia.autor} · {noticia.fecha}</p>

      <div className="flex flex-col gap-5 max-w-2xl">
        {noticia.descripcion.split("\n\n").map((parrafo, i) => (
          <p key={i} className="bodyText leading-relaxed">
            {parrafo}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Page;
