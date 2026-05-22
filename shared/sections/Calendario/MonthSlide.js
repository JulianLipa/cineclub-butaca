import MonthCard from "./MonthCard";

const MonthSlide = ({ year, monthIndex, today, events, slideRef }) => {
  // Parsear fechas de forma segura (asumiendo formato YYYY-MM-DD)
  const monthEvents = Object.entries(events).filter(([date]) => {
    try {
      const [y, m, d] = date.split("-").map(Number);
      return m - 1 === monthIndex && y === year;
    } catch {
      console.warn(`Fecha inválida: ${date}`);
      return false;
    }
  });

  const isPastMonth =
    year < today.getFullYear() ||
    (year === today.getFullYear() && monthIndex < today.getMonth());

  return (
    <div ref={slideRef} className="flex snap-start shrink-0 flex-col gap-3">
      <div className="flex flex-col gap-2 w-full justify-center">
        <MonthCard
          year={year}
          monthIndex={monthIndex}
          today={today}
          events={events}
          isPastMonth={isPastMonth}
        />
      </div>
    </div>
  );
};

export default MonthSlide;
