"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import ReviewCard from "@/shared/ui/reviewCard/ReviewCard";
import BackButton from "@/shared/components/backButton/BackButton";

// Página-lista de Comunidad (reseñas o temas) con hero y grilla responsive.
const ComunidadList = ({ title, icon, variant, items = [] }) => {
  const { setHasPaddingTop } = useLayout();

  useEffect(() => {
    setHasPaddingTop(false);
    return () => setHasPaddingTop(true);
  }, [setHasPaddingTop]);

  return (
    <div>
      <div className="w-full sectionMain bg-(--secondary) sm:pt-(--padding-body-desktop) pt-(--padding-body-mobile)">
        <SectionTitleIcon icon={icon} iconVariant="default" size="h-[3em]">
          {title}
        </SectionTitleIcon>
      </div>

      <div className="sectionMain pt-20 sm:pt-5 gap-4! flex flex-col">
        <BackButton />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {items.map((item) => (
            <ReviewCard key={item.id} data={item} variant={variant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComunidadList;
