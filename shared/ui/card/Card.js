import Image from "next/image";

import CardImage from "@/shared/ui/card/CardImage";
import CardText from "@/shared/ui/card/CardText";
import style from "@/shared/ui/card/card.module.css";

import DetailIcon from "@/shared/components/detailIcon/DetailIcon";

const Card = ({ isActive, ...props }) => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center">
        <DetailIcon>{props.date}</DetailIcon>
      </div>

      <div className={isActive ? style.card : ""}>
        <div className={`${style.cardContent} ${isActive ? style.visible : style.hidden}`}>
          <CardImage />

          <CardText
            {...props}
            hrefMain=""
            hrefSecondary=""
            textButtonMain="Comprar entradas"
            textButtonSecondary="Ver más"
          />
        </div>

        <div className={`relative ${!isActive ? style.visible : style.hidden}`}>
          <div className={style.cardImgContracted}>
            <Image
              src={"/imgs/frame.jpg"}
              alt=""
              width={100}
              height={100}
              className="h-auto w-full object-contain"
            />
          </div>

          <div className={style.cardImgContractedText}>
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
