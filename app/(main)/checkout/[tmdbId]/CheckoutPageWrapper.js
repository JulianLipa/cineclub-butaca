"use client";

import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/shared/ui/button/Button";
import Icon from "@/shared/components/icon/Icon";
import { formatScreeningFullDate } from "@/lib/dates";
import { useHeroLayout } from "@/shared/hooks/useHeroLayout";
import style from "./checkout.module.css";

const InfoRow = ({ icon, children }) => (
  <div className="flex items-center gap-3">
    <div className="w-4 h-4 shrink-0 opacity-50">
      <Icon name={icon} variant="default" color="var(--primary)" />
    </div>
    <span className="text-[0.9em]">{children}</span>
  </div>
);

export default function CheckoutPageWrapper({ movie, funcion }) {
  const { user } = useAuth();
  const hasHero = !!movie?.frame;
  useHeroLayout(hasHero);

  const isSocio =
    user?.role === "admin" ||
    user?.role === "socio" ||
    user?.role === "socioFundador";

  if (!funcion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60svh] gap-6 text-center">
        <p className="opacity-50 text-[1.1em]">Función no encontrada</p>
        <Button variant="primary" href="/">
          Volver al inicio
        </Button>
      </div>
    );
  }

  const fullDate = formatScreeningFullDate(funcion.date);

  return (
    <div>
      {/* Hero */}
      {hasHero && (
        <div className="relative h-[42svh] overflow-hidden">
          <Image
            src={movie.frame}
            alt=""
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute bottom-8 left-6 right-6 sm:left-[var(--padding-body-desktop-w)] sm:right-[var(--padding-body-desktop-w)]">
            {funcion.cycle && (
              <p className="text-(--hero-white) text-[0.7em] font-[600] uppercase tracking-widest opacity-60 mb-2">
                {funcion.cycle}
              </p>
            )}
            <h1 className="text-(--hero-white) text-[2rem] sm:text-[2.8rem] font-[700] leading-[1.05]">
              {movie.titulo || funcion.title}
            </h1>
            {movie.anio && movie.director?.nombre && (
              <p className="text-(--hero-white) opacity-55 mt-2 text-[0.88em]">
                {movie.anio} · Dir. {movie.director.nombre}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div
        className={`sectionMain flex flex-col gap-12! md:flex-row md:gap-20! sm:pt-(--padding-body-desktop) pt-(--padding-body-mobile)`}
      >
        {/* Columna izquierda: info de la función */}
        <div className="w-full md:w-[38%] flex flex-col gap-8">
          {!hasHero && (
            <div className="flex flex-col gap-1">
              <h1 className="text-[2rem] sm:text-[2.4rem] font-[700] leading-tight">
                {movie?.titulo || funcion.title}
              </h1>
              {movie?.anio && (
                <p className="opacity-40 text-[0.9em]">{movie.anio}</p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <p className={style.cardLabel}>Sobre la función</p>
            <div className="flex flex-col gap-3">
              <InfoRow icon="calendario">{fullDate}</InfoRow>
              <InfoRow icon="reloj">{funcion.hour}</InfoRow>
              <InfoRow icon="ubicacion">{funcion.place}</InfoRow>
            </div>
          </div>
        </div>

        {/* Columna derecha: opciones de compra */}
        <div className="flex-1 flex flex-col gap-5">
          {isSocio ? (
            /* Usuario ya es socio — acceso confirmado */
            <div className={style.confirmedCard}>
              <p className={style.cardLabel}>Tu acceso</p>
              <h2 className="text-[1.3em] font-[700]">Ya tenés entrada</h2>
              <p className="text-[0.9em] opacity-65 leading-relaxed">
                Como Socio Butaca tenés acceso libre a esta función y a todas
                las del mes.
              </p>
            </div>
          ) : (
            <>
              {/* Opción 1: Entrada individual */}
              <div className={style.optionCard}>
                <p className={style.cardLabel}>Entrada individual</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[2rem] font-[700]">$2.500</span>
                  <span className="opacity-40 text-[0.85em]">por función</span>
                </div>
                <ul className={style.featureList}>
                  <li>
                    <span className={style.dot} />
                    Acceso a la proyección
                  </li>
                  <li>
                    <span className={style.dot} />
                    Debate post-función incluido
                  </li>
                  <li>
                    <span className={style.dot} />
                    Sin necesidad de cuenta
                  </li>
                </ul>
                <Button variant="secondary" className="w-full! justify-center">
                  Comprar entrada
                </Button>
              </div>

              {/* Opción 2: Comunidad Butaca (destacada) */}
              <div className={style.featuredCard}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={style.cardLabelLight}>Comunidad Butaca</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[2rem] font-[700]">$20.000</span>
                      <span className="opacity-45 text-[0.85em]">/mes</span>
                    </div>
                  </div>
                  <span
                    className={`${style.badge} border-1 border-(--greenFill) bg-(--greenBorder) text-(--greenFill)!`}
                  >
                    Más elegido
                  </span>
                </div>
                <p className="text-[0.85em] opacity-60 -mt-1 leading-snug">
                  Acceso libre a todas las funciones del mes
                </p>
                <ul className={style.featureListLight}>
                  <li>
                    <span className={style.dotLight} />
                    Pase libre a todas las funciones
                  </li>
                  <li>
                    <span className={style.dotLight} />
                    Votá ciclos y películas
                  </li>
                  <li>
                    <span className={style.dotLight} />
                    Insignia de Socio en tu perfil
                  </li>
                  <li>
                    <span className={style.dotLight} />
                    Acceso a debates y reseñas
                  </li>
                </ul>
                <Button
                  variant="primary"
                  href="/signup"
                  className={`w-full! justify-center ${style.memberBtn}`}
                >
                  Unirme al Club
                </Button>
              </div>

              {!user && (
                <p className="text-[0.85em] flex gap-2 flex-col">
                  ¿Ya tenés cuenta?
                  <Button variant="primary" href="/login">
                    Iniciá sesión
                  </Button>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
