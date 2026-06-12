import React from "react";

import Button from "@/shared/ui/button/Button";

const UserBadge = ({ variant, username = "username" }) => {
  return (
    <div
      className={`flex items-center gap-2 ${variant === "vertical" && "flex-col"} w-fit`}
    >
      <div className={`profileImg ${variant === "vertical" && "w-20!"}`}></div>
      <Button variant="buttonText" className="font-[400]! bodyText" href={`/perfil/${username}`}>
        @{username}
      </Button>
    </div>
  );
};

export default UserBadge;
