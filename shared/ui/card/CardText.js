import React from "react";

import CardDetails from "@/shared/ui/card/CardDetails";
import Button from "@/shared/ui/button/Button";

import style from "@/shared/ui/card/card.module.css";

const CardText = (props) => {
  const details = [
    { type: "date", value: props.date },
    { value: props.hour },
    { type: "place", value: props.place },
    { type: "cycle", value: props.cycle },
  ];

  return (
    <div className={style.cardDiv}>
      {/* HEADER */}
      <div className="w-fit">
        <Button variant="buttonText" className="text-left text-[1.5em] font-semibold">
          {props.title}, {props.year}
        </Button>

        <h5 className="text-[1.25em] font-light">Dir. {props.director}</h5>
      </div>

      {/* DETAILS */}
      <div className={`flex flex-wrap ${style.detailsContainer}`}>
        {details.map((detail, index) => (
          <div key={index} className={index >= 2 ? "hidden sm:flex" : "flex"}>
            <CardDetails {...detail} />
          </div>
        ))}
      </div>

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
