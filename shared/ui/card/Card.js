import Image from "next/image";

import CardImage from "@/shared/ui/card/CardImage";
import CardText from "@/shared/ui/card/CardText";
import style from "@/shared/ui/card/card.module.css";

import DetailIcon from "@/shared/components/detailIcon/DetailIcon";

const Card = ({ isActive, hideDate, onClick, ...props }) => {
  return (
    <section className={`flex flex-col ${!isActive ? "gap-4" : ""}`}>
      <div
        className={`${!isActive ? "min-h-[3em]" : ""} flex items-center ${style.dateDetailSection}`}
      >
        {!isActive && !hideDate ? (
          <div className="flex items-center">
            <DetailIcon icon="calendario">{props.date}</DetailIcon>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`${style.cardBox} ${isActive ? style.card : ""} rounded-xl`}
      >
        <div
          className={`${style.cardContent} ${isActive ? style.visible : style.hidden}`}
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
          className={`${style.contractedView} rounded-xl overflow-hidden ${!isActive ? style.visible : style.hidden}`}
          onClick={onClick}
          style={{ cursor: !isActive ? "pointer" : "default" }}
        >
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
