import Icon from "@/shared/components/icon/Icon";
import style from "@/shared/ui/card/card.module.css";
import Button from "@/shared/ui/button/Button";

const DETAIL_ICONS = {
  date: "calendario",
  place: "ubicacion",
  cycle: "",
};

const CardDetail = ({ detail, isCard, isProfile, className }) => {
  const { type, value } = detail;
  const iconName = type ? DETAIL_ICONS[type] : null;

  if (value === undefined || value === null) return null;

  return (
    <div
      className={`
        flex
        items-center
        ${style.textDetail}
        ${!isCard ? "sm:pt-0! sm:pb-0!" : ""}
        ${className}
      `}
    >
      {iconName && (
        <div className="h-4 w-4 shrink-0 hidden sm:block">
          <Icon name={iconName} variant="default" />
        </div>
      )}
      <Button
        className={`${isProfile && "text-(--touchable)!"} bodyText`}
        variant={"buttonText"}
      >
        {value}
      </Button>
    </div>
  );
};

export default CardDetail;
