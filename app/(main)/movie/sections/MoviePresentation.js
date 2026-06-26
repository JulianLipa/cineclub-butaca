"use client";

import { useEffect, useState } from "react";

import Button from "@/shared/ui/button/Button";
import { useAuth } from "@/contexts/AuthContext";
import { isAdmin } from "@/lib/auth/roles";

// Botón "QR" (solo admin) que lleva a la pantalla de proyección /qr, desde
// donde se accede a las dos pantallas (inicio de función y muro de asistentes).
const MoviePresentation = ({ movie }) => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isAdmin(user)) return null;

  const href = movie?.tmdbId != null ? `/qr?movie=${movie.tmdbId}` : "/qr";

  return (
    <Button
      variant="secondary"
      icon="fullscreen"
      href={href}
      className="text-[.9em]!"
    >
      QR
    </Button>
  );
};

export default MoviePresentation;
