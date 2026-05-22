import React from "react";

import UserBadge from "@/shared/ui/user/userBadge/userBadge";
import Actions from "@/shared/ui/actions/Actions.js";
import Button from "@/shared/ui/button/Button";

import style from "@/shared/ui/reviewCard/reviewCard.module.css";

const ReviewCard = ({ data }) => {
  return (
    <div
      className={`flex flex-col w-full rounded-xl p-4 gap-4 ${style.reviewCard}`}
    >
      <UserBadge></UserBadge>

      <Button variant="buttonText" className="text-[.8em] font-semibold">
        {data.title}, {data.year}
      </Button>

      <p className="text-[.8em] font-normal">
        Es un clásico del terror psicológico con un final muy fuerte. No es solo
        miedo, es tristeza y rabia acumulada.
      </p>
      <Actions icons={["eye", "like"]} />
    </div>
  );
};

export default ReviewCard;
