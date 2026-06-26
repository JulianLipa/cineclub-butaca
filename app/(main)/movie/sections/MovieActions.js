"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Actions from "@/shared/ui/userActions/Actions";
import EventRow from "@/shared/sections/Calendario/EventRow.js";
import Button from "@/shared/ui/button/Button";
import buttonStyle from "@/shared/ui/button/Button.module.css";
import Icon from "@/shared/components/icon/Icon";
import modalStyle from "@/shared/components/logoutModal/LogoutModal.module.css";
import style from "../movie.module.css";
import { parseScreeningDate, dateToISO } from "@/lib/dates";
import { useAuth } from "@/contexts/AuthContext";

const Spinner = ({ color = "var(--touchable)" }) => (
  <div
    className="h-4 w-4 shrink-0 rounded-full border-2 animate-spin"
    style={{
      borderRightColor: color,
      borderBottomColor: color,
      borderLeftColor: color,
      borderTopColor: "transparent",
      transition: "none",
    }}
  />
);

const WatchlistAuthModal = ({ isOpen, onCancel }) => {
  // El portal usa document.body, que no existe en SSR: esperamos al mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={modalStyle.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onCancel}
        >
          <motion.div
            className={modalStyle.modal}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={modalStyle.title}>Iniciá sesión</h2>
            <p className={modalStyle.body}>
              Debés estar registrado para agregar películas a tu watchlist.
            </p>
            <div className={modalStyle.actions}>
              <Button variant="primary" href="/login">
                Iniciar sesión
              </Button>
              <Button variant="buttonText" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const WatchlistButton = ({ initialAdded = false, value = 28, className }) => {
  const { user } = useAuth();
  const [wlState, setWlState] = useState(initialAdded ? "added" : "idle");
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetch("/icons/i-watchlistAdded-negative.svg");
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClick = () => {
    if (!user) { setShowModal(true); return; }
    if (wlState === "loading") return;
    if (wlState === "added") { setWlState("idle"); return; }
    setWlState("loading");
    timerRef.current = setTimeout(() => setWlState("added"), 2000);
  };

  const icon =
    wlState === "idle" ? "watchlistAdd" :
    wlState === "added" ? "watchlistAdded" :
    null;

  const iconColor = isHovered ? "var(--white)" : "var(--touchable)";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${buttonStyle.button} ${buttonStyle.secondary} gap-2 ${className}`}
      >
        {icon
          ? <div className="h-4 w-4 shrink-0"><Icon name={icon} variant="negative" color={iconColor} /></div>
          : <Spinner color={iconColor} />
        }
        <span>{value}</span>
      </button>
      <WatchlistAuthModal isOpen={showModal} onCancel={() => setShowModal(false)} />
    </>
  );
};

const MovieActions = ({ date, tmdbId }) => {
  const d = date ? dateToISO(parseScreeningDate(date)) : null;
  return (
    <div className="w-full sm:w-auto flex flex-col sm:gap-4 sm:flex-row items-center sm:items-center">
      {d && (
        <div className={`${style.eventActionDiv} hidden sm:block sm:w-auto`}>
          <EventRow
            date={d}
            event={"En cartelera"}
            isPastMonth={false}
            tmdbId={tmdbId ? String(tmdbId) : undefined}
            className="text-[.9em]!"
          />
        </div>
      )}

      <Actions
        icons={["eye", "like", "comentarios", "star"]}
        className="text-[.9em]! flex-1! sm:flex-none sm:w-fit! justify-center flex-col sm:flex-row gap-1! sm:gap-2!"
        divClassname="w-full sm:w-fit flex-wrap sm:flex-nowrap"
        variant="secondary"
        extra={<WatchlistButton className="text-[.9em]! flex-1! sm:flex-none sm:w-fit! justify-center flex-col sm:flex-row gap-1! sm:gap-2!" />}
      />
    </div>
  );
};

export default MovieActions;
