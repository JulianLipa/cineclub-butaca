import Icon from "@/shared/components/icon/Icon";
import style from "@/shared/ui/card/card.module.css";

const DETAIL_ICONS = {
  date: "calendario",
  place: "ubicacion",
  cycle: "",
};

const CardDetail = ({ detail, isCard, className, fontCassName }) => {
  const { type, value } = detail;
  const iconName = type ? DETAIL_ICONS[type] : null;

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

      <p className={`bodyText`}>{value}</p>
    </div>
  );
};

export default CardDetail;
