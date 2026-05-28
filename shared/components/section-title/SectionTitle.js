import React from "react";

const SectionTitle = ({ children, colorBorder = "primary" }) => {
  return (
    <div className="flex gap-2 items-center">
      <h3
        className={`text-[1.2em] sm:text-[1.5em] font-semibold`}
        style={{ color: `var(--${colorBorder})` }}
      >
        {children}
      </h3>
    </div>
  );
};

export default SectionTitle;
