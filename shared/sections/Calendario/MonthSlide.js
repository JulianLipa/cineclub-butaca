import MonthCard from "./MonthCard";
import EventRow from "./EventRow";

const MonthSlide = ({ year, monthIndex, today, events, slideRef }) => {
  const monthEvents = Object.entries(events).filter(([date]) => {
    const eventDate = new Date(date);

    return (
      eventDate.getMonth() === monthIndex && eventDate.getFullYear() === year
    );
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
        <div
          className={`flex flex-col gap-2 ${isPastMonth ? "opacity-20" : "opacity-100"} h-[150px] overflow-auto scrollbar-thumb-transparent`}
        >
          {monthEvents.map(([date, event]) => (
            <EventRow
              key={date}
              date={date}
              event={event}
              isPastMonth={isPastMonth}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthSlide;
