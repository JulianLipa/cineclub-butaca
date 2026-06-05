"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import style from "./Header.module.css";
import Image from "next/image";
import Button from "@/shared/ui/button/Button";
import Icon from "@/shared/components/icon/Icon";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TIPO_LABEL = { movie: "Película", tv: "Serie", person: "Persona" };
const TIPO_HREF = { movie: "movie", tv: "serie", person: "persona" };

const NAV_LINKS = [
  { label: "Funciones", href: "/funciones" },
  { label: "Comunidad", href: "/comunidad" },
  { label: "Archivo" },
  { label: "Perfil", href: "/perfil" },
];

const NavLinks = ({ mobile = false }) =>
  NAV_LINKS.map(({ label, href }) => (
    <Button
      key={label}
      variant="buttonText"
      className={`bodyText text-(--primary) text-[1em]!${mobile ? " justify-start" : ""}`}
      href={href}
    >
      {label}
    </Button>
  ));

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${header.offsetHeight}px`,
        );
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
      setIsOpen(true);
      setLoading(false);
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className={`${style.header} flex gap-3 items-center md:justify-between justify-start w-full z-[1000]`}
      >
        <button
          className="w-10 h-full md:hidden cursor-pointer shrink-0"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? (
            <div className="p-3 rounded-xl flex justify-center items-center bg-(--primary)">
              <Icon name={"close"} color={"var(--white)"} header={true} />
            </div>
          ) : (
            <Icon name={"menu"} color={"var(--primary)"} header={true} />
          )}
        </button>

        <div className="flex md:w-auto gap-10 items-center">
          <div className="w-[50px] flex justify-center">
            <Link href={"/"}>
              <Image
                src={"/logo/logo-black.svg"}
                alt=""
                width={100}
                height={100}
                className="h-auto w-[50px] object-contain"
              />
            </Link>
          </div>

          <div className="hidden gap-10 md:flex">
            <NavLinks />
          </div>
        </div>

        <div ref={containerRef} className="relative">
          <div className={style.searchWrapper}>
            <div className="h-4 w-4 shrink-0 pointer-events-none">
              <Icon name="circle" color="var(--primary)" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`${style.searchInput} w-[25em]! h-6`}
              placeholder="Buscá peliculas, amigxs, actorxs, directorxs, etc"
            />
          </div>

          <AnimatePresence>
            {(loading || (isOpen && results.length > 0)) && (
              <motion.div
                className={style.searchDropdown}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {loading
                  ? [1, 2, 3, 4].map((i) => (
                      <div key={i} className={style.searchResult}>
                        <Skeleton className="w-7 h-[42px] rounded shrink-0" />
                        <Skeleton className="h-3 w-2/3 rounded" />
                        <div className={style.searchResultMeta}>
                          <Skeleton className="h-3 w-8 rounded" />
                          <Skeleton className="h-4 w-12 rounded" />
                        </div>
                      </div>
                    ))
                  : results.map((item) => (
                      <Link
                        key={`${item.tipo}-${item.id}`}
                        href={`/${TIPO_HREF[item.tipo]}/${item.id}`}
                        className={style.searchResult}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.poster ? (
                          <Image
                            src={item.poster}
                            alt={item.titulo}
                            width={28}
                            height={42}
                            className={style.searchResultPoster}
                          />
                        ) : (
                          <div className={style.searchResultPosterFallback} />
                        )}
                        <span className="truncate">{item.titulo}</span>
                        <div className={style.searchResultMeta}>
                          {item.subtitulo && (
                            <span className={style.searchResultSubtitulo}>
                              {item.subtitulo}
                            </span>
                          )}
                          <span className={style.searchResultTipo}>
                            {TIPO_LABEL[item.tipo]}
                          </span>
                        </div>
                      </Link>
                    ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden gap-10 md:flex">
          <Button variant="primary">Quiero mi Butaca</Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed left-0 w-full z-[999]"
          >
            <div className={`${style.mobileMenu} flex flex-col gap-6`}>
              <NavLinks mobile />
              <Button variant="primary">Quiero mi Butaca</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
