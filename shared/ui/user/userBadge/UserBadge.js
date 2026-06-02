import React from "react";

import Button from "@/shared/ui/button/Button";

const UserBadge = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="profileImg"></div>
      <Button variant="buttonText" className="font-[600]! text-[.9em]">
        @username
      </Button>
    </div>
  );
};

export default UserBadge;
