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

const MonthCard = ({ year, monthIndex, today, events }) => {
  const days = getMonthDays(year, monthIndex);

  const monthName = new Date(year, monthIndex).toLocaleString("es-AR", {
    month: "long",
  });

  return (
    <div className="flex w-[20em] flex-col gap-5 rounded-xl border border-(--primary) bg-(--white) p-5">
      <h3 className="flex w-full justify-center text-sm font-semibold uppercase">
        {monthName}
      </h3>

      {/* Cabecera */}
      <div className="grid grid-cols-7 text-center text-[10px]">
        {WEEK_DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {/* Días */}
      <div className="grid grid-cols-7 gap-1">
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

              {event && <span className={style.eventIndicator} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MonthCard;
