import React from "react";
import Button from "@/shared/ui/button/Button";

const MovieText = (props) => {
  const actions = [
    { icon: "eye", value: 28 },
    { icon: "like", value: 28 },
    { icon: "comentarios", value: 28 },
  ];

  return (
    <div className="flex flex-col gap-1">
      <Button variant="buttonText" className="font-semibold text-xl">
        {props.title}
      </Button>

      <div className="flex gap-2">
        {actions.map((item, index) => (
          <Button
            key={index}
            variant="buttonText"
            className="font-normal"
            icon={item.icon}
          >
            {item.value}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MovieText;
