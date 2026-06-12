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
  const isCalendarEvent = typeof event === "object" && event !== null;
  const href = isPastMonth ? null : (isCalendarEvent ? getHref(event) : null);

  const maskStyle = (icon) => ({
    WebkitMaskImage: `url(/icons/${icon})`,
    WebkitMaskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskImage: `url(/icons/${icon})`,
    maskSize: "contain",
    maskRepeat: "no-repeat",
    maskPosition: "center",
    backgroundColor: "var(--primary)",
  });

  const className = `${buttonStyle.button} ${buttonStyle.secondary} gap-2 w-full`;

  // Uso simple (MovieSidebar): event es un string como "En cartelera"
  if (!isCalendarEvent) {
    const inner = (
      <span className="flex min-w-0 items-center gap-2 w-full">
        <span className={style.dayBox}>{formatISODayMonth(date)}</span>
        <span className="flex-1 min-w-0 break-words bodyText whitespace-normal text-left">
          {event}
        </span>
      </span>
    );
    return (
      <div className={`flex min-w-0 gap-2 text-xs items-center w-fit ${extraClass}`}>
        <button className={className} disabled={isPastMonth}>
          {inner}
        </button>
      </div>
    );
  }

  // Uso calendario: event es un objeto con type, title, horario, etc.
  const meta = (
    <span className="flex items-center gap-2 opacity-60">
      <span className={style.dayBox}>
        {formatISODayMonth(date)}
        {event.horario && (
          <span className="flex items-center gap-1 ml-1">
            <span className="w-3 h-3 block shrink-0" style={maskStyle("i-reloj-default.svg")} />
            <span className="text-[11px] font-[500] tabular-nums">{event.horario}</span>
          </span>
        )}
      </span>
    </span>
  );

  const inner = (
    <span className="flex items-center gap-2 w-full">
      <span className="shrink-0 w-3 h-3 block" style={maskStyle(`i-${eventIcon(event.type)}-default.svg`)} />
      <span className="flex-1 min-w-0 break-words bodyText whitespace-normal text-left">
        {event.title}
      </span>
    </span>
  );

  if (href) {
    return (
      <div className={`flex min-w-0 flex-col gap-4 text-xs ${extraClass}`}>
        {meta}
        <Link href={href} className={className}>
          {inner}
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex min-w-0 flex-col gap-4 text-xs ${extraClass}`}>
      {meta}
      <button className={className} disabled={isPastMonth}>
        {inner}
      </button>
    </div>
  );
};

export default EventRow;
