import Image from "next/image";

import CardImage from "@/shared/ui/card/CardImage";
import CardText from "@/shared/ui/card/CardText";
import style from "@/shared/ui/card/card.module.css";

import DetailIcon from "@/shared/components/detailIcon/DetailIcon";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

const Card = ({ isActive, ...props }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  console.log(isMobile);
  return (
    <section>
      <div className={style.divDetailIcon}>
        <DetailIcon>{props.date}</DetailIcon>
      </div>

      <div
        className={`${isActive ? style.card : ""} ${isActive ? style.active : ""}`}
      >
        <div
          className={`${style.cardContent} ${
            isActive ? style.visible : style.hidden
          }`}
        >
          <CardImage />

          <CardText
            {...props}
            hrefMain=""
            hrefSecondary=""
            textButtonMain="Comprar entradas"
            textButtonSecondary="Ver más"
          />
        </div>

        <div
          className={`${style.cardImgContractedDiv} ${
            !isActive ? style.visible : style.hidden
          }`}
        >
          <div className={`${style.cardImgContracted}`}>
            <Image
              src={"/imgs/frame.jpg"}
              alt=""
              width={100}
              height={100}
              className="h-auto w-full object-contain"
            />
          </div>

          <div className={`${style.cardImgContractedText}`}>
            <h4>
              {props.title}, {props.year}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
