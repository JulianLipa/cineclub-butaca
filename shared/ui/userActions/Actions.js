import Button from "@/shared/ui/button/Button";

const Actions = ({ icons, className, variant, divClassname }) => {
  const actions = [
    { icon: "eye", value: 28 },
    { icon: "like", value: 28 },
    { icon: "comentarios", value: 28 },
    { icon: "star", value: 28 },
  ];

  const filteredActions = actions.filter((item) => icons?.includes(item.icon));
  return (
    <div className={`flex gap-2 sm:gap-4 ${divClassname}`}>
      {filteredActions.map((item, index) => (
        <Button
          key={index}
          variant={variant}
          className={`bodyText ${className}`}
          icon={item.icon}
        >
          {item.value}
        </Button>
      ))}
    </div>
  );
};

export default Actions;
