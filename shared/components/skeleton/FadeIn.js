const FadeIn = ({ loading, ready = true, skeleton, children }) => (
  <div className="relative">
    <div
      className={`transition-opacity duration-500 ${loading || !ready ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"}`}
    >
      {skeleton}
    </div>
    <div
      className={`transition-opacity duration-500 ${loading || !ready ? "opacity-0 pointer-events-none absolute inset-0" : "opacity-100"}`}
    >
      {children}
    </div>
  </div>
);

export default FadeIn;
