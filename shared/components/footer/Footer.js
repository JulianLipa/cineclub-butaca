"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import style from "./Footer.module.css";

const EXPLORAR = [
  { label: "Inicio", href: "/" },
  { label: "Funciones", href: "/funciones" },
  { label: "Archivo", href: "/archivo" },
];

const COMUNIDAD = [
  { label: "Comunidad", href: "/comunidad" },
  { label: "Ingresar", href: "/login" },
  { label: "Crear cuenta", href: "/signup" },
];

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LetterboxdIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="6.5" cy="12" r="3.6" />
    <circle cx="12" cy="12" r="3.6" opacity="0.7" />
    <circle cx="17.5" cy="12" r="3.6" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "Letterboxd", href: "https://letterboxd.com", Icon: LetterboxdIcon },
  { label: "Email", href: "mailto:hola@cineclubbutaca.com", Icon: MailIcon },
];

const Footer = () => {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className={style.footer}>
      <div className={style.inner}>
        <div className={style.top}>
          <div className={style.brand}>
            <Link href="/" className={style.logo} aria-label="Cineclub Butaca">
              <Image
                // Footer invertido: logo claro sobre fondo oscuro y viceversa
                src={theme === "dark" ? "/logo/logo-black.svg" : "/logo/logo-white.svg"}
                alt=""
                width={100}
                height={100}
              />
            </Link>

            <p className={style.tagline}>
              El cine como experiencia compartida.
            </p>

            <div className={style.socials}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.social}
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <nav className={style.links} aria-label="Enlaces del pie de página">
            <div className={style.group}>
              <h4 className={style.groupTitle}>Explorar</h4>
              {EXPLORAR.map(({ label, href }) => (
                <Link key={href} href={href} className={style.link}>
                  {label}
                </Link>
              ))}
            </div>

            <div className={style.group}>
              <h4 className={style.groupTitle}>Comunidad</h4>
              {COMUNIDAD.map(({ label, href }) => (
                <Link key={`${label}-${href}`} href={href} className={style.link}>
                  {label}
                </Link>
              ))}
            </div>

            <div className={`${style.group} ${style.cta}`}>
              <h4 className={style.groupTitle}>Sumate al club</h4>
              <p className={style.ctaText}>
                Funciones, comunidad y archivo en un solo lugar.
              </p>
              <Link href="/signup" className={style.ctaBtn}>
                Crear cuenta
              </Link>
            </div>
          </nav>
        </div>

        <div className={style.wordmarkWrap} aria-hidden="true">
          <span className={style.wordmark}>Butaca</span>
        </div>

        <div className={style.bottom}>
          <span>© {year} Cineclub Butaca</span>
          <div className={style.legal}>
            <Link href="/" className={style.legalLink}>
              Términos
            </Link>
            <Link href="/" className={style.legalLink}>
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
