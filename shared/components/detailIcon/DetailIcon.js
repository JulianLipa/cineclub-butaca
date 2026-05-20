import React from "react";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import style from "@/shared/components/detailIcon/DetailIcon.module.css";

const DetailIcon = ({ children }) => {
  return (
    <div className={`p-[0.75em] border border-[var(--primary)] rounded-[0.5em] w-fit ${style.detailDiv}`}>
      <SectionTitleIcon icon="calendario" iconVariant="default">
        {children}
      </SectionTitleIcon>
    </div>
  );
};

export default DetailIcon;
