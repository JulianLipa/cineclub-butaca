import CardDetail from "./CardDetail";
import style from "@/shared/ui/card/card.module.css";

const CardDetails = ({
  isCard = false,
  date,
  hour,
  place,
  cycle,
  className,
  ...otherProps
}) => {
  let details = [];

  if (isCard) {
    details = [
      { type: "date", value: date },
      { value: hour },
      { type: "place", value: place },
      { type: "cycle", value: cycle },
    ];
  } else {
    // Convierte todas las props en detalles simples
    details = Object.entries(otherProps).map(([key, value]) => ({
      value: value,
    }));
  }

  return (
    <div
      className={`flex flex-wrap h-fit ${style.detailsContainer} ${!isCard ? "border-0!" : ""}`}
    >
      {details.map((detail, index) => (
        <div
          key={index}
          className={index >= 3 && isCard ? "hidden sm:flex" : "flex"}
        >
          <CardDetail detail={detail} isCard={isCard} className={className} />
        </div>
      ))}
    </div>
  );
};

export default CardDetails;
