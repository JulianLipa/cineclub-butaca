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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const debounceRef = useRef(null);
  const containerRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const desktopInputRef = useRef(null);
  const mobileInputRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
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
      const inContainer = containerRef.current?.contains(e.target);
      const inMobileSearch = mobileSearchRef.current?.contains(e.target);
      if (!inContainer && !inMobileSearch) {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;
    const timer = setTimeout(() => {
      if (window.innerWidth < 768) {
        mobileInputRef.current?.focus();
      } else {
        desktopInputRef.current?.focus();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [isSearchOpen]);

  const toggleSearch = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setQuery("");
      setResults([]);
      setIsOpen(false);
    } else {
      setIsSearchOpen(true);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      if (!prev) {
        setIsSearchOpen(false);
        setQuery("");
        setResults([]);
        setIsOpen(false);
      }
      return !prev;
    });
  };

  const closeSearchResult = () => {
    setIsOpen(false);
    setIsSearchOpen(false);
  };

  const ResultsList = ({ results, loading }) =>
    loading
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
            onClick={closeSearchResult}
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
        ));

  return (
    <>
      <div
        className={`${style.header} flex items-center justify-between w-full z-[1000]`}
      >
        {/* Left: hamburger + logo + nav */}
        <div className="flex gap-3 items-center">
          <button
            className="w-10 h-10 md:hidden cursor-pointer shrink-0 flex items-center justify-center"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <div className="p-3 rounded-xl flex justify-center items-center bg-(--primary)">
                <Icon name="close" color="var(--white)" header={true} />
              </div>
            ) : (
              <Icon name="menu" color="var(--primary)" header={true} />
            )}
          </button>

          <div className="flex md:w-auto gap-10 items-center">
            <div className="w-[50px] flex justify-center">
              <Link href="/">
                <Image
                  src="/logo/logo-black.svg"
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
        </div>

        {/* Right: search + CTA */}
        <div className="flex items-center gap-4">
          {/* Search area */}
          <div ref={containerRef} className="relative flex items-center gap-3">
            <button
              onClick={toggleSearch}
              className="h-5 w-5 cursor-pointer shrink-0"
              aria-label={isSearchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
            >
              <Icon
                name="lupa"
                variant={isSearchOpen ? "default" : undefined}
              />
            </button>

            {/* Desktop search input */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="hidden md:block"
                >
                  <div className={style.searchWrapper}>
                    <div className="h-4 w-4 shrink-0 pointer-events-none">
                      <Icon name="circle" color="var(--primary)" />
                    </div>
                    <input
                      ref={desktopInputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className={`${style.searchInput} w-[25em]`}
                      placeholder="Buscá peliculas, amigxs, actorxs, directorxs, etc"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop dropdown */}
            <AnimatePresence>
              {isSearchOpen && (loading || (isOpen && results.length > 0)) && (
                <motion.div
                  className={`${style.searchDropdown} hidden md:block`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <ResultsList results={results} loading={loading} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <Button variant="primary">Quiero mi Butaca</Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed left-0 w-full z-[999]"
            style={{ top: "var(--header-height)" }}
          >
            <div className={`${style.mobileMenu} flex flex-col gap-6`}>
              <NavLinks mobile />
              <Button variant="primary">Quiero mi Butaca</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile search panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            ref={mobileSearchRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed left-0 w-full z-[999]"
            style={{ top: "var(--header-height)" }}
          >
            <div className={`${style.mobileMenu} flex flex-col gap-4`}>
              <div className={style.searchWrapper}>
                <div className="h-4 w-4 shrink-0 pointer-events-none">
                  <Icon name="circle" color="var(--primary)" />
                </div>
                <input
                  ref={mobileInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={`${style.searchInput} flex-1`}
                  placeholder="Buscá peliculas, amigxs, actorxs, directorxs, etc"
                />
              </div>

              {(loading || (isOpen && results.length > 0)) && (
                <div className={style.mobileSearchResults}>
                  <ResultsList results={results} loading={loading} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
