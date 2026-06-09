const HeroVideo = ({ videoRef, onTimeUpdate }) => (
  <>
    <video
      ref={videoRef}
      src="/imgs/jockey-trailer.mp4"
      autoPlay
      muted
      loop
      playsInline
      onTimeUpdate={onTimeUpdate}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/30" />
  </>
);

export default HeroVideo;
