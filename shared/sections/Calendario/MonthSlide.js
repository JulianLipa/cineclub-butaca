import MonthCard from "./MonthCard";
import { parseISODate } from "@/lib/dates";

const MonthSlide = ({ year, monthIndex, today, events, filter }) => {
  const monthEvents = Object.entries(events).filter(([date]) => {
    try {
      const d = parseISODate(date);
      return d.getMonth() === monthIndex && d.getFullYear() === year;
    } catch {
      console.warn(`Fecha inválida: ${date}`);
      return false;
    }
  });

  const isPastMonth =
    year < today.getFullYear() ||
    (year === today.getFullYear() && monthIndex < today.getMonth());

  return (
    <div className="flex snap-start shrink-0 flex-col gap-2">
      <div className="flex flex-col gap-2 w-full justify-center">
        <MonthCard
          year={year}
          monthIndex={monthIndex}
          today={today}
          events={events}
          isPastMonth={isPastMonth}
          filter={filter}
        />
      </div>
    </div>
  );
};

export default MonthSlide;
