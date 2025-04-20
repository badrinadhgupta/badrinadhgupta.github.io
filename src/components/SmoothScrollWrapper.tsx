"use client";

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Lenis from 'lenis';

interface SmoothScrollWrapperProps {
  children: React.ReactNode;
}

// Define the type for the exposed ref methods (if any, otherwise null)
export interface SmoothScrollWrapperRef { 
  lenis: Lenis | null;
}

// Use forwardRef to accept a ref from the parent
const SmoothScrollWrapper = forwardRef<SmoothScrollWrapperRef, SmoothScrollWrapperProps>(({ children }, ref) => {
  const lenisRef = useRef<Lenis | null>(null);

  // Expose the lenis instance via the forwarded ref
  useImperativeHandle(ref, () => ({
    get lenis() {
      return lenisRef.current;
    }
  }), []);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      // Options can be added here, e.g., lerp for smoothness factor
      // lerp: 0.1, 
      // duration: 1.2,
      // smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Animation frame function
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation loop
    const rafId = requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy(); // Destroy the Lenis instance
      cancelAnimationFrame(rafId); // Cancel the animation frame request
      lenisRef.current = null;
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return <>{children}</>; // Render children directly
});

SmoothScrollWrapper.displayName = 'SmoothScrollWrapper'; // Add display name for DevTools

export default SmoothScrollWrapper; 