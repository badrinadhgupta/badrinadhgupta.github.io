"use client";

import Image from 'next/image'; // Import the Image component
import { TypeAnimation } from 'react-type-animation';
import { useRef, useState, useEffect } from 'react'; // Import hooks
import VideoBackground from '../components/VideoBackground'; // Import the new component
import AboutMeScrollSection from '../components/AboutMeScrollSection'; // Import the scroll section
import ContactMeSection from '../components/ContactMeSection'; // Import the ContactMe section
import SmoothScrollWrapper, { SmoothScrollWrapperRef } from '../components/SmoothScrollWrapper'; // Import ref type
import IntroOverlay from '../components/IntroOverlay'; // Import the new IntroOverlay component
import { motion } from 'framer-motion';

const videoUrl = "https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-transcode.webm";

export default function Home() {
  const lenisRef = useRef<SmoothScrollWrapperRef>(null); // Ref for SmoothScrollWrapper
  const contactSectionRef = useRef<HTMLElement>(null); // Ref for ContactMeSection
  const [parallaxOffset, setParallaxOffset] = useState(0); // State for translateY
  const [isContactHighlighted, setIsContactHighlighted] = useState(false); // State for highlight
  const [introCompleted, setIntroCompleted] = useState(false); // State to track if intro is completed
  const [nameAnimationStarted, setNameAnimationStarted] = useState(false); // Track name animation

  useEffect(() => {
    const lenis = lenisRef.current?.lenis; // Get the lenis instance from the ref

    if (lenis) {
      // Define the scroll handler
      const handleScroll = (e: { scroll: number }) => {
        // Adjust speedFactor to control parallax intensity (0.1 = 10% of scroll speed)
        const speedFactor = 0.1;
        setParallaxOffset(-e.scroll * speedFactor);
      };

      // Subscribe to the scroll event
      lenis.on('scroll', handleScroll);

      // Cleanup function to unsubscribe
      return () => {
        lenis.off('scroll', handleScroll);
      };
    }
  }, []); // Dependency array includes lenisRef.current? which isn't ideal, run once

  // Function to handle scrolling to contact section and highlighting
  const handleContactClick = () => {
    if (lenisRef.current?.lenis && contactSectionRef.current) {
      lenisRef.current.lenis.scrollTo(contactSectionRef.current, {
        offset: -50, // Optional: Add an offset so it doesn't scroll exactly to the top edge
        duration: 1.5, // Optional: Control scroll duration (seconds)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Optional: Use an ease-out expo easing function
      });

      // Trigger highlight
      setIsContactHighlighted(true);

      // Remove highlight after a short duration (1000ms = 1 second)
      setTimeout(() => {
        setIsContactHighlighted(false);
      }, 1000);
    }
  };

  // Function to handle intro completion
  const handleIntroComplete = () => {
    setIntroCompleted(true);
    // Start name animation immediately when called
    setNameAnimationStarted(true);
  };

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

  // Split name into letters for animation
  const firstNameLetters = "Badri".split("");
  const lastNameLetters = "Nerella".split("");

  return (
    <>
      {/* Intro Overlay - Only show until completed */}
      <IntroOverlay onComplete={handleIntroComplete} />
      
      {/* Main Content */}
      <SmoothScrollWrapper ref={lenisRef}> {/* Pass the ref */}
        {/* Fragment to hold both sections */}
        <>
          {/* Initial Viewport Section with Video Background */}
          <VideoBackground videoSrc={videoUrl}>
            {/* Content container for the first screen */}
            {/* Changed min-h-screen to h-screen to fix height to one screen */}
            <main className="relative h-[100dvh]"> {/* Ensure this section uses dynamic viewport height */}
              
              {/* Wrapper for top-left/top-right elements - Always row, justify between */}
              <div className="p-4 flex flex-row justify-between items-start md:p-6 absolute inset-x-0 top-0 z-10"> 
                {/* Text/Logo in top-left corner - Use clamp for padding and text size */}
                <div className="bg-white/70 backdrop-blur-3xl text-black px-[clamp(0.75rem,_3vw,_1rem)] py-[clamp(0.375rem,_1.5vw,_0.5rem)] rounded-2xl text-[clamp(0.75rem,_2.5vw,_1rem)] md:text-lg shadow-md"> {/* Removed order class, added clamp sizing */}
                  {/* Use flexbox for inline layout - content should wrap naturally if needed */}
                  <div className="flex items-center flex-wrap gap-1 md:gap-1.5"> {/* Added flex-wrap */} 
                    <span>ASIC engineer @</span>
                    {/* Wrapper div to control image size based on height - Use clamp */}
                    <div className="relative inline-block align-middle h-[clamp(18px,_4vw,_24px)] md:h-[24px]"> {/* Use clamp for height, md override */}
                      <Image 
                        src="/NVIDIA_horizontal.png" // Assuming logo is in public directory
                        alt="Nvidia Logo"
                        width={0} // Required by Next/Image, but overridden
                        height={0} // Required by Next/Image, but overridden
                        style={{ height: '100%', width: 'auto' }} // Set height to 100% of parent, auto width
                        className="object-contain" // Ensure aspect ratio is maintained
                      />
                    </div>
                  </div>
                </div>

                {/* Button in top-right corner - Use clamp for padding and text size */}
                <button
                  onClick={handleContactClick} // Add click handler
                  className="flex items-center gap-1.5 md:gap-2 bg-black text-white px-[clamp(0.75rem,_3vw,_1rem)] py-[clamp(0.375rem,_1.5vw,_0.5rem)] rounded-full text-[clamp(0.8rem,_3vw,_1.1rem)] md:text-xl shadow-md md:hover:bg-gray-900 md:hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer" // Removed order class, added clamp sizing, md:hover
                >
                  <span>Contact Me</span>
                  {/* Upward-right arrow SVG icon - size adjusts with text */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"> {/* Keep icon size simple for now */}
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

          {/* Section revealed on scroll */}
          <AboutMeScrollSection />

          {/* New Contact Me Section - Pass ref and highlight state */}
          <ContactMeSection ref={contactSectionRef} isHighlighted={isContactHighlighted} />
        </>
      </SmoothScrollWrapper>
    </>
  );
}
