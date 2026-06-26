"use client";

import Link from "next/link";
import { useState } from "react";
import style from "./EventRow.module.css";
import buttonStyle from "@/shared/ui/button/Button.module.css";
import { formatISODayMonth } from "@/lib/dates";
import Icon from "@/shared/components/icon/Icon";
import { eventIcon, maskStyle } from "./calendarioUtils";

const getTitleHref = (event) => {
  if (event.type === "funcion" && event.tmdbId) return `/movie/${event.tmdbId}`;
  if (event.type === "ciclo" && event.id) return `/ciclo/${event.id}`;
  return null;
};

const getCheckoutHref = (event) => {
  if (event.type === "funcion" && event.tmdbId)
    return `/checkout/${event.tmdbId}`;
  return null;
};

const EventRow = ({
  date,
  event,
  isPastMonth,
  tmdbId,
  className: extraClass = "",
}) => {
  const isCalendarEvent = typeof event === "object" && event !== null;
  const [isHovered, setIsHovered] = useState(false);
  const [isMetaHovered, setIsMetaHovered] = useState(false);

  const btnClass = `${buttonStyle.button} ${buttonStyle.secondary} gap-2 w-full`;

  // Uso simple (MovieSidebar/MovieActions): event es un string como "En cartelera"
  if (!isCalendarEvent) {
    const checkoutHref = !isPastMonth && tmdbId ? `/checkout/${tmdbId}` : null;
    const inner = (
      <span className="flex min-w-0 items-center gap-2 w-full">
        <span className={style.dayBox}>{formatISODayMonth(date)}</span>
        <span className="flex-1 min-w-0 break-words bodyText whitespace-normal text-left">
          {event}
        </span>
      </span>
    );
    return (
      <div
        className={`flex min-w-0 gap-2 text-xs items-center w-fit ${extraClass}`}
      >
        {checkoutHref ? (
          <Link href={checkoutHref} className={btnClass}>
            {inner}
          </Link>
        ) : (
          <button className={btnClass} disabled={isPastMonth}>
            {inner}
          </button>
        )}
      </div>
    );
  }

  // Uso calendario: event es un objeto con type, title, horario, etc.
  const titleHref = isPastMonth ? null : getTitleHref(event);
  const checkoutHref = isPastMonth ? null : getCheckoutHref(event);

  const metaInner = (
    <span
      className={`${style.dayBox} ${isMetaHovered ? style.dayBoxHovered : ""}`}
    >
      {formatISODayMonth(date)}
      {event.horario && (
        <span className="flex items-center gap-1 ml-1">
          <span
            className="w-3 h-3 block shrink-0"
            style={maskStyle(
              "i-reloj-default.svg",
              isMetaHovered ? "var(--white)" : "var(--primary)",
            )}
          />
          <span className="text-[11px] font-[500] tabular-nums">
            {event.horario}
          </span>
        </span>
      )}
    </span>
  );

  const meta = checkoutHref ? (
    <Link
      href={checkoutHref}
      className="flex items-center gap-2 w-fit"
      onMouseEnter={() => setIsMetaHovered(true)}
      onMouseLeave={() => setIsMetaHovered(false)}
    >
      {metaInner}
    </Link>
  ) : (
    <span className="flex items-center gap-2">{metaInner}</span>
  );

  const inner = (
    <span className="flex items-center gap-2 w-full">
      <span
        className="shrink-0 w-4 h-4 block"
        style={maskStyle(
          `i-${eventIcon(event.type)}-default.svg`,
          isHovered ? "var(--white)" : "var(--primary)",
        )}
      />
      <span className="flex-1 min-w-0 break-words bodyText whitespace-normal text-left">
        {event.title}
      </span>
    </span>
  );

  if (titleHref) {
    return (
      <div className={`flex min-w-0 flex-col gap-4 text-xs ${extraClass}`}>
        {meta}
        <Link
          href={titleHref}
          className={btnClass}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {inner}
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex min-w-0 flex-col gap-4 text-xs ${extraClass}`}>
      {meta}
      <button
        className={btnClass}
        disabled={isPastMonth}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {inner}
      </button>
    </div>
  );
};

export default EventRow;
