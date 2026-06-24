"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/shared/ui/button/Button";
import style from "./LogoutModal.module.css";

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  // El portal usa document.body, que no existe en SSR: esperamos al mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={style.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onCancel}
        >
          <motion.div
            className={style.modal}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={style.title}>¿Cerrar sesión?</h2>
            <p className={style.body}>Vas a salir de tu cuenta de Butaca.</p>
            <div className={style.actions}>
              <Button variant="primary" onClick={onConfirm}>
                Cerrar sesión
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

export default LogoutModal;
