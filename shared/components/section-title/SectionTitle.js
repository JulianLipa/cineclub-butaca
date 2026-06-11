import React from "react";

const SectionTitle = ({ children, colorBorder = "primary", className }) => {
  return (
    <div className="flex gap-2 items-center">
      <h3
        className={`text-[18px] sm:text-[22px] font-semibold ${className}`}
        style={{ color: `var(--${colorBorder})` }}
      >
        {children}
      </h3>
    </div>
  );
};

export default SectionTitle;
