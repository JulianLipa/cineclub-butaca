"use client";

import { useRef, useState } from "react";
import HeroVideo from "./HeroVideo";
import HeroControls from "./HeroControls";
import HeroProgressBar from "./HeroProgressBar";
import HeroContent from "./HeroContent";

const HeroSection = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
  };

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ height: "100svh" }}
    >
      <HeroVideo videoRef={videoRef} onTimeUpdate={handleTimeUpdate} />


      <HeroContent />
      
      <HeroControls
        playing={playing}
        muted={muted}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
      />

      <HeroProgressBar progress={progress} onSeek={handleSeek} />
    </section>
  );
};

export default HeroSection;
