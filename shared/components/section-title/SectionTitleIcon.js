import Icon from "@/shared/components/icon/Icon";

const SectionTitleIcon = ({
  children,
  icon,
  iconVariant = "negative",
  className,
  size = "h-[1.2em]",
}) => {
  return (
    <div className="flex items-center gap-2">
      {icon && (
        <div
          className={`${icon === "comunidad" && "w-[4em]"} h-[1.2em] w-[1.2em] shrink-0 flex items-center justify-center`}
        >
          <Icon
            name={icon}
            color={"var(--primary)"}
            variant={iconVariant}
            size={size}
          />
        </div>
      )}

      <h3 className={`text-[18px] sm:text-[22px] font-semibold ${className}`}>
        {children}
      </h3>
    </div>
  );
};

export default SectionTitleIcon;
