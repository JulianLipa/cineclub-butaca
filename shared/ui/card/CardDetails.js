import Icon from "@/shared/components/icon/Icon";
import style from "@/shared/ui/card/card.module.css";

const DETAIL_ICONS = {
  date: "calendario",
  place: "ubicacion",
  cycle: "",
};

const CardDetail = ({ type, value }) => {
  const iconName = DETAIL_ICONS[type];

  return (
    <div
      className={`
        flex
        items-center
        gap-2
        ${style.textDetail}
      `}
    >
      {iconName && (
        <div className="h-4">
          <Icon name={iconName} variant="default" />
        </div>
      )}

      <p>{value}</p>
    </div>
  );
};

export default CardDetail;
