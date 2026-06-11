"use client";

import { useRef, useState, useEffect } from "react";
import HeroVideo from "./HeroVideo";
import HeroProgressBar from "./HeroProgressBar";
import HeroContent from "./HeroContent";
import HeroControls from "./HeroControls";
import Image from "next/image";

const HeroSection = () => {
  const videoRef = useRef(null);
  const bottomDivRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bottomDivHeight, setBottomDivHeight] = useState(0);
  const [contentHidden, setContentHidden] = useState(false);
  const [animateOffset, setAnimateOffset] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);
  const [bottomFading, setBottomFading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setBottomVisible(true);
      setBottomFading(true);
      setTimeout(() => setBottomFading(false), 420);
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(Math.min(window.scrollY / 100, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!bottomDivRef.current) return;
    const updateHeight = () => {
      setBottomDivHeight(bottomDivRef.current?.offsetHeight ?? 0);
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(bottomDivRef.current);
    return () => observer.disconnect();
  }, []);

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

  // Offset del wrapper de HeroContent (se desplaza cuando contentHidden o scroll)
  const contentOffset = (contentHidden || !bottomVisible)
    ? bottomDivHeight
    : scrollProgress * bottomDivHeight;

  // Offset de la progressBar (absolute bottom:0, sube para posicionarse sobre heroBottomDiv)
  // translateY negativo = sube desde bottom-0
  const progressBarOffset =
    contentHidden || !bottomVisible
      ? 0
      : -(bottomDivHeight * (1 - scrollProgress));

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ height: "100svh" }}
    >
      <HeroVideo videoRef={videoRef} onTimeUpdate={handleTimeUpdate} />

      <HeroControls
        playing={playing}
        muted={muted}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        contentHidden={contentHidden}
        onToggleContent={() => {
          setAnimateOffset(true);
          setContentHidden((v) => !v);
          setTimeout(() => setAnimateOffset(false), 420);
        }}
        className="absolute top-0 left-0 py-(--padding-body-mobile) px-(--padding-body-mobile-w) sm:py-(--padding-body-desktop) sm:px-(--padding-body-desktop-w)"
      />

      {/* HeroContent: se desplaza con scroll y con contentHidden */}
      <div
        style={{
          transform: `translateY(${contentOffset}px)`,
          transition: animateOffset || bottomFading ? "transform 0.4s ease" : "none",
          willChange: "transform",
        }}
      >
        <div
          style={{
            opacity: contentHidden ? 0 : 1,
            pointerEvents: contentHidden ? "none" : "auto",
            transition: "opacity 0.4s ease",
          }}
        >
          <HeroContent />
        </div>
      </div>

      {/* ProgressBar: absolute bottom-0, sube sobre heroBottomDiv cuando está visible */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          transform: `translateY(${progressBarOffset}px)`,
          transition:
            animateOffset || bottomFading ? "transform 0.4s ease" : "none",
          willChange: "transform",
        }}
      >
        <HeroProgressBar progress={progress} onSeek={handleSeek} />
      </div>

      <div
        ref={bottomDivRef}
        className="bg-(--white) heroBottomDiv flex sm:flex-row flex-col z-100 gap-4 sm:pl-(--padding-body-desktop-w) p-(--padding-body-mobile-w)"
        style={{
          opacity: !bottomVisible || contentHidden ? 0 : 1 - scrollProgress,
          transform: `translateY(${scrollProgress * 24}px)`,
          pointerEvents:
            !bottomVisible || contentHidden || scrollProgress === 1
              ? "none"
              : "auto",
          transition: bottomFading || contentHidden ? "opacity 0.4s ease" : "none",
          willChange: "opacity, transform",
        }}
      >
        <Image
          src={"/imgs/icons.svg"}
          alt=""
          width={100}
          height={50}
          className="h-auto sm:w-auto object-contain"
          loading="eager"
        />

        <div>
          <p className="font-[600] text-2xl leading-tight">Cineclub Butaca</p>
          <p className="sm:text-[1em] text-[.8em] leading-tight">
            Proyecto cinematográfico, social y colaborativo
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
