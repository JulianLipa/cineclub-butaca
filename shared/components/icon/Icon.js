import Image from "next/image";

const Icon = ({ name, variant, alt }) => {
  const src = variant
    ? `/icons/i-${name}-${variant}.svg`
    : `/icons/i-${name}.svg`;

  return (
    <Image
      src={src}
      alt={alt || name}
      width={100}
      height={100}
      className={`
        h-full
        w-auto
        object-contain
      `}
    />
  );
};

export default Icon;
