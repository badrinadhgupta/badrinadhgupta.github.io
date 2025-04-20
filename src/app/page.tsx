"use client";

import Image from 'next/image'; // Import the Image component
import { TypeAnimation } from 'react-type-animation';
import { useRef, useState, useEffect } from 'react'; // Import hooks
import VideoBackground from '../components/VideoBackground'; // Import the new component
import AboutMeScrollSection from '../components/AboutMeScrollSection'; // Import the scroll section
import ContactMeSection from '../components/ContactMeSection'; // Import the ContactMe section
import SmoothScrollWrapper, { SmoothScrollWrapperRef } from '../components/SmoothScrollWrapper'; // Import ref type

const videoUrl = "https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-transcode.webm";

export default function Home() {
  const lenisRef = useRef<SmoothScrollWrapperRef>(null); // Ref for SmoothScrollWrapper
  const contactSectionRef = useRef<HTMLElement>(null); // Ref for ContactMeSection
  const [parallaxOffset, setParallaxOffset] = useState(0); // State for translateY
  const [isContactHighlighted, setIsContactHighlighted] = useState(false); // State for highlight

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

  return (
    <SmoothScrollWrapper ref={lenisRef}> {/* Pass the ref */}
      {/* Fragment to hold both sections */}
      <>
        {/* Initial Viewport Section with Video Background */}
        <VideoBackground videoSrc={videoUrl}>
          {/* Content container for the first screen */}
          {/* Changed min-h-screen to h-screen to fix height to one screen */}
          <main className="relative h-screen"> {/* Ensure this section takes full screen height */}
            {/* Text/Logo in top-left corner */}
            <div className="absolute top-0 left-0 m-6 bg-white/70 backdrop-blur-3xl text-black px-4 py-2 rounded-2xl text-lg shadow-md">
              {/* Use flexbox for inline layout */}
              <div className="flex items-center gap-1.5"> {/* Reduced gap slightly */}
                <span>ASIC engineer @</span>
                <Image 
                  src="/NVIDIA_logo.svg.png" // Assuming logo is in public directory
                  alt="Nvidia Logo"
                  width={60} // Adjust size as needed
                  height={16} // Adjust size as needed
                  className="inline-block align-middle" // Helps alignment
                />
              </div>
            </div>

            {/* Wrapper for Name and About Me sections using Flexbox */}
            {/* Added inline style for parallax effect */}
            <div 
              className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-10"
              style={{ transform: `translateY(${parallaxOffset}px)` }} // Apply dynamic transform
            >

              {/* About Me section - MOVED FIRST. Aligned to right with self-end. Removed mb-4. */}
              <div className="text-black text-sm bg-opacity-70 rounded-md self-end pr-30">
                <div className="flex items-center gap-2">
                  {/* Animated Code SVG */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-20 h-20 text-gray-700"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                    <line x1="12" y1="4" x2="12" y2="20" className="blinking-cursor"></line>
                  </svg>
                  <span className="text-xl">
                    Infrastructure engineer at NVIDIA<br></br>
                    crafting scalable execution platforms<br></br>
                    transforming complex data into elegant solutions
                  </span>
                </div>
              </div>

              {/* Name section - MOVED SECOND. Stays aligned left by default. */}
              <div className="text-white">
                <h1 className="text-6xl md:text-[15rem] font-light text-black opacity-90">
                  Badri <span className="opacity-60">Nerella</span>
                </h1>
              </div>
              
            </div>

            {/* Button in top-right corner - Added onClick handler */}
            <button
              onClick={handleContactClick} // Add click handler
              className="absolute top-0 right-0 m-6 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xl shadow-md hover:bg-gray-900 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer"
            >
              <span>Contact Me</span>
              {/* Upward-right arrow SVG icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5 19.5 4.5M19.5 4.5v10.5M19.5 4.5h-10.5" />
              </svg>
            </button>

          </main>
        </VideoBackground>

        {/* Section revealed on scroll */}
        <AboutMeScrollSection />

        {/* New Contact Me Section - Pass ref and highlight state */}
        <ContactMeSection ref={contactSectionRef} isHighlighted={isContactHighlighted} />
      </>
    </SmoothScrollWrapper>
  );
}
