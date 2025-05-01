import React, { useState, useRef, useEffect } from 'react';
import { Sora, Inter } from 'next/font/google'; // Import fonts
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion from framer-motion

// Initialize fonts
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

// Define the props interface for TechStackCard
interface TechStackCardProps {
  name: string;
  logoPath: string;
  bgColor: string;
  preserveAspectRatio?: boolean;
}

// Define the TechStackCard component
const TechStackCard: React.FC<TechStackCardProps> = ({ name, logoPath, bgColor, preserveAspectRatio = false }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [jibberish, setJibberish] = useState("");
  
  // Generate random coordinates for small screens
  const generateRandomCoords = () => {
    return {
      x: Math.random(),
      y: Math.random()
    };
  };
  
  // Generate random characters based on mouse position
  const generateJibberish = (x: number, y: number) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,./<>?";
    const rows = 20;
    const cols = 40;
    
    // Use mouse position to influence character selection
    const seedX = Math.floor(x * chars.length);
    const seedY = Math.floor(y * chars.length);
    
    let result = "";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Add j directly to ensure first line characters vary
        const charIndex = (seedX + seedY + i + j + (i * j)) % chars.length;
        result += chars[Math.abs(charIndex)];
      }
      result += "\n";
    }
    
    return result;
  };
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isSmallScreen) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePos({ x, y });
    setJibberish(generateJibberish(x, y));
  };
  
  // Check screen size and set up small screen behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const smallScreen = window.matchMedia("(max-width: 768px)").matches;
      setIsSmallScreen(smallScreen);
      
      // For small screens, generate random coords and jibberish once
      if (smallScreen) {
        const randomCoords = generateRandomCoords();
        setMousePos(randomCoords);
        setJibberish(generateJibberish(randomCoords.x, randomCoords.y));
      } else {
        // For large screens, initialize with center position
        setJibberish(generateJibberish(0.5, 0.5));
      }
    };
    
    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener("resize", checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  
  // Calculate radial gradient background
  const getRadialGradient = () => {
    // For small screens or when hovering
    if (isSmallScreen || isHovering) {
      // Convert normalized coordinates (0-1) to percentage
      const xPercent = mousePos.x * 100;
      const yPercent = mousePos.y * 100;
      
      // Create multiple color stops with varying darkness levels
      const color05 = getDarkerColor(bgColor, 0.05); // Slightly darker center
      const color15 = getDarkerColor(bgColor, 0.15);
      const color25 = getDarkerColor(bgColor, 0.25);
      const color35 = getDarkerColor(bgColor, 0.35);
      const color45 = getDarkerColor(bgColor, 0.45);
      const darkColor = getDarkerColor(bgColor, 0.55); // 55% darker
      
      // Create a gradient with many more color stops for ultra-smooth transition
      return `radial-gradient(
        circle at ${xPercent}% ${yPercent}%, 
        ${color05} 0%, 
        ${color15} 25%, 
        ${color25} 45%, 
        ${color35} 65%, 
        ${color45} 85%, 
        ${darkColor} 100%
      )`;
    }
    
    return 'transparent';
  };
  
  // Helper to create darker color
  const getDarkerColor = (hexColor: string, factor: number) => {
    // Remove # if present
    hexColor = hexColor.replace('#', '');
    
    // Parse the color
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    
    // Make it darker
    const darkerR = Math.floor(r * (1 - factor));
    const darkerG = Math.floor(g * (1 - factor));
    const darkerB = Math.floor(b * (1 - factor));
    
    // Convert back to hex
    return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
  };
  
  return (
    <div 
      ref={cardRef}
      className="p-4 h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px] flex flex-col items-center justify-center transition-colors duration-300 ease-in-out border border-gray-200 relative overflow-hidden"
      style={{ 
        background: getRadialGradient(),
        transition: isHovering ? 'none' : 'background 0.3s ease-out',
      }}
      onMouseEnter={() => !isSmallScreen && setIsHovering(true)}
      onMouseLeave={() => !isSmallScreen && setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Jibberish text background */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden whitespace-pre text-[14px] select-none"
        style={{ 
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
          color: (isHovering || isSmallScreen) ? 'white' : 'black',
          transition: 'color 0.3s, opacity 0.3s',
          opacity: (isHovering || isSmallScreen) ? 0.2 : 0,
        }}
      >
        {jibberish}
      </div>
      
      {/* Logo */}
      <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative mb-2 ${preserveAspectRatio ? 'flex items-center justify-center' : ''}`}>
        {preserveAspectRatio ? (
          // Use img tag for SVGs that need to preserve aspect ratio
          <img 
            src={logoPath} 
            alt={`${name} logo`}
            className="max-w-full max-h-full w-auto h-auto"
          />
        ) : (
          // Use Next.js Image for other logos
          <Image 
            src={logoPath} 
            alt={`${name} logo`} 
            fill 
            className="object-contain"
          />
        )}
      </div>
      
      {/* Name text - shown by default on small screens or on hover for larger screens */}
      <p 
        className={`${bodyFont.className} text-center font-medium relative z-10 text-gray-800 transition-all duration-300 ${
          (isHovering || isSmallScreen) ? 'text-white opacity-100 mt-2' : 'opacity-0 mt-0'
        }`}
      >
        {name}
      </p>
    </div>
  );
};

const MyTechStack: React.FC = () => {
  // Define the tech stack data with logo paths
  const techStack = [
    { 
      name: 'Python', 
      logoPath: '/logos/python-logo.svg', 
      color: '#3776AB'
    },
    { 
      name: 'Perl', 
      logoPath: '/logos/perl-svgrepo-com.svg', 
      color: '#0073A1',
      preserveAspectRatio: true
    },
    { 
      name: 'React', 
      logoPath: '/logos/react-svgrepo-com.svg', 
      color: '#61DAFB',
      preserveAspectRatio: true
    },
    { 
      name: 'NextJS', 
      logoPath: '/logos/nextjs-icon-svgrepo-com.svg', 
      color: '#000000',
      preserveAspectRatio: true
    },
    { 
      name: 'ExtJS', 
      logoPath: '/logos/extjs-logo.svg', 
      color: '#99c356',
      preserveAspectRatio: true
    },
    { 
      name: 'ElasticSearch', 
      logoPath: '/logos/elasticsearch-svgrepo-com.svg', 
      color: '#005571',
      preserveAspectRatio: true
    },
    { 
      name: 'SQL', 
      logoPath: '/logos/sql-logo.svg', 
      color: '#4479A1'
    },
    { 
      name: 'AI', 
      logoPath: '/logos/ai-platform-svgrepo-com.svg', 
      color: '#00A67E',
      preserveAspectRatio: true
    }
  ];

  return (
    // Apply styles from AboutMeScrollSection with modified clip-path for blending
    <section 
      className="relative pt-16 pb-24 sm:pb-28 lg:pb-55 px-4 sm:px-6 md:px-8 text-gray-800 overflow-hidden mt-[-5vw]" // Added negative margin to overlap with previous section
      style={{ clipPath: 'polygon(0 5vw, 100% 0, 100% 100%, 0 calc(100% - 5vw))' }} // Modified clip-path with slanted top and bottom
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
      
      {/* Container for content - added more top padding to accommodate the slant */}
      <div className="relative z-10 max-w-6xl mx-auto pt-16">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 
            className={`${headingFont.className} text-4xl md:text-5xl bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent mb-4`}
          >
            Current Stack
          </motion.h2>
          <motion.p 
            className={`${bodyFont.className} text-xl text-gray-600 mt-8`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Tools I'm currently using
          </motion.p>
        </motion.div>
        
        {/* Tech stack grid */}
        <div className="max-w-full mx-auto"> {/* Container with border */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full"> {/* Fixed grid with explicit gap-0 */}
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut", 
                  delay: 0.1 + (index * 0.1) // Staggered delay based on index
                }}
              >
                <TechStackCard 
                  name={tech.name}
                  logoPath={tech.logoPath}
                  bgColor={tech.color}
                  preserveAspectRatio={tech.preserveAspectRatio}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyTechStack; 