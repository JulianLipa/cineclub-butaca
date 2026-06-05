const Icon = ({
  name,
  variant,
  alt,
  className,
  size = "h-4",
  color = "var(--primary)",
  header,
}) => {
  const iconName = variant ? `i-${name}-${variant}` : `i-${name}`;
  const iconPath = header
    ? `/icons/ui/${iconName}.svg`
    : `/icons/${iconName}.svg`;

  return (
    <div
      className={`${size} w-full shrink-0`}
      style={{
        WebkitMaskImage: `url(${iconPath})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(${iconPath})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        backgroundColor: color,
        display: "block",
      }}
      role="img"
      aria-label={alt || name}
    />
  );
};

export default Icon;
