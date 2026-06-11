import Link from "next/link";
import style from "./EventRow.module.css";
import buttonStyle from "@/shared/ui/button/Button.module.css";
import { formatISODayMonth } from "@/lib/dates";
import Icon from "@/shared/components/icon/Icon";

const eventIcon = (type) => (type === "ciclo" ? "rectangle" : "funcion");

const getHref = (event) => {
  if (event.type === "funcion" && event.tmdbId) return `/movie/${event.tmdbId}`;
  if (event.type === "ciclo" && event.id) return `/ciclo/${event.id}`;
  return null;
};

const EventRow = ({ date, event, isPastMonth, className: extraClass = "" }) => {
  const href = isPastMonth ? null : getHref(event);

  const inner = (
    <span className="flex min-w-0 items-center gap-2 w-full">
      <span className={style.dayBox}>{formatISODayMonth(date)}</span>
      <span className="shrink-0 w-3 h-3 block" style={{
        WebkitMaskImage: `url(/icons/i-${eventIcon(event.type)}-default.svg)`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(/icons/i-${eventIcon(event.type)}-default.svg)`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        backgroundColor: "var(--primary)",
      }} />
      <span className="flex-1 min-w-0 break-words bodyText whitespace-normal text-left">
        {event.title || event}
      </span>
    </span>
  );

  const className = `${buttonStyle.button} ${buttonStyle.secondary} gap-2 w-full`;

  if (href) {
    return (
      <div className={`flex min-w-0 gap-2 text-xs items-center ${extraClass}`}>
        <Link href={href} className={className}>
          {inner}
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex min-w-0 gap-2 text-xs items-center w-fit ${extraClass}`}>
      <button className={className} disabled={isPastMonth}>
        {inner}
      </button>
    </div>
  );
};

export default EventRow;
