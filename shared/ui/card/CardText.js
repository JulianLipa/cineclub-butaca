import React from "react";

import CardDetails from "@/shared/ui/card/CardDetails";
import Button from "@/shared/ui/button/Button";

import style from "@/shared/ui/card/card.module.css";

const CardText = (props) => {
  return (
    <div className={style.cardDiv}>
      {/* HEADER */}
      <div>
        <h4 className="title">
          {props.title}, {props.year}
        </h4>

        <h5 className="title">Dir. {props.subtitle}</h5>
      </div>

      {/* DETAILS */}
      <div className={`flex flex-wrap ${style.detailsContainer}`}>
        <CardDetails type="date" value={props.hour} />
        <CardDetails value={props.date} />
        <CardDetails type="place" value={props.place} />
        <CardDetails type="cycle" value={props.cycle} />
      </div>

      {/* ACTIONS */}
      <div className={`flex w-full gap-2 ${style.buttonCardDiv}`}>
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
