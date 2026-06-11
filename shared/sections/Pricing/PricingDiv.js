import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";
import Button from "@/shared/ui/button/Button";

const PricingDiv = ({ data, className }) => {
  return (
    <div
      className={`${className} rounded-t-4xl rounded-b-2xl bg-(--white) gap-6 p-8 sm:p-10 flex flex-col cursor-pointer h-fit border border-(--white) sm:hover:border-(--primary)`}
    >
      <SectionTitleIcon icon={data.icon} iconVariant="default">
        {data.title}
      </SectionTitleIcon>

      {data.badge && (
        <div className="sm:hidden rounded-xl border-1 border-(--greenBorder) bg-(--greenFill) p-2.5 w-fit bodyText font-[200] h-fit!">
          <SectionTitleIcon
            icon={"arrow"}
            iconVariant="default"
            className="bodyText"
            size="h-[.7em]!"
          >
            {data.badge}
          </SectionTitleIcon>
        </div>
      )}

      <div className="flex gap-2 h-fit w-full flex-wrap">
        <p className="rounded-2xl border-1 bg-(--white) border-(--primary) p-4 w-fit bodyText font-[400]! text-[1.25em]!">
          {data.price}
        </p>

        {data.badge && (
          <div className="hidden sm:block rounded-xl border-1 border-(--greenBorder) bg-(--greenFill) p-2.5 w-fit bodyText font-[200] h-fit!">
            <SectionTitleIcon
              icon={"arrow"}
              iconVariant="default"
              className="font-[300]! text-[1em]!"
              size="h-[.7em]!"
            >
              {data.badge}
            </SectionTitleIcon>
          </div>
        )}
      </div>

      <ul className="flex flex-col gap-4 text-start">
        {data.features.map((feature) => (
          <li key={feature.category} className="">
            <span className="font-semibold! bodyText">
              {feature.category}:{" "}
              <span className="font-[300]! bodyText">
                {feature.description}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="w-full! flex justify-center">
        <Button variant="primary" className="w-full!" href="/login">
          {data.cta}
        </Button>
      </div>
    </div>
  );
};

export default PricingDiv;
