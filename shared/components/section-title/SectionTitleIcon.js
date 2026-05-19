import React from "react";

import Icon from "@/shared/components/icon/Icon";

const SectionTitle = ({ children, ...props }) => {
  const { icon, iconVariant = "negative" } = props;

  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} variant={iconVariant} />

      <h3 className="title">{children}</h3>
    </div>
  );
};

export default SectionTitle;
