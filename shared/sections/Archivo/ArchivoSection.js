"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import Button from "@/shared/ui/button/Button";
import { fadeIn } from "@/shared/ui/animations/motionPresets";
import { funcionesPasadas } from "@/data.json";

// Asocia cada foto del grid con la función a la que pertenece
const FOTOS = [
  {
    funcionId: "el-padrino-marzo-2026",
    fotoIndex: 0,
    span: "col-span-2 row-span-2",
  },
  {
    funcionId: "carrie-marzo-2026",
    fotoIndex: 0,
    span: "col-span-1 row-span-1",
  },
  {
    funcionId: "el-padrino-ii-febrero-2026",
    fotoIndex: 0,
    span: "col-span-1 row-span-2",
  },
  {
    funcionId: "carrie-marzo-2026",
    fotoIndex: 1,
    span: "col-span-1 row-span-1",
  },
  {
    funcionId: "funcion-verano-enero-2026",
    fotoIndex: 0,
    span: "col-span-2 row-span-1",
  },
  {
    funcionId: "ciclo-noir-enero-2026",
    fotoIndex: 0,
    span: "col-span-1 row-span-1",
  },
];

const ArchivoSection = () => {
  const items = FOTOS.map((f) => {
    const funcion = funcionesPasadas.find((fn) => fn.id === f.funcionId);
    return {
      ...f,
      funcion,
      img: funcion?.fotos?.[f.fotoIndex] ?? "/imgs/frame.jpg",
    };
  });

  return (
    <motion.section {...fadeIn} className="flex flex-col gap-4 w-full">
      <div className="flex w-full items-center justify-between">
        <SectionTitleIcon icon="triangle">Archivo</SectionTitleIcon>
      </div>

      <div className="grid grid-cols-4 max-[600px]:grid-cols-2 auto-rows-[120px] sm:auto-rows-[160px] gap-4">
        {items.map((item, i) => (
          <Link
            key={i}
            href={`/archivo/${item.funcionId}`}
            className={`group relative overflow-hidden rounded-xl ${item.span}`}
          >
            <Image
              src={item.img}
              alt={item.funcion?.titulo ?? "Función"}
              fill
              sizes="(max-width: 600px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay en hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 gap-0.5">
              <p className="text-white text-[.82em] font-[600] leading-snug line-clamp-2">
                {item.funcion?.titulo}
              </p>
              <p className="text-white/70 text-[.72em]">
                {item.funcion?.fecha}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex w-full justify-center">
        <Button variant="primary" href="/archivo" className="text-[.85em]!">
          Ver Archivo
        </Button>
      </div>
    </motion.section>
  );
};

export default ArchivoSection;
