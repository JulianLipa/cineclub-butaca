import Icon from "@/shared/components/icon/Icon";

const StarSection = () => {
  return (
    <div className="flex gap-1.25 w-fit">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          key={index}
          name={"star"}
          color={"var(--primary)"}
          variant={"negative"}
          size="h-[1.2em]"
        />
      ))}
    </div>
  );
};

export default StarSection;
