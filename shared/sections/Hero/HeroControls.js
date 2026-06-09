const btnStyle = {
  backgroundColor: "var(--white-opacidad)",
  border: "1px solid var(--primary)",
  color: "var(--primary)",
  borderRadius: "1em",
  padding: "0.5em 0.75em",
  backdropFilter: "blur(10px)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const onEnter = (e) => {
  e.currentTarget.style.backgroundColor = "var(--primary)";
  e.currentTarget.style.color = "var(--white)";
  e.currentTarget.style.transform = "translateY(-2px)";
};

const onLeave = (e) => {
  e.currentTarget.style.backgroundColor = "var(--white-opacidad)";
  e.currentTarget.style.color = "var(--primary)";
  e.currentTarget.style.transform = "translateY(0)";
};

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3 2.5a.5.5 0 0 1 .765-.424l10 5.5a.5.5 0 0 1 0 .848l-10 5.5A.5.5 0 0 1 3 13.5v-11z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <rect x="3" y="2" width="4" height="12" rx="1" />
    <rect x="9" y="2" width="4" height="12" rx="1" />
  </svg>
);

const MutedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H2a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1.825l2.363-1.89a.5.5 0 0 1 .529-.06z" />
    <line x1="10" y1="6" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const UnmutedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
    <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707z" />
    <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H2a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1.825l2.363-1.89a.5.5 0 0 1 .529-.06z" />
  </svg>
);

const HeroControls = ({ playing, muted, onTogglePlay, onToggleMute }) => (
  <div className="pt-0! z-20 flex gap-2 sectionMain gap-2!">
    <button
      onClick={onTogglePlay}
      aria-label={playing ? "Pausar video" : "Reproducir video"}
      style={btnStyle}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>

    <button
      onClick={onToggleMute}
      aria-label={muted ? "Activar sonido" : "Silenciar"}
      style={btnStyle}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {muted ? <MutedIcon /> : <UnmutedIcon />}
    </button>
  </div>
);

export default HeroControls;
