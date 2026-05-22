import React from "react";

import Button from "@/shared/ui/button/Button";
import style from "@/shared/ui/user/userBadge/userBadge.module.css";

const UserBadge = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="profileImg"></div>
      <Button variant="buttonText" className="font-semibold text-[.8em]">
        @username
      </Button>
    </div>
  );
};

export default UserBadge;
