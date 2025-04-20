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
            
            {/* Wrapper for top-left/top-right elements - Stacks on mobile, row on md+ */}
            <div className="p-4 flex flex-col gap-2 md:flex-row md:justify-between md:items-start md:p-6 absolute inset-x-0 top-0 z-10"> 
              {/* Text/Logo in top-left corner - Removed absolute, margin. Handled by parent flex */}
              <div className="bg-white/70 backdrop-blur-3xl text-black px-3 py-1.5 md:px-4 md:py-2 rounded-2xl text-base md:text-lg shadow-md order-1 md:order-none"> {/* Added order-1 for mobile stacking preference */} 
                {/* Use flexbox for inline layout - content should wrap naturally if needed */}
                <div className="flex items-center flex-wrap gap-1 md:gap-1.5"> {/* Added flex-wrap */} 
                  <span>ASIC engineer @</span>
                  {/* Wrapper div to control image size based on height */}
                  <div className="relative inline-block align-middle h-[45px] md:h-[30px]"> {/* Removed w-auto */}
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

              {/* Button in top-right corner - Removed absolute, margin. Handled by parent flex */}
              <button
                onClick={handleContactClick} // Add click handler
                className="flex items-center gap-1.5 md:gap-2 bg-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-base md:text-xl shadow-md hover:bg-gray-900 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer order-2 md:order-none" // Added order-2
              >
                <span>Contact Me</span>
                {/* Upward-right arrow SVG icon - size adjusts with text */}
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
              <div className="text-black text-sm bg-opacity-70 rounded-md self-start md:self-end w-full md:w-auto px-4 md:px-0 md:pr-6 lg:pr-10"> 
                  <div className="flex items-center gap-2">
                  {/* Animated Code SVG - Smaller on mobile */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 text-gray-700 flex-shrink-0" // Added flex-shrink-0
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                    <line x1="12" y1="4" x2="12" y2="20" className="blinking-cursor"></line>
                  </svg>
                  {/* Adjusted text size for mobile */}
                  <span className="text-base md:text-lg lg:text-xl"> 
                    Infrastructure engineer at NVIDIA<br></br>
                    crafting scalable execution platforms<br></br>
                    transforming complex data into elegant solutions
                  </span>
                </div>
              </div>

              {/* Name section - Adjusted font size using clamp and vmin for better viewport responsiveness */}
              <div className="text-white w-full px-4 md:px-0"> {/* Added padding for mobile */}
                {/* Clamped font size based on viewport minimum dimension (vmin) */}
                <h1 className="font-light text-black opacity-90 break-words text-[clamp(2.5rem,_8vmin,_6rem)] md:text-[clamp(5rem,_20vmin,_15rem)]">
                  Badri <span className="opacity-60">Nerella</span>
                </h1>
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
  );
}
