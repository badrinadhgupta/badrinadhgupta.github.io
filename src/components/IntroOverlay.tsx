import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroOverlayProps {
  onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [nameVisible, setNameVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    // Staggered animation sequence
    const nameTimer = setTimeout(() => {
      setNameVisible(true);
    }, 300);

    const subtitleTimer = setTimeout(() => {
      setSubtitleVisible(true);
    }, 1000);
    
    // Set a timeout to hide the overlay after 2 seconds
    const exitTimer = setTimeout(() => {
      // Call onComplete immediately when starting to hide
      // This triggers the name animation at the same time
      onComplete();
      setVisible(false);
    }, 2000);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  // Animation variants for letter-by-letter animation
  const nameLetters = "Badri Nerella".split("");
  const subtitleLetters = "Portfolio '25".split("");

  // Letter animation variants
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { 
        delay: i * 0.03, // 0.05s delay between each letter
        duration: 0.2 
      }
    })
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-[#121212] z-50 flex items-end"
          initial={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }} // Faster exit animation
        >
          <div className="p-6 md:p-10 pb-10 md:pb-14">
            <div className="flex">
              {nameLetters.map((letter, index) => (
                <motion.span
                  key={`name-${index}`}
                  className="text-white text-2xl md:text-3xl font-light"
                  variants={letterVariants}
                  initial="hidden"
                  animate={nameVisible ? "visible" : "hidden"}
                  custom={index} // Pass the index for staggered animation
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
            
            <div className="flex mt-1">
              {subtitleLetters.map((letter, index) => (
                <motion.span
                  key={`subtitle-${index}`}
                  className="text-white text-xs md:text-sm"
                  variants={letterVariants}
                  initial="hidden"
                  animate={subtitleVisible ? "visible" : "hidden"}
                  custom={index} // Pass the index for staggered animation
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay; 