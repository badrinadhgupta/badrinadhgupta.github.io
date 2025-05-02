"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VideoBackground from './VideoBackground';

interface HeroSectionProps {
  videoUrl: string;
  parallaxOffset: number;
  nameAnimationStarted: boolean;
  handleContactClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  videoUrl, 
  parallaxOffset, 
  nameAnimationStarted,
  handleContactClick
}) => {
  // Split name into letters for animation
  const firstNameLetters = "Badri".split("");
  const lastNameLetters = "Nerella".split("");

  // Letter animation variants
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      x: -30 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: { 
        delay: i * 0.04, 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] // Custom ease curve for more dynamic movement
      }
    })
  };

  return (
    <VideoBackground videoSrc={videoUrl}>
      {/* Content container for the first screen */}
      {/* Changed min-h-screen to h-screen to fix height to one screen */}
      <main className="relative h-[100dvh]"> {/* Ensure this section uses dynamic viewport height */}
        
        {/* Wrapper for top-left/top-right elements - Changed to justify-end to place button at right */}
        <div className="p-4 flex flex-row justify-end items-center md:p-6 absolute inset-x-0 top-0 z-10"> 
          {/* Commented out ASIC engineer section */}
          {/* 
          <div className="text-black px-[clamp(0.5rem,_2vw,_0.75rem)] py-[clamp(0.25rem,_1vw,_0.375rem)]"> 
            <div className="flex items-center flex-wrap gap-1 md:gap-1.5 text-[clamp(0.8rem,_3vw,_1.1rem)] md:text-lg"> 
              <span>ASIC engineer @</span>
              <div className="relative inline-block align-middle h-[clamp(18px,_4vw,_24px)] md:h-[24px]"> 
                <Image 
                  src="/NVIDIA_horizontal.png"
                  alt="Nvidia Logo"
                  width={0}
                  height={0}
                  style={{ height: '100%', width: 'auto' }}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          */}

          {/* Button in top-right corner - Keep consistent with ASIC engineer pill */}
          <button
            onClick={handleContactClick}
            className="flex items-center gap-1.5 md:gap-2 bg-black text-white px-[clamp(0.75rem,_3vw,_1rem)] py-[clamp(0.375rem,_1.5vw,_0.5rem)] rounded-full text-[clamp(0.8rem,_3vw,_1.1rem)] md:text-lg shadow-md md:hover:bg-gray-900 md:hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer"
          >
            <span>Contact Me</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5 19.5 4.5M19.5 4.5v10.5M19.5 4.5h-10.5" />
            </svg>
          </button>
        </div>

        {/* Wrapper for Name and About Me sections using Flexbox */}
        {/* Adjusted bottom padding/gap for mobile, reduced gap */}
        <div 
          className="absolute inset-x-0 bottom-0 p-4 md:p-0 flex flex-col items-start gap-4 md:gap-8" // Added padding for mobile, reduced gap
          style={{ transform: `translateY(${parallaxOffset}px)` }} // Apply dynamic transform
        >

          {/* About Me section - Align left on mobile, right on md+. Adjusted padding/SVG size */}
          {/* Removed pr-30, using standard padding/margins */}
          <div className="text-black text-sm bg-opacity-70 rounded-md self-end w-full md:w-auto pr-[0%] md:pr-[15%] px-4 md:px-0"> 
              <div className="flex items-center gap-2">
              {/* Animated Code SVG - Smaller on mobile */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 text-gray-700 flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: nameAnimationStarted ? 1 : 0, scale: nameAnimationStarted ? 1 : 0.8, x: nameAnimationStarted ? 0 : -20 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
                <line x1="12" y1="4" x2="12" y2="20" className="blinking-cursor"></line>
              </motion.svg>
              {/* Animated text lines */}
              <div className="flex flex-col">
                <motion.span 
                  className="text-base text-sm md:text-lg lg:text-xl block" 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: nameAnimationStarted ? 1 : 0, x: nameAnimationStarted ? 0 : -15 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                >
                  Infrastructure engineer at NVIDIA
                </motion.span>
                <motion.span 
                  className="text-base text-sm md:text-lg lg:text-xl block" 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: nameAnimationStarted ? 1 : 0, x: nameAnimationStarted ? 0 : -15 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                >
                  crafting scalable execution platforms
                </motion.span>
                <motion.span 
                  className="text-base text-sm md:text-lg lg:text-xl block" 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: nameAnimationStarted ? 1 : 0, x: nameAnimationStarted ? 0 : -15 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                >
                  transforming complex data into elegant solutions
                </motion.span>
              </div>
            </div>
          </div>

          {/* Name section with letter-by-letter animation */}
          <div className="text-white w-full px-4 md:px-0"> {/* Added padding for mobile */}
            <div className="font-light text-black opacity-90 flex flex-wrap">
              {/* First name with letter animation */}
              <div className="flex">
                {firstNameLetters.map((letter, index) => (
                  <motion.span
                    key={`first-${index}`}
                    className="text-[clamp(2.5rem,_8vmin,_6rem)] md:text-[clamp(5rem,_20vmin,_15rem)]"
                    variants={letterVariants}
                    initial="hidden"
                    animate={nameAnimationStarted ? "visible" : "hidden"}
                    custom={index}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              
              {/* Space */}
              <motion.span 
                className="text-[clamp(2.5rem,_8vmin,_6rem)] md:text-[clamp(5rem,_20vmin,_15rem)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: nameAnimationStarted ? 1 : 0 }}
                transition={{ delay: 0.3 }}
              >
                &nbsp;
              </motion.span>
              
              {/* Last name with letter animation */}
              <div className="flex">
                {lastNameLetters.map((letter, index) => (
                  <motion.span
                    key={`last-${index}`}
                    className="text-[clamp(2.5rem,_8vmin,_6rem)] md:text-[clamp(5rem,_20vmin,_15rem)] opacity-60"
                    variants={letterVariants}
                    initial="hidden"
                    animate={nameAnimationStarted ? "visible" : "hidden"}
                    custom={index + firstNameLetters.length + 1} // Offset for staggered effect
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </VideoBackground>
  );
};

export default HeroSection; 