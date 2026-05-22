import style from "./MonthCard.module.css";
import { diasSemana as WEEK_DAYS } from "@/data.json";

const getMonthDays = (year, month) => {
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return days;
};

const MonthCard = ({ year, monthIndex, today, events, isPastMonth }) => {
  const days = getMonthDays(year, monthIndex);

  const monthName = new Date(year, monthIndex).toLocaleString("es-AR", {
    month: "long",
  });

  return (
    <div
      className={`
        flex w-full flex-col gap-4 rounded-xl
        border border-(--primary) bg-(--white) p-8
        transition-opacity duration-300
        ${isPastMonth ? "opacity-20" : "opacity-100"}
      `}
    >
      {/* Título */}
      <h3 className="text-center text-[16px] sm:text-[14px] font-semibold uppercase sm:text-sm">
        {monthName}
      </h3>

      {/* Header */}
      <div className="grid grid-cols-7 gap-[2px] text-center text-[12px] sm:text-[10px] sm:gap-1 sm:text-xs">
        {WEEK_DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {/* Días */}
      <div className="grid min-w-0 grid-cols-7 gap-[2px] sm:gap-2">
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className={style.dayBox} />;
          }

          const dateKey = `${year}-${String(monthIndex + 1).padStart(
            2,
            "0",
          )}-${String(day).padStart(2, "0")}`;

          const event = events[dateKey];

          const isToday =
            day === today.getDate() &&
            monthIndex === today.getMonth() &&
            year === today.getFullYear();

          return (
            <button
              key={index}
              className={`
                ${style.dayBox}
                ${event ? style.event : ""}
                ${isToday ? style.today : ""}
              `}
            >
              {day}

              {isToday && <span className={style.dayIndicator} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MonthCard;
