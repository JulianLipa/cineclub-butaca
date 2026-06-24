import Icon from "@/shared/components/icon/Icon";

const StarSection = ({ rating }) => {
  return (
    <div className="flex gap-1 w-fit">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          key={index}
          name={"star"}
          color={"var(--primary)"}
          variant={rating == null || index < rating ? "negative" : "default"}
          size="h-[1.2em]"
        />
      ))}
    </div>
  );
};

export default StarSection;
