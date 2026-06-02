import Button from "@/shared/ui/button/Button";
import style from "./EventRow.module.css";
import { formatISODayMonth } from "@/lib/dates";

const EventRow = ({ date, event, isPastMonth }) => {
  return (
    <div className="flex min-w-0 gap-2 text-xs items-center">
      <Button variant="secondary" className="w-full" disabled={isPastMonth}>
        <span className="flex min-w-0 items-center gap-2 w-full">
          <span className={`${style.dayBox}`}>
            {formatISODayMonth(date)}
          </span>

          <span className="flex-1 min-w-0 break-words whitespace-normal text-left">
            {event.title || event}
          </span>
        </span>
      </Button>
    </div>
  );
};

export default EventRow;
