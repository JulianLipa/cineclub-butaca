"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import { isAdmin } from "@/lib/auth/roles";

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Guard de cliente: el AuthContext hidrata `user` desde localStorage en un
  // efecto, así que esperamos un tick antes de decidir el redirect.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!isAdmin(user)) {
      router.replace("/");
      return;
    }
    fetch("/api/admin/users", { headers: { "x-user-id": String(user.id) } })
      .then(async (res) => {
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        setUsers(data.users || []);
      })
      .catch(() => setError("No se pudo cargar el listado de usuarios."));
  }, [ready, user, router]);

  if (!ready || !isAdmin(user)) return null;

  return (
    <div className="flex flex-col gap-8 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-[700]">Panel de administración</h1>
        <p className="text-[0.9em] opacity-70">
          Conectado como @{user.username}
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-[600]">
          Usuarios{users.length ? ` (${users.length})` : ""}
        </h2>

        {error && <p style={{ color: "#c0392b" }}>{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[0.9em] border-collapse">
            <thead>
              <tr className="border-b border-[var(--secondary)]">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Usuario</th>
                <th className="py-2 pr-4">Nombre</th>
                <th className="py-2 pr-4">Mail</th>
                <th className="py-2 pr-4">Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-[var(--secondary)]/40">
                  <td className="py-2 pr-4">{u.id}</td>
                  <td className="py-2 pr-4">@{u.username}</td>
                  <td className="py-2 pr-4">
                    {u.nombre} {u.apellido}
                  </td>
                  <td className="py-2 pr-4">{u.mail}</td>
                  <td className="py-2 pr-4">{u.role || "user"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Page;
