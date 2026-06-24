import ConditionalHeader from "@/shared/components/header/ConditionalHeader";
import MainWrapper from "@/shared/components/mainWrapper/MainWrapper";
import Footer from "@/shared/components/footer/Footer";
import { ArchivoLightboxProvider } from "@/contexts/ArchivoLightboxContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ArchivoLightboxProvider>
      <ConditionalHeader />
      <MainWrapper>{children}</MainWrapper>
      <Footer />
    </ArchivoLightboxProvider>
  );
}
