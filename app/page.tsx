'use client';
import { useState, useRef } from "react";
import MatrixRain from "../components/MatrixRain";
import BookScene from "../components/BookScene";
import PhotoGallery from "../components/PhotoGallery";

export default function Home() {
  // We start at step -1 for the "Tap to Begin" screen
  const [step, setStep] = useState(-1); 
  const audioRef = useRef<HTMLAudioElement>(null);

  const photos = Array.from({ length: 25 }).map((_, i) => `/assets/photo-${i + 1}.jpg`);

  const handleStart = () => {
    // Play the audio on this first interaction
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    // Move to the Matrix sequence
    setStep(0);
  };

  return (
    <main className="w-full min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Audio element is attached to a ref so we can trigger it */}
      <audio ref={audioRef} id="bg-audio" src="/assets/bg-music.mp3" loop />

      {/* STEP -1: The Entry Gate to unlock audio */}
      {step === -1 && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
          <button 
            onClick={handleStart}
            className="px-8 py-4 bg-pink-900/40 border border-pink-500/50 rounded-full text-pink-300 tracking-widest hover:bg-pink-800/60 hover:scale-105 transition-all duration-300 animate-pulse"
          >
            TAP HERE FOR A SURPRISE
          </button>
        </div>
      )}

      {/* The rest of your scenes */}
      {step === 0 && <MatrixRain onComplete={() => setStep(1)} />}
      {step === 1 && <BookScene onOpen={() => setStep(2)} />}
      {step === 2 && <PhotoGallery photos={photos} />}
    </main>
  );
}