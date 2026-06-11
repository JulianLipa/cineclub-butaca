"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

import MovieHero from "@/app/(main)/movie/sections/MovieHero";
import BackButton from "@/shared/components/backButton/BackButton";

const CicloPageWrapper = ({ ciclo }) => {
  const { setHasPaddingTop } = useLayout();

  useEffect(() => {
    setHasPaddingTop(false);
    return () => setHasPaddingTop(true);
  }, [setHasPaddingTop]);

  return (
    <div>
      <MovieHero img={ciclo?.frame} className="block" />

      <div className="sectionMain flex justify-start pb-0! md:mt-10">
        <BackButton />
      </div>

      <div className="sectionMain flex flex-col gap-10! md:mt-10">
        <h1 className="text-[1.5rem]! sm:text-[2rem]! font-[700]!">{ciclo?.title}</h1>
        <p className="bodyText">{ciclo?.description}</p>
      </div>
    </div>
  );
};

export default CicloPageWrapper;
