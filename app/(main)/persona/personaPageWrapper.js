"use client";

import SectionTitle from "@/shared/components/section-title/SectionTitle";
import { useHeroLayout } from "@/shared/hooks/useHeroLayout";
import CarouselSection from "@/shared/components/carouselSection/CarouselSection";
import MovieCard from "@/shared/ui/movieCard/MovieCard";
import BackButton from "@/shared/components/backButton/BackButton";
import PersonaSidebar from "./sections/PersonaSidebar";
import PersonaBiografia from "./sections/PersonaBiografia";

const PersonaPageWrapper = ({ persona }) => {
  useHeroLayout();

  return (
    <div>
      <div className="sectionMain flex justify-start pb-0!">
        <BackButton />
      </div>
      <div className="sectionMain relative flex flex-col sm:flex-row gap-10! top-0">
        <PersonaSidebar data={persona} />

        <div className="w-full sm:w-[70%] flex flex-col gap-10 sm:py-(--padding-body-desktop)">
          {persona?.biografia && (
            <div className="colSection">
              <SectionTitle>Biografía</SectionTitle>
              <PersonaBiografia text={persona.biografia} />
            </div>
          )}

          {persona?.actuaciones?.length > 0 && (
            <CarouselSection
              title="Filmografía"
              items={persona.actuaciones}
              renderItem={(movie) => (
                <MovieCard tmdbId={movie.tmdbId} text={true} />
              )}
              breakpoints={{
                0: { slidesPerView: 2.5, spaceBetween: 16 },
                1024: { slidesPerView: 4.2, spaceBetween: 16 },
              }}
            />
          )}

          {persona?.dirigidas?.length > 0 && (
            <CarouselSection
              title="Como director/a"
              items={persona.dirigidas}
              renderItem={(movie) => (
                <MovieCard tmdbId={movie.tmdbId} text={true} />
              )}
              breakpoints={{
                0: { slidesPerView: 2.5, spaceBetween: 16 },
                1024: { slidesPerView: 4.2, spaceBetween: 16 },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonaPageWrapper;
