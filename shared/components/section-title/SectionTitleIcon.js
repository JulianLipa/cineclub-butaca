import React from "react";

import Icon from "@/shared/components/icon/Icon";

const SectionTitle = ({ children, ...props }) => {
  const { icon, iconVariant = "negative" } = props;

  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} variant={iconVariant} />

      <h3 className="text-[1.5em] font-semibold">{children}</h3>
    </div>
  );
};

export default SectionTitle;
