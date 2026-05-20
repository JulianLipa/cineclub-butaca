import ProxFuncionesSection from "@/app/home/ProxFuncionesSection/ProxFuncionesSection";
import CalendarioClubSection from "@/app/home/CalendarioClubSection/CalendarioClubSection";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-10">
        <ProxFuncionesSection />
        <CalendarioClubSection />
      </main>
    </div>
  );
}
