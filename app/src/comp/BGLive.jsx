"use client";

import React, { useEffect, useRef, useState } from "react";
import DCP from "./DCProfile.jsx";

const BGLive = () => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
  }, []);

  const handleStart = () => {
    setOverlayVisible(false);

    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Erro ao iniciar áudio:", err));
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden z-10">
      {/* Vídeo de fundo */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/assets/Wallpaper.mp4"
      >
        Your browser does not support the video tag.
      </video>

      {/* Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-10" />

      {/* Conteúdo */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
        <DCP />
      </div>

      {/* Áudio */}
      <audio
        ref={(el) => {
          if (el) {
            el.volume = 0.1;
            audioRef.current = el;
          }
        }}
        controls
        loop
        playsInline
        src="/assets/Vignett.mp3"
      >
        Your browser does not support the audio element.
      </audio>

      {/* Overlay */}
      <div
        onClick={handleStart}
        className={`absolute inset-0 bg-black z-30 transition-opacity duration-1000 ease-in-out cursor-pointer ${
          overlayVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-center h-full text-white text-2xl animate-pulse font-bold">
          Click
        </div>
      </div>
    </div>
  );
};

export default BGLive;
