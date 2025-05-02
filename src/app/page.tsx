"use client";

import { useRef, useState, useEffect } from 'react';
import ContactMeSection from '../components/ContactMeSection';
import SmoothScrollWrapper, { SmoothScrollWrapperRef } from '../components/SmoothScrollWrapper';
import IntroOverlay from '../components/IntroOverlay';
import TabSwitcher from '../components/TabSwitcher';
import HeroSection from '../components/HeroSection';
import WorkSection from '../components/WorkSection';
import AboutMeScrollSection from '../components/AboutMeScrollSection';
import MyStorySection from '../components/MyStorySection';
import MyAdjectives from '../components/MyAdjectives';
import MyTechStack from '../components/MyTechStack';
import { motion, AnimatePresence } from 'framer-motion';

const videoUrl = "https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-transcode.webm";

export default function Home() {
  const lenisRef = useRef<SmoothScrollWrapperRef>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isContactHighlighted, setIsContactHighlighted] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [nameAnimationStarted, setNameAnimationStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<'work' | 'about'>('work');

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;

    if (lenis) {
      const handleScroll = (e: { scroll: number }) => {
        const speedFactor = 0.1;
        setParallaxOffset(-e.scroll * speedFactor);
      };

      lenis.on('scroll', handleScroll);

      return () => {
        lenis.off('scroll', handleScroll);
      };
    }
  }, []);

  // Function to handle scrolling to contact section and highlighting
  const handleContactClick = () => {
    if (lenisRef.current?.lenis && contactSectionRef.current) {
      lenisRef.current.lenis.scrollTo(contactSectionRef.current, {
        offset: -50,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      setIsContactHighlighted(true);

      setTimeout(() => {
        setIsContactHighlighted(false);
      }, 1000);
    }
  };

  // Function to handle intro completion
  const handleIntroComplete = () => {
    setIntroCompleted(true);
    setNameAnimationStarted(true);
  };

  // Function to handle tab change
  const handleTabChange = (tab: 'work' | 'about') => {
    setActiveTab(tab);
    
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      {/* Intro Overlay - Only show until completed */}
      <IntroOverlay onComplete={handleIntroComplete} />
      
      {/* Tab Switcher - Only show after intro is completed */}
      {introCompleted && <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />}
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'work' ? (
          <motion.div 
            key="work"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
          >
            <SmoothScrollWrapper ref={lenisRef}>
              {/* Use the HeroSection component */}
              <HeroSection 
                videoUrl={videoUrl}
                parallaxOffset={parallaxOffset}
                nameAnimationStarted={nameAnimationStarted}
                handleContactClick={handleContactClick}
              />
              
              {/* Work Section - Display selected projects */}
              <WorkSection />
            </SmoothScrollWrapper>
          </motion.div>
        ) : (
          <motion.div 
            key="about"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            className="min-h-screen"
          >
            <AboutMeScrollSection />
            <MyStorySection />
            <MyTechStack />
            <MyAdjectives />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Contact Me Section - Now outside AnimatePresence to be visible in all views */}
      <ContactMeSection 
        ref={contactSectionRef} 
        isHighlighted={isContactHighlighted} 
        onTabChange={handleTabChange}
      />
    </>
  );
}
