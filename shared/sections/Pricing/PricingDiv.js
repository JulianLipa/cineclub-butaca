import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import Button from "@/shared/ui/button/Button";

const PricingDiv = (data) => {
  const d = data.data;
  return (
    <div className="rounded-t-4xl bg-(--white) gap-6 p-8 sm:p-10 flex flex-col cursor-pointer w-fit h-fit border border-(--white) sm:hover:border-(--primary) sm:hover:bg-transparent">
      <SectionTitleIcon icon={d.icon} iconVariant="default">
        {d.title}
      </SectionTitleIcon>

      {d.badge && (
        <div className="sm:hidden rounded-xl border-1 border-(--greenBorder) bg-(--greenFill) p-2.5 w-fit bodyText font-[200] h-fit!">
          <SectionTitleIcon
            icon={"arrow"}
            iconVariant="default"
            className="font-[300]! text-[1em]!"
            size="h-[.7em]!"
          >
            {d.badge}
          </SectionTitleIcon>
        </div>
      )}

      <div className="flex gap-2 h-fit">
        <p className="rounded-2xl border-1 border-(--primary) p-4 w-fit bodyText font-[400]! text-[1.25em]!">
          {d.price}
        </p>

        {d.badge && (
          <div className="hidden sm:block rounded-xl border-1 border-(--greenBorder) bg-(--greenFill) p-2.5 w-fit bodyText font-[200] h-fit!">
            <SectionTitleIcon
              icon={"arrow"}
              iconVariant="default"
              className="font-[300]! text-[1em]!"
              size="h-[.7em]!"
            >
              {d.badge}
            </SectionTitleIcon>
          </div>
        )}
      </div>

      <ul className="flex flex-col gap-3 text-start">
        {d.features.map((feature) => (
          <li key={feature.category} className="">
            <span className="font-semibold text-[1em]">
              {feature.category}:{" "}
              <span className="font-[300]">{feature.description}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="w-full flex justify-center">
        <Button variant="primary" className="w-full!">
          {d.cta}
        </Button>
      </div>
    </div>
  );
};

export default PricingDiv;
