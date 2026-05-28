import Icon from "@/shared/components/icon/Icon";

const SectionTitle = ({ children, icon, iconVariant = "negative" }) => {
  return (
    <div className="flex items-center gap-2">
      {icon && (
        <div className="h-[1.2em] w-[1.2em] shrink-0 flex items-center justify-center">
          <Icon
            name={icon}
            color={"var(--primary)"}
            variant={iconVariant}
            size="h-[1.2em]"
          />
        </div>
      )}

      <h3 className="text-[1.2em] sm:text-[1.5em] font-semibold">{children}</h3>
    </div>
  );
};

export default SectionTitle;
