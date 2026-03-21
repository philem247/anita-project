'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PhotoGallery({ photos }: { photos: string[] }) {
  const [formHeart, setFormHeart] = useState(false);

  useEffect(() => {
    // Automatically transition to heart shape after 6 seconds
    const timer = setTimeout(() => {
      setFormHeart(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getHeartCoordinates = (index: number, total: number) => {
    const t = (index / total) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    const scale = 14; 
    return { x: x * scale, y: y * scale };
  };

  return (
    <div className="relative w-full h-screen bg-zinc-950 overflow-hidden flex flex-col items-center justify-center">
      <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center">
        {photos.map((photo, i) => {
          const heartPos = getHeartCoordinates(i, photos.length);
          
          return (
            <motion.div
              key={i}
              className="absolute w-28 h-36 md:w-36 md:h-48 bg-white p-2 rounded-sm shadow-2xl"
              initial={{ 
                x: (Math.random() - 0.5) * 600, 
                y: (Math.random() - 0.5) * 600, 
                rotate: (Math.random() - 0.5) * 90 
              }}
              animate={{
                x: formHeart ? heartPos.x : (Math.random() - 0.5) * 400,
                y: formHeart ? heartPos.y : (Math.random() - 0.5) * 400,
                rotate: formHeart ? 0 : (Math.random() - 0.5) * 30,
                scale: formHeart ? 0.6 : 1
              }}
              transition={{
                duration: formHeart ? 3 : 12, // 3 seconds is a smooth, normal-paced assembly
                ease: formHeart ? "easeInOut" : "linear",
                repeat: formHeart ? 0 : Infinity,
                repeatType: "reverse"
              }}
              style={{
                backgroundImage: `url(${photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}