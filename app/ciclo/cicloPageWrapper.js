"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

import MovieHero from "@/app/movie/sections/MovieHero";
import Icon from "@/shared/components/icon/Icon";
import Button from "@/shared/ui/button/Button";

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
        <Button onClick={() => history.back()} className="pl-0!">
          <Icon name="flecha" color="var(--primary)" size={"h-4 w-4!"} />
        </Button>
      </div>

      <div className="sectionMain flex flex-col gap-10! md:mt-10">
        <h1 className="text-[2rem]! font-[700]!">{ciclo?.title}</h1>
        <p className="bodyText">{ciclo?.description}</p>
      </div>
    </div>
  );
};

export default CicloPageWrapper;
