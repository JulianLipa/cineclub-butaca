import Image from "next/image";

const MovieHero = () => {
  return (
    <div className="h-[40svh] sm:block hidden relative overflow-hidden">
      <Image
        src="/imgs/frame.jpg"
        alt=""
        width={100}
        height={100}
        className="h-auto w-full object-cover"
      />
    </div>
  );
};

export default MovieHero;
