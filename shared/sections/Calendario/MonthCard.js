"use client";

import { useState } from "react";
import style from "./MonthCard.module.css";
import { diasSemana as WEEK_DAYS } from "@/data.json";
import { parseISODate } from "@/lib/dates";
import EventRow from "./EventRow";
import Icon from "@/shared/components/icon/Icon";

const eventIcon = (type) => (type === "ciclo" ? "rectangle" : "funcion");

const getMonthDays = (year, month) => {
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
};

const MonthCard = ({ year, monthIndex, today, events, isPastMonth, filter }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const days = getMonthDays(year, monthIndex);

  const monthEvents = Object.entries(events).filter(([date, event]) => {
    try {
      const d = parseISODate(date);
      const inMonth = d.getMonth() === monthIndex && d.getFullYear() === year;
      return inMonth && (filter === null || event.type === filter);
    } catch {
      console.warn(`Fecha inválida: ${date}`);
      return false;
    }
  });

  const visibleEvents = selectedDate
    ? monthEvents.filter(([date]) => date === selectedDate)
    : monthEvents;

  const monthName = new Date(year, monthIndex).toLocaleString("es-AR", { month: "long" });

  return (
    <div
      className={`
        flex w-full flex-col gap-4 rounded-xl
        border border-(--primary) bg-(--white) p-6 sm:p-8
        transition-opacity duration-300
        ${isPastMonth ? "opacity-20" : "opacity-100"}
      `}
    >
      <h3 className="text-center text-[14px] font-semibold uppercase tracking-wider">
        {monthName}
      </h3>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-[500] opacity-60">
        {WEEK_DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid min-w-0 grid-cols-7 gap-1 sm:gap-2 border-t-1 pt-4">
        {days.map((day, index) => {
          if (!day) return <div key={index} className={`${style.dayBox} bodyText`} />;

          const dateKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const event = events[dateKey];
          const isToday = day === today.getDate() && monthIndex === today.getMonth() && year === today.getFullYear();
          const isSelected = selectedDate === dateKey;

          return (
            <button
              key={index}
              onClick={() => event && setSelectedDate(isSelected ? null : dateKey)}
              className={`
                ${style.dayBox}
                ${event ? style.event : ""}
                ${isToday ? style.today : ""}
                ${isSelected ? style.selected : ""}
                bodyText!
              `}
            >
              {event ? (
                <Icon
                  name={eventIcon(event.type)}
                  variant="default"
                  size="h-3"
                  color="currentColor"
                />
              ) : (
                day
              )}
              {isToday && <span className={`${style.dayIndicator}`} />}
            </button>
          );
        })}
      </div>

      <div className={`flex flex-col gap-2 ${isPastMonth ? "opacity-20" : "opacity-100"} h-[200px] overflow-auto scrollbar-thumb-transparent border-t-1 pt-4`}>
        {selectedDate && (
          <button
            onClick={() => setSelectedDate(null)}
            className="flex items-center gap-1 bodyText text-xs opacity-60 hover:opacity-100 transition-opacity w-fit"
          >
            <span style={{
              display: "inline-block",
              width: "0.75rem",
              height: "0.75rem",
              WebkitMaskImage: "url(/icons/i-arrow-default.svg)",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: "url(/icons/i-arrow-default.svg)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              backgroundColor: "var(--primary)",
              transform: "scaleX(-1)",
            }} />
            Todos los eventos
          </button>
        )}
        {visibleEvents.length > 0 ? (
          visibleEvents.map(([date, event]) => (
            <EventRow key={date} date={date} event={event} isPastMonth={isPastMonth} />
          ))
        ) : (
          <p className="bodyText text-gray-400 text-sm p-2">Sin eventos</p>
        )}
      </div>
    </div>
  );
};

export default MonthCard;
