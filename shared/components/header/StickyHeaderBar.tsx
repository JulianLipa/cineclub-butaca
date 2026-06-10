import Header from "./Header";

export default function StickyHeaderBar({ className = "" }: { className?: string }) {
  return (
    <header className={`sticky top-0 z-[1000] relative ${className}`}>
      <Header />
    </header>
  );
}
