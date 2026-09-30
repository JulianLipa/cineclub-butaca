"use client";

import { useState } from "react";

import Button from "@/shared/ui/button/Button";
import Banner from "@/shared/ui/banner/Banner";
import Icon from "@/shared/components/icon/Icon";
import SectionTitle from "@/shared/components/section-title/SectionTitle";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import DetailIcon from "@/shared/components/detailIcon/DetailIcon";
import StarSection from "@/shared/components/starSection/StarSection";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import BackButton from "@/shared/components/backButton/BackButton";
import Actions from "@/shared/ui/userActions/Actions";
import UserBadge from "@/shared/ui/user/userBadge/UserBadge";
import Card from "@/shared/ui/card/Card";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import MovieRow from "@/shared/ui/movieCard/MovieRow";
import CicloCard from "@/shared/ui/cicloCard/CicloCard";
import PersonCard from "@/shared/ui/personCard/PersonCard";
import ReviewCard from "@/shared/ui/reviewCard/ReviewCard";
import NewsCard from "@/shared/ui/newsCard/NewsCard";
import FrameCard from "@/shared/ui/frameCard/FrameCard";
import List from "@/shared/ui/list/List";

/* ═══════════════════════════════════════════════════════════════════════
   DATOS DE MUESTRA
   Las cards que dependen de datos usan tmdbId reales (traen datos de TMDB a
   través de /api/movies) o imágenes locales de /public/imgs.
   ═══════════════════════════════════════════════════════════════════════ */
const TMDB = { godfather: 238, inception: 27205, fightClub: 550, pulp: 680 };

const MOCK = {
  persona: {
    id: null,
    foto: "/imgs/carrie-img.jpg",
    nombre: "Sissy Spacek",
    personaje: "Carrie White",
  },
  resena: {
    id: null,
    username: "juli",
    tmdbId: TMDB.godfather,
    rating: 4,
    text: "Un clásico absoluto. La construcción del poder y la familia como tragedia. Cada plano está pensado.",
    likes: 32,
    comentarios: [1, 2, 3],
  },
  noticia: {
    id: 1,
    img: "/imgs/noticia-festival.jpg",
    titulo: "Vuelve el ciclo de cine de terror en 35mm",
    copete: "Cuatro funciones con copias restauradas.",
    descripcion:
      "El cineclub proyecta durante octubre una selección de clásicos del terror psicológico en su formato original de 35mm.",
    tematicas: ["Terror", "Clásicos", "35mm"],
  },
  frame: {
    img: "/imgs/frame-godfather.webp",
    movieTitle: "The Godfather",
    anio: 1972,
    username: "juli",
    tmdbId: TMDB.godfather,
    caption: "Uno de los mejores planos de apertura de la historia.",
  },
  lista: {
    id: null,
    title: "Terror psicológico esencial",
    description: "Las películas que definieron el género.",
    username: "juli",
    cover: TMDB.inception,
    movies: [TMDB.godfather, TMDB.fightClub, TMDB.pulp],
  },
};

const COLORES = [
  { group: "Base", items: [
    { name: "primary", varName: "--primary", hex: "#48250b", note: "Marrón · texto y bordes" },
    { name: "secondary", varName: "--secondary", hex: "#cad7e8", note: "Azul grisáceo · fondos" },
    { name: "white", varName: "--white", hex: "#fff8f2", note: "Crema · fondo base" },
    { name: "touchable", varName: "--touchable", hex: "#0445af", note: "Azul · interacción" },
  ]},
  { group: "Estados", items: [
    { name: "greenBorder", varName: "--greenBorder", hex: "#7da269", note: "Éxito · borde" },
    { name: "greenFill", varName: "--greenFill", hex: "#e1edcf", note: "Éxito · fondo" },
    { name: "redBorder", varName: "--redBorder", hex: "#560001", note: "Error · borde fuerte" },
    { name: "redFill", varName: "--redFill", hex: "#ad3436", note: "Error · texto/borde" },
  ]},
  { group: "Opacidades", items: [
    { name: "primary-opacidad", varName: "--primary-opacidad", hex: "rgba(72,37,11,.2)", note: "Marrón 20%" },
    { name: "white-opacidad", varName: "--white-opacidad", hex: "rgba(255,248,242,.2)", note: "Crema 20%" },
  ]},
];

const ICONOS = [
  "calendario", "reloj", "ubicacion", "funcion", "comunidad", "list", "grid",
  "eye", "like", "comentarios", "star", "comillas", "lupa", "logout", "pen",
  "close", "circle", "rectangle", "triangle", "fullscreen", "sun", "moon",
];

const NAV = [
  ["colores", "Colores"],
  ["tipografia", "Tipografía"],
  ["iconografia", "Iconografía"],
  ["botones", "Botones"],
  ["estados", "Estados y banners"],
  ["detalles", "Detalles y badges"],
  ["cards", "Cards"],
  ["listas", "Listas"],
];

/* ═══════════════════════════════════════════════════════════════════════
   PRIMITIVAS DE LA DOCUMENTACIÓN
   ═══════════════════════════════════════════════════════════════════════ */

function Section({ id, title, desc, children }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-8">
      <div className="flex flex-col gap-2 border-b border-(--primary)/15 pb-4">
        <h2 className="text-[26px] font-[700] text-(--primary) sm:text-[32px]">
          {title}
        </h2>
        {desc && <p className="bodyText max-w-2xl opacity-70">{desc}</p>}
      </div>
      {children}
    </section>
  );
}

function CodeBlock({ code, id, copy, copied }) {
  return (
    <div className="relative">
      <button
        onClick={() => copy(code, id)}
        className="absolute right-2 top-2 z-10 rounded-md bg-(--white)/15 px-2 py-1 text-[11px] font-[500] text-(--white) hover:bg-(--white)/25"
      >
        {copied === id ? "¡Copiado!" : "Copiar"}
      </button>
      <pre className="overflow-x-auto bg-(--primary) p-4 text-[12px] leading-relaxed text-(--white)">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Demo({ title, path, code, dark, children, id, copy, copied }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-(--primary)/15">
      <div className="flex items-center justify-between gap-3 border-b border-(--primary)/10 px-4 py-2">
        <h4 className="bodyText font-[700]!">{title}</h4>
        {path && (
          <code className="shrink-0 text-[11px] opacity-45">{path}</code>
        )}
      </div>
      <div
        className="flex flex-wrap items-center gap-4 p-6"
        style={{ background: dark ? "var(--primary)" : "var(--white)" }}
      >
        {children}
      </div>
      {code && <CodeBlock code={code} id={id} copy={copy} copied={copied} />}
    </div>
  );
}

function Swatch({ item, copy, copied }) {
  return (
    <button
      onClick={() => copy(`var(${item.varName})`, item.varName)}
      className="group flex flex-col overflow-hidden rounded-xl border border-(--primary)/15 text-left"
    >
      <div
        className="h-20 w-full border-b border-(--primary)/10"
        style={{ backgroundColor: `var(${item.varName})` }}
      />
      <div className="flex flex-col gap-0.5 p-3">
        <span className="bodyText font-[700]! text-[13px]">{item.name}</span>
        <span className="text-[11px] opacity-60">{item.note}</span>
        <span className="mt-1 font-mono text-[11px] text-(--touchable)">
          {copied === item.varName ? "¡Copiado!" : item.hex}
        </span>
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PÁGINA
   ═══════════════════════════════════════════════════════════════════════ */

export default function UiKitPage() {
  const [copied, setCopied] = useState(null);
  const copy = (text, id) => {
    try {
      navigator.clipboard?.writeText(text);
    } catch {}
    setCopied(id);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="min-h-svh bg-(--white) text-(--primary)">
      {/* ───── Encabezado ───── */}
      <header className="border-b border-(--primary)/15 px-6 py-12 sm:px-12 sm:py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          <span className="w-fit rounded-full border border-(--primary)/30 px-3 py-1 text-[12px] font-[600] uppercase tracking-wide opacity-70">
            Design System
          </span>
          <h1 className="text-[40px] font-[700] leading-[1.05] sm:text-[56px]">
            Butaca UI Kit
          </h1>
          <p className="bodyText max-w-2xl text-[15px]! opacity-75">
            Referencia visual de componentes para developers. Cada bloque muestra
            el componente renderizado, su ruta en el repo y un snippet de uso
            copiable. Las cards con datos traen información real de TMDB vía{" "}
            <code className="font-mono text-[13px]">/api/movies</code>.
          </p>
        </div>
      </header>

      {/* ───── Índice ───── */}
      <nav className="sticky top-0 z-20 border-b border-(--primary)/15 bg-(--white)/90 px-6 py-3 backdrop-blur-md sm:px-12">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-x-5 gap-y-2">
          {NAV.map(([anchor, label]) => (
            <a
              key={anchor}
              href={`#${anchor}`}
              className="bodyText text-[13px] font-[500] opacity-60 hover:text-(--touchable) hover:opacity-100"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main className="mx-auto flex max-w-5xl flex-col gap-20 px-6 py-16 sm:px-12">
        {/* ═════════════ COLORES ═════════════ */}
        <Section
          id="colores"
          title="Colores"
          desc="Tokens definidos como variables CSS en app/globals.css. Clic en un color para copiar su var()."
        >
          {COLORES.map((bloque) => (
            <div key={bloque.group} className="flex flex-col gap-3">
              <h3 className="bodyText font-[700]! opacity-70">{bloque.group}</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {bloque.items.map((item) => (
                  <Swatch key={item.varName} item={item} copy={copy} copied={copied} />
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* ═════════════ TIPOGRAFÍA ═════════════ */}
        <Section
          id="tipografia"
          title="Tipografía"
          desc="Fuente Inter (variable --font-inter). Los títulos de sección usan componentes; el cuerpo usa la clase .bodyText."
        >
          <div className="flex flex-col gap-6 rounded-2xl border border-(--primary)/15 p-6">
            <div className="flex flex-col gap-1">
              <SectionTitle>SectionTitle · título de sección</SectionTitle>
              <code className="text-[11px] opacity-45">18/22px · font-semibold · color por prop colorBorder</code>
            </div>
            <div className="flex flex-col gap-1">
              <SectionTitleIcon icon="funcion">SectionTitleIcon · con ícono</SectionTitleIcon>
              <code className="text-[11px] opacity-45">SectionTitle + Icon a la izquierda</code>
            </div>
            <hr className="border-(--primary)/10" />
            <div className="flex flex-col gap-1">
              <h3 className="text-[22px] font-[600]">h3 · 600</h3>
              <h4 className="text-[18px] font-[600]">h4 · 600</h4>
              <h5>h5 · 15px · 300</h5>
            </div>
            <div className="flex flex-col gap-1">
              <p className="bodyText max-w-lg">
                .bodyText — 14px, line-height 1.5, text-wrap pretty. Es el estilo
                de párrafo base del sitio, pensado para lectura cómoda en bloques
                de texto.
              </p>
              <code className="text-[11px] opacity-45">.bodyText · 14px / 1.5</code>
            </div>
          </div>
          <Demo
            title="Uso"
            path="shared/components/section-title/*"
            id="ty-1"
            copy={copy}
            copied={copied}
            code={'<SectionTitle colorBorder="primary">Próximas funciones</SectionTitle>\n<SectionTitleIcon icon="funcion">Cartelera</SectionTitleIcon>\n<p className="bodyText">Texto de cuerpo…</p>'}
          >
            <SectionTitle>Próximas funciones</SectionTitle>
          </Demo>
        </Section>

        {/* ═════════════ ICONOGRAFÍA ═════════════ */}
        <Section
          id="iconografia"
          title="Iconografía"
          desc="El componente Icon pinta SVGs de /public/icons como máscara CSS, así el color se controla por prop. Convención: i-[nombre]-[variante].svg."
        >
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {ICONOS.map((name) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 rounded-xl border border-(--primary)/15 p-4"
              >
                <div className="h-6 w-6">
                  <Icon name={name} variant="default" color="var(--primary)" size="h-6" />
                </div>
                <span className="text-[10px] opacity-60">{name}</span>
              </div>
            ))}
          </div>
          <Demo
            title="Uso · color y tamaño por prop"
            path="shared/components/icon/Icon.js"
            id="ic-1"
            copy={copy}
            copied={copied}
            code={'<Icon name="star" variant="negative" color="var(--touchable)" size="h-6" />'}
          >
            <div className="h-6 w-6"><Icon name="star" variant="negative" color="var(--touchable)" size="h-6" /></div>
            <div className="h-6 w-6"><Icon name="like" variant="default" color="var(--redFill)" size="h-6" /></div>
            <div className="h-6 w-6"><Icon name="calendario" variant="default" color="var(--greenBorder)" size="h-6" /></div>
          </Demo>
        </Section>

        {/* ═════════════ BOTONES ═════════════ */}
        <Section
          id="botones"
          title="Botones"
          desc="Componente polimórfico: renderiza <Link> si recibe href, si no <button>. Acepta icon, img, color y className."
        >
          <Demo
            title="Variantes principales"
            path="shared/ui/button/Button.js"
            id="btn-1"
            copy={copy}
            copied={copied}
            code={'<Button variant="primary">Comprar entradas</Button>\n<Button variant="secondary">Ver más</Button>\n<Button variant="buttonText">Enlace de texto</Button>\n<Button variant="success">Éxito</Button>'}
          >
            <Button variant="primary">Comprar entradas</Button>
            <Button variant="secondary">Ver más</Button>
            <Button variant="buttonText">Enlace de texto</Button>
            <Button variant="success">Éxito</Button>
          </Demo>

          <Demo
            title="Variantes sobre fondo oscuro (terciary)"
            path="Button.module.css · .terciary"
            id="btn-2"
            dark
            copy={copy}
            copied={copied}
            code={'<Button variant="terciary">Sobre imagen / hero</Button>'}
          >
            <Button variant="terciary">Sobre imagen / hero</Button>
          </Demo>

          <Demo
            title="Con ícono e imagen"
            path="props: icon, img"
            id="btn-3"
            copy={copy}
            copied={copied}
            code={'<Button variant="primary" icon="calendario">Agendar</Button>\n<Button variant="secondary" img="letterboxd">Letterboxd</Button>'}
          >
            <Button variant="primary" icon="calendario">Agendar</Button>
            <Button variant="secondary" img="letterboxd">Letterboxd</Button>
          </Demo>

          <Demo
            title="Acciones (Actions)"
            path="shared/ui/userActions/Actions.js"
            id="btn-4"
            copy={copy}
            copied={copied}
            code={'<Actions icons={["eye", "like", "comentarios", "star"]} variant="buttonText" />'}
          >
            <Actions icons={["eye", "like", "comentarios", "star"]} variant="buttonText" />
          </Demo>
        </Section>

        {/* ═════════════ ESTADOS Y BANNERS ═════════════ */}
        <Section
          id="estados"
          title="Estados y banners"
          desc="Carteles de feedback con el componente Banner (nuevo). Usa los tokens de estado del sistema. Variantes: success, error, info."
        >
          <Demo
            title="Banner · variantes"
            path="shared/ui/banner/Banner.js"
            id="bn-1"
            copy={copy}
            copied={copied}
            code={'<Banner variant="success" title="¡Listo!">Tu reseña se publicó.</Banner>\n<Banner variant="error" title="Algo salió mal">Revisá los datos e intentá de nuevo.</Banner>\n<Banner variant="info">La función empieza en 10 minutos.</Banner>'}
          >
            <div className="flex w-full flex-col gap-3">
              <Banner variant="success" title="¡Listo!">Tu reseña se publicó.</Banner>
              <Banner variant="error" title="Algo salió mal">Revisá los datos e intentá de nuevo.</Banner>
              <Banner variant="info">La función empieza en 10 minutos.</Banner>
            </div>
          </Demo>

          <Demo
            title="Error inline en formularios"
            path="patrón usado en login / signup"
            id="bn-2"
            copy={copy}
            copied={copied}
            code={'<p className="text-(--redFill) text-[0.8rem]">Usuario o contraseña incorrectos</p>'}
          >
            <p className="text-[0.8rem] text-(--redFill)">Usuario o contraseña incorrectos</p>
          </Demo>
        </Section>

        {/* ═════════════ DETALLES Y BADGES ═════════════ */}
        <Section
          id="detalles"
          title="Detalles y badges"
          desc="Piezas pequeñas de composición: chips de detalle, rating, identidad de usuario, skeletons de carga."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Demo title="DetailIcon" path="shared/components/detailIcon/DetailIcon.js" id="d-1" copy={copy} copied={copied}
              code={'<DetailIcon icon="calendario">15 OCT</DetailIcon>'}>
              <DetailIcon icon="calendario">15 OCT</DetailIcon>
            </Demo>

            <Demo title="StarSection" path="shared/components/starSection/StarSection.js" id="d-2" copy={copy} copied={copied}
              code={'<StarSection rating={4} />'}>
              <StarSection rating={4} />
            </Demo>

            <Demo title="UserBadge" path="shared/ui/user/userBadge/UserBadge.js" id="d-3" copy={copy} copied={copied}
              code={'<UserBadge username="juli" />\n<UserBadge username="juli" variant="vertical" />'}>
              <UserBadge username="juli" />
              <UserBadge username="juli" variant="vertical" />
            </Demo>

            <Demo title="BackButton" path="shared/components/backButton/BackButton.js" id="d-4" copy={copy} copied={copied}
              code={'<BackButton />'}>
              <BackButton />
            </Demo>

            <Demo title="Skeleton" path="shared/components/skeleton/Skeleton.js" id="d-5" copy={copy} copied={copied}
              code={'<Skeleton className="h-6 w-40" />'}>
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-24 w-24 rounded-xl" />
              </div>
            </Demo>
          </div>
        </Section>

        {/* ═════════════ CARDS ═════════════ */}
        <Section
          id="cards"
          title="Cards"
          desc="Componentes de contenido. Los que reciben tmdbId traen datos reales de TMDB; el resto usan datos mock."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Demo title="Card · función (activa)" path="shared/ui/card/Card.js" id="c-1" copy={copy} copied={copied}
              code={'<Card tmdbId={27205} isActive date="15/10/26" hour="20:30" place="Sala Lugones" />'}>
              <div className="w-full max-w-sm">
                <Card tmdbId={TMDB.inception} isActive date="15/10/26" hour="20:30" place="Sala Lugones" />
              </div>
            </Demo>

            <Demo title="MovieCard" path="shared/ui/movieCard/MovieCard.js" id="c-2" copy={copy} copied={copied}
              code={'<MovieCard tmdbId={238} text actionsIcons={["eye", "like"]} />'}>
              <div className="w-40">
                <MovieCard tmdbId={TMDB.godfather} text actionsIcons={["eye", "like"]} />
              </div>
            </Demo>

            <Demo title="MovieRow" path="shared/ui/movieCard/MovieRow.js" id="c-3" copy={copy} copied={copied}
              code={'<MovieRow tmdbId={550} index={0} />'}>
              <div className="w-full">
                <MovieRow tmdbId={TMDB.fightClub} index={0} />
                <MovieRow tmdbId={TMDB.pulp} index={1} />
              </div>
            </Demo>

            <Demo title="CicloCard" path="shared/ui/cicloCard/CicloCard.js" id="c-4" copy={copy} copied={copied}
              code={'<CicloCard id={1} title="Ciclo de Terror" description="…" portada="/imgs/cineclub.jpg" isActive />'}>
              <div className="w-full max-w-sm">
                <CicloCard id={1} title="Ciclo de Terror Psicológico" description="Cuatro clásicos restaurados en 35mm." portada="/imgs/cineclub.jpg" isActive onClick={() => {}} />
              </div>
            </Demo>

            <Demo title="PersonCard" path="shared/ui/personCard/PersonCard.js" id="c-5" copy={copy} copied={copied}
              code={'<PersonCard data={{ foto, nombre, personaje }} />'}>
              <div className="w-40">
                <PersonCard data={MOCK.persona} />
              </div>
            </Demo>

            <Demo title="FrameCard" path="shared/ui/frameCard/FrameCard.js" id="c-6" copy={copy} copied={copied}
              code={'<FrameCard data={{ img, movieTitle, anio, username, tmdbId, caption }} />'}>
              <div className="w-full max-w-sm">
                <FrameCard data={MOCK.frame} />
              </div>
            </Demo>
          </div>

          <Demo title="ReviewCard" path="shared/ui/reviewCard/ReviewCard.js" id="c-7" copy={copy} copied={copied}
            code={'<ReviewCard data={{ username, tmdbId, rating, text, likes, comentarios }} />'}>
            <div className="w-full">
              <ReviewCard data={MOCK.resena} />
            </div>
          </Demo>

          <Demo title="NewsCard" path="shared/ui/newsCard/NewsCard.js" id="c-8" copy={copy} copied={copied}
            code={'<NewsCard data={{ id, img, titulo, copete, descripcion, tematicas }} />'}>
            <div className="w-full">
              <NewsCard data={MOCK.noticia} />
            </div>
          </Demo>
        </Section>

        {/* ═════════════ LISTAS ═════════════ */}
        <Section
          id="listas"
          title="Listas"
          desc="List combina MovieCard (portada), UserBadge y Actions en una tarjeta clicable hacia el detalle de la lista."
        >
          <Demo title="List" path="shared/ui/list/List.js" id="l-1" copy={copy} copied={copied}
            code={'<List title="…" description="…" username="juli" cover={27205} movies={[238, 550, 680]} />'}>
            <div className="w-full">
              <List {...MOCK.lista} />
            </div>
          </Demo>
        </Section>

        <footer className="border-t border-(--primary)/15 pt-8 text-center">
          <p className="bodyText opacity-50">
            Butaca · UI Kit interno — ruta /ui-kit
          </p>
        </footer>
      </main>
    </div>
  );
}
