import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AboutMeScrollSection.css'; // Import the CSS file
import { Sora, Inter } from 'next/font/google';

// Initialize the Sora and Inter fonts
const headingFont = Sora({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
});

const bodyFont = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const AboutMeScrollSection: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    console.log("Clicked");
    setIsFlipped(!isFlipped);
  };

  const handleDoubleClick = () => {
    console.log("Double clicked");
  };

  return (
    <section 
      className="relative pt-8 pb-24 sm:pb-28 lg:pb-55 px-0 md:px-8 text-gray-800 overflow-hidden"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw))' }} // Slanted bottom edge (down-left)
    >
      {/* Metallic gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-slate-200 opacity-95"></div>
      {/* Silver grain overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: "url('/silver_texture1.avif')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
          opacity: 0.6,
        }}
      ></div>
      
      {/* Decorative line from right to center */}
      <div 
        className="absolute hidden md:block top-1/2 right-0 w-1/2 h-[2px] transform -translate-y-1/2 z-[2]"
        style={{
          backgroundImage: "url('/Video_ss.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to left, black 70%, transparent 100%)', // Fade out to the left
          WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 100%)' // For Safari/Webkit
        }}
      ></div>
      
      {/* Container for text and card */}
      <div className="relative z-10">
        <div>
          {/* Stack vertically on mobile, row on md+. Adjust spacing */}
          <div className="w-full flex flex-col md:flex-row md:items-stretch space-y-6 md:space-y-0 md:space-x-6">
            {/* Text content wrapper - Full width on mobile, 2/3 on md+ */}
            <div className="w-full md:w-2/3 flex flex-col items-start p-6 py-6 px-0 md:p-10 mt-20">
              <div className="overflow-hidden">
                <motion.h1 
                // className={`${headingFont.className} text-5xl md:text-7xl lg:text-9xl bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent px-4 md:px-0`}
                  className={`${headingFont.className} text-5xl md:text-7xl lg:text-9xl bg-clip-text text-transparent px-4 md:px-0`}
                  style={{ 
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('/Video_ss.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  initial={{ y: 700 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
                >
                  I'm Badri <br/>
                  <span className="ml-16 md:ml-24 lg:ml-32">Nerella.</span>
                </motion.h1>
              </div>
              
              <div className="mt-auto pt-10 pr-0 md:pr-30 px-4 md:px-0">
                <div className="overflow-hidden">
                  <motion.h2 
                    className={`${headingFont.className} text-lg md:text-xl lg:text-2xl text-gray-700`}
                    initial={{ y: 70 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
                  >
                    I'm an infrastructure Engineer crafting scalable platforms and elegant data solutions at NVIDIA
                  </motion.h2>
                </div>
                <div className="overflow-hidden mt-4">
                  <motion.p 
                    className={`${bodyFont.className} text-gray-700 text-md leading-relaxed pr-0 md:pr-10 lg:pr-35`}
                    initial={{ y: 200 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
                  >
                    <span className="animate-wave inline-block origin-[70%,70%] pr-1">👋</span>
                    Hey! Welcome to my personal space where I share my journey through tech, projects, and experiences. I'm fascinated by AI and its endless possibilities, and love experimenting with any new technology I can get my hands on. When I'm not writing code or traveling to new places, I'm crafting blog posts – which you'll soon find right here! This site is my creative outlet for sharing what I learn along the way.
                  </motion.p>
                </div>
              </div>
            </div>
            {/* Image wrapper - Full width on mobile, 1/3 on md+. Centered content */}
            <div className="flex items-center justify-center w-full md:w-1/3 perspective relative">
              {/* Flip container */}
              <div className="overflow-hidden">
                <motion.div 
                  initial={{ y: 900 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
                  className="w-full" // Added width for proper containing
                >
                  <div 
                    className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}
                    onClick={handleClick}
                    onDoubleClick={handleDoubleClick}
                  >
                    {/* Front Face */}
                    <div className="flip-card-front">
                      <img 
                        src="/Badri_chilling.JPG" 
                        alt="Badri kolkata chilling" 
                        className="rounded-t-full rounded-b-none object-cover w-full h-auto shadow-lg shadow-blue-500/30 max-h-[300px]"
                      />
                    </div>
                    {/* Back Face */}
                    <div className="flip-card-back">
                      <img 
                        src="/Badri_kolkata_chilling.JPG"
                        alt="Badri chilling" 
                        className="rounded-t-full rounded-b-none object-cover w-full h-auto shadow-lg shadow-blue-500/30 max-h-[300px]"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeScrollSection;