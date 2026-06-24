"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/shared/ui/button/Button";
import CommentThread from "./CommentThread";
import LoginModal from "@/shared/components/loginModal/LoginModal";

// Formulario para agregar comentario + listado en hilo.
// Si no hay sesión iniciada, cualquier intento de comentar abre el modal de login.
const CommentsSection = ({ comentarios: initial = [] }) => {
  const { user } = useAuth();
  const [comentarios, setComentarios] = useState(initial);
  const [text, setText] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const isLogged = !!user;

  const requireLogin = (e) => {
    if (isLogged) return false;
    e?.preventDefault();
    setShowLogin(true);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requireLogin(e)) return;

    const value = text.trim();
    if (!value) return;

    setComentarios((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        username: user.username,
        fecha: "ahora",
        text: value,
        likes: 0,
      },
    ]);
    setText("");
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={isLogged ? text : ""}
          onChange={(e) => setText(e.target.value)}
          onFocus={requireLogin}
          onMouseDown={requireLogin}
          readOnly={!isLogged}
          rows={3}
          placeholder={
            isLogged
              ? "Escribí un comentario…"
              : "Iniciá sesión para comentar…"
          }
          className="w-full"
        />
        <div className="flex justify-end">
          <Button variant="primary" type="submit" icon="comentarios">
            Comentar
          </Button>
        </div>
      </form>

      <div className="border-t border-(--primary) opacity-20" />

      <h4 style={{ color: "var(--primary)" }}>
        Comentarios ({comentarios.length})
      </h4>

      <CommentThread comentarios={comentarios} />

      <LoginModal isOpen={showLogin} onCancel={() => setShowLogin(false)} />
    </div>
  );
};

export default CommentsSection;
