import React from "react";

const CardMovieResumen = ({ title, text }) => {
  return (
    <div className="rounded-2xl overflow-hidden border-1 border-(--secondary)">
      <div className="bg-(--secondary) p-6 sm:p-8">
        <h3 className="font-[500]! text-(--primary)">{title}</h3>
      </div>

      <div className="p-6 sm:p-8">
        <p className="bodyText">{text}</p>
      </div>
    </div>
  );
};

export default CardMovieResumen;
