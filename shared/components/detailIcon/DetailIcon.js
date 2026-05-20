import React from "react";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import style from "@/shared/components/detailIcon/DetailIcon.module.css";

const DetailIcon = ({ children, icon, colorBorder = "primary" }) => {
  return (
    <div
      className={`p-[0.75em] border border-[var(--${colorBorder})] rounded-[0.5em] w-fit ${style.detailDiv}`}
    >
      <SectionTitleIcon icon={icon} iconVariant="default" colorBorder={colorBorder}>
        {children}
      </SectionTitleIcon>
    </div>
  );
};

export default DetailIcon;
