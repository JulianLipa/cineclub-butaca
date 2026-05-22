import React from "react";

import Button from "@/shared/ui/button/Button";

const Actions = ({ icons }) => {
  const actions = [
    { icon: "eye", value: 28 },
    { icon: "like", value: 28 },
    { icon: "comentarios", value: 28 },
  ];

  const filteredActions = actions.filter((item) => icons?.includes(item.icon));
  return (
    <div className="flex gap-2">
      {filteredActions.map((item, index) => (
        <Button
          key={index}
          variant="buttonText"
          className="font-normal text-base"
          icon={item.icon}
        >
          {item.value}
        </Button>
      ))}
    </div>
  );
};

export default Actions;
