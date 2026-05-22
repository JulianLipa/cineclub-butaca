import React from "react";
import Button from "@/shared/ui/button/Button";
import Actions from "@/shared/ui/actions/Actions.js";

import style from "@/shared/ui/movieCard/movieCard.module.css";

const MovieText = ({ data, actionsIcons }) => {
  return (
    <div className={`flex flex-col rounded-b-xl gap-2 ${style.content}`}>
      <Button variant="buttonText" className="font-medium text-xl">
        {data.title}, {data.year}
      </Button>

      <Actions icons={actionsIcons} />
    </div>
  );
};

export default MovieText;
