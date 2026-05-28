import CardDetails from "@/shared/ui/card/CardDetails";
import Button from "@/shared/ui/button/Button";

import style from "@/shared/ui/card/card.module.css";

const CardText = (props) => {
  return (
    <div className={style.cardDivText}>
      {/* HEADER */}
      <div className="w-fit">
        <Button
          variant="buttonText"
          className="text-left text-[24px] font-[600]!"
        >
          {props.title}, {props.year}
        </Button>

        <h5 className="text-[1.25em] bodyText font-[400]!">Dir. {props.director}</h5>
      </div>

      <CardDetails {...props} isCard={true} />

      {/* ACTIONS */}
      <div className={`flex w-full gap-2 ${style.buttonDiv}`}>
        <Button variant="primary" href={props.hrefMain}>
          {props.textButtonMain}
        </Button>

        <Button variant="secondary" href={props.hrefSecondary}>
          {props.textButtonSecondary}
        </Button>
      </div>
    </div>
  );
};

export default CardText;
