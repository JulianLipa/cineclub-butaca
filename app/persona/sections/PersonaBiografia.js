import FadeIn from "@/shared/components/skeleton/FadeIn.js";
import Skeleton from "@/shared/components/skeleton/Skeleton.js";

const PersonaBiografia = ({ text }) => (
  <FadeIn
    loading={false}
    ready={!!text}
    skeleton={
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    }
  >
    {text && <p className="bodyText leading-relaxed">{text}</p>}
  </FadeIn>
);

export default PersonaBiografia;
