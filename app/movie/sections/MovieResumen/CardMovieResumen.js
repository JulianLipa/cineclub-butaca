import React from "react";

const CardMovieResumen = ({ title, text }) => {
  return (
    <div>
      <div className="bg-(--secondary) p-8">
        <h3 className="font-[500]! text-(--primary)">{title}</h3>
      </div>

      <div className="p-8">
        <p className="bodyText">{text}</p>
      </div>
    </div>
  );
};

export default CardMovieResumen;
