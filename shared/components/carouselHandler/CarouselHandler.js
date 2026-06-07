"use client";

import Button from "@/shared/ui/button/Button";
import style from "@/shared/components/carouselHandler/CarouselHandler.module.css";

const CarouselHandler = ({
  totalItems,
  activeIndex,
  onPrev,
  onNext,
  isPaginatorActive,
}) => {
  return (
    <div
      className={`flex items-center gap-4 ${style.carouselDiv} pr-(--padding-body-desktop-w)`}
    >
      <Button variant="secondary" onClick={onPrev}>
        &lt;
      </Button>

      {isPaginatorActive && (
        <div className={style.carrouselPaginator}>
          {Array.from({ length: totalItems }).map((_, index) => (
            <div
              key={index}
              className={`${style.line} ${
                activeIndex === index ? style.active : ""
              }`}
            />
          ))}
        </div>
      )}

      <Button variant="secondary" onClick={onNext}>
        &gt;
      </Button>
    </div>
  );
};

export default CarouselHandler;
