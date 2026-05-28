import Button from "@/shared/ui/button/Button";
import style from "./EventRow.module.css";

const EventRow = ({ date, event, isPastMonth,isMovieAction }) => {
  const day = Number(date.split("-")[2]);
  const month = Number(date.split("-")[1]);

  return (
    <div className="flex min-w-0 gap-2 text-xs items-center">
      <Button variant="secondary" className="w-full" disabled={isPastMonth}>
        <span className="flex min-w-0 items-center gap-2 w-full">
          <span className={`${style.dayBox}`}>
            {isMovieAction ? `${day} / ${month}` : `${day}`}
          </span>

          <span className="flex-1 min-w-0 break-words whitespace-normal text-left">
            {isMovieAction ? `${event}` : `${event.title}`}
          </span>
        </span>
      </Button>
    </div>
  );
};

export default EventRow;