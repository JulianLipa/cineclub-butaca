import React from "react";
import Image from "next/image";

const MovieTrailer = () => {
  return (
    <div className="colSection">
    
      <Image
        src="/imgs/frame.jpg"
        alt=""
        width={300}
        height={300}
        className="h-auto w-full object-cover rounded-xl"
      />
    </div>
  );
};

export default MovieTrailer;
