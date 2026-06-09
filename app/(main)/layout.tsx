import ConditionalHeader from "@/shared/components/header/ConditionalHeader";
import MainWrapper from "@/shared/components/mainWrapper/MainWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ConditionalHeader />
      <MainWrapper>{children}</MainWrapper>
    </>
  );
}
