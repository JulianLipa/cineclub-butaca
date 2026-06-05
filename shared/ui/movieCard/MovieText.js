import React from "react";
import Button from "@/shared/ui/button/Button";
import Actions from "@/shared/ui/userActions/Actions.js";

import style from "@/shared/ui/movieCard/movieCard.module.css";

const MovieText = ({ data, actionsIcons }) => {
  return (
    <div className={`flex flex-col rounded-b-xl gap-2 ${style.content}`}>
      <Button variant="buttonText" className="text-[.9em] sm:text-[1em]">
        {data.titulo}, {data.anio}
      </Button>
      <div className="md:block hidden">
        {actionsIcons && <Actions icons={actionsIcons} variant="buttonText" />}
      </div>
    </div>
  );
};

export default MovieText;
