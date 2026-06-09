const HeroProgressBar = ({ progress, onSeek }) => (
  <div
    onClick={onSeek}
    className="w-full z-20 cursor-pointer"
    style={{ height: "8px" }}
  >
    <div className="w-full h-full" style={{ backgroundColor: "var(--white)" }}>
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          backgroundColor: "var(--primary)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  </div>
);

export default HeroProgressBar;
