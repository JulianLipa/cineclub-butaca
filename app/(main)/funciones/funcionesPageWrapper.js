"use client";

import React from "react";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import FuncionesSection from "@/shared/sections/Funciones/FuncionesSection";
import CalendarioSection from "@/shared/sections/Calendario/CalendarioSection";

import { ciclos } from "@/data.json";
import { funciones } from "@/data.json";

const FuncionesPageWrapper = () => {
  const { setHasPaddingTop } = useLayout();

  useEffect(() => {
    setHasPaddingTop(false);
    return () => setHasPaddingTop(true);
  }, [setHasPaddingTop]);
  return (
    <div>
      <div className="w-full sectionMain bg-(--secondary) sm:pt-(--padding-body-desktop) pt-(--padding-body-mobile)">
        <SectionTitleIcon
          icon="calendario"
          iconVariant="default"
          size="h-[10em]!"
        >
          Funciones
        </SectionTitleIcon>
      </div>

      <div className="sectionMain md:mt-10 flex flex-col gap-10!">
        <FuncionesSection
          items={ciclos}
          type="ciclos"
          title="Ciclos en cartelera"
          icon="circle"
        />

        <FuncionesSection items={funciones} />

        <CalendarioSection />
      </div>
    </div>
  );
};

export default FuncionesPageWrapper;
