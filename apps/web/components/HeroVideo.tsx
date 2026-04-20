"use client";

import { useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (!videoRef.current) return;

    const newMuted = !isMuted;

    videoRef.current.muted = newMuted; // 🔥 update DOM
    setIsMuted(newMuted);              // 🔥 update state
  };

  const videoUrl =
    "https://res.cloudinary.com/dohkwcnvb/video/upload/v1776067813/1776063145630477expMp4_qg3ovn.mp4";

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8">
      
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted={isMuted} // ✅ FIX
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* 🔊 SOUND BUTTON */}
      <button
        onClick={toggleSound}
        className="absolute bottom-4 right-4 bg-white/80 px-4 py-2 rounded-lg"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}