"use client";

import { useParams } from "next/navigation";
import ListaPageWrapper from "../listaPageWrapper";
import { listas } from "@/data.json";

const Page = () => {
  const { id } = useParams();
  const lista = listas.find((l) => l.id === id);

  return <ListaPageWrapper lista={lista} />;
};

export default Page;
