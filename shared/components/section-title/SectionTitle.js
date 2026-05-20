import React from "react";
import Icon from "@/shared/components/icon/Icon";

const SectionTitle = ({ children }) => {
  return (
    <div className="flex gap-2 items-center">
      <h3 className="text-[1.5em] font-semibold">{children}</h3>
    </div>
  );
};

export default SectionTitle;
