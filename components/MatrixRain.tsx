'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function MatrixRain({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sequence = ["3", "2", "1", "HAPPY", "BIRTHDAY", "TO", "YOU", "❤️", "SPRITE"];
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. FAST MATRIX LOGIC
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ensure canvas covers the full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).fill(1) as number[];

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FF69B4'; // Pink
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++; // Standard fast drop speed
      }
    };

    // Fast interval for the matrix background
    const intervalId = setInterval(draw, 33); 

    // Handle window resize so the matrix always reaches the bottom
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs continuously regardless of the text state

  // 2. PACED TEXT SEQUENCE LOGIC
  useEffect(() => {
    if (currentIndex >= sequence.length) {
      onComplete();
      return;
    }

    // Set custom delays to build anticipation
    let delay = 1200; // Normal speed for words
    if (currentIndex < 3) delay = 1500; // Slower countdown
    if (sequence[currentIndex] === "SPRITE") delay = 3000; // Keep the sprite on screen longer

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, onComplete, sequence]);

  const currentItem = sequence[currentIndex];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Canvas is always running in the background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Text overlays on top of the canvas */}
      <div className="absolute z-10 flex flex-col items-center justify-center w-full px-4 text-center">
        {currentItem === "SPRITE" ? (
          <div className="flex flex-col items-center animate-pulse bg-black/40 p-8 rounded-2xl backdrop-blur-sm">
            <Image src="/assets/sprite.jpg" alt="Celebration Sprite" width={200} height={200} className="mb-4 drop-shadow-[0_0_15px_rgba(255,105,180,0.8)]" />
            <h2 className="text-pink-400 text-4xl md:text-5xl font-extrabold tracking-widest drop-shadow-lg">HAPPY BIRTHDAY!</h2>
            {/* Added your requested subtext here */}
            <p className="text-pink-200/90 text-xl font-medium mt-4 tracking-wide italic">hold on, that&apos;s not all...</p>
          </div>
        ) : (
          <h1 className="text-pink-500 text-7xl md:text-9xl font-bold tracking-widest drop-shadow-lg bg-black/20 p-4 rounded-xl backdrop-blur-sm">
            {currentItem}
          </h1>
        )}
      </div>
    </div>
  );
}