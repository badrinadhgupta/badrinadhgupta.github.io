import React from 'react';
import { motion } from 'framer-motion'; // Import motion
import { Sora, Inter } from 'next/font/google'; // Import fonts
import { IconType } from 'react-icons'; // Import IconType for proper typing
import { FaGraduationCap, FaCompass, FaLightbulb, FaFlask } from 'react-icons/fa'; // Import icons

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

// Animation variants for the top clip-path (copied from MyStorySection)
const sectionVariants = {
  hidden: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }, // Straight top edge
  visible: {
    clipPath: 'polygon(0 5vw, 100% 0, 100% 100%, 0% 100%)', // Slanted top edge
    transition: { duration: 0.7, ease: "easeInOut" }
  }
};

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

// AdjectiveCard interface
interface AdjectiveCardProps {
  heading: string;
  icon: React.ReactNode;
  description: string;
}

// AdjectiveCard component
const AdjectiveCard: React.FC<AdjectiveCardProps> = ({ heading, icon, description }) => {
  return (
    <motion.div 
      className="rounded-xl shadow-lg p-4 sm:p-5 border border-gray-100 h-[150px] sm:h-[160px] md:h-[180px] w-full flex flex-col relative overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background image with gradient opacity and blur effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/Video_ss.png'), linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          filter: 'blur(3px)',
          opacity: 0.4
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex items-start mb-2">
        <div className="relative overflow-hidden rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-3 sm:mr-4">
          {/* Icon background */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/Video_ss.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.9)'
            }}
          ></div>
          {/* Icon with responsive size */}
          <div className="text-lg sm:text-xl md:text-2xl text-white relative z-10">
            {icon}
          </div>
        </div>
        <h3 className={`${headingFont.className} text-lg sm:text-xl text-gray-800`}>
          {heading}
        </h3>
      </div>
      <p className={`${bodyFont.className} text-gray-600 text-sm sm:text-base mt-auto relative z-10`}>
        {description}
      </p>
    </motion.div>
  );
};

// Create a container for staggered animations
const StaggerContainer: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const MyAdjectives: React.FC = () => {
  return (
    // Apply styles from MyStorySection
    <motion.section 
      className="relative py-12 sm:py-16 px-0 md:px-8 text-gray-800 overflow-hidden pt-[6vw] sm:pt-[8vw]" // Base styles
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger animation
    >
      {/* Metallic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-slate-200 opacity-95"></div>
      
      {/* Decorative line from top right */}
      <div 
        className="absolute hidden md:block top-[12%] right-0 w-[50%] h-[2px] transform -rotate-6 origin-right z-[2]"
        style={{
          backgroundImage: "url('/Video_ss.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 100%)'
        }}
      ></div>
      
      {/* Decorative line from mid left */}
      <div 
        className="absolute hidden md:block top-[55%] left-0 w-[50%] h-[2px] transform rotate-6 -translate-y-1/2 origin-left z-[2]"
        style={{
          backgroundImage: "url('/Video_ss.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to right, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)'
        }}
      ></div>
      
      {/* Decorative diagonal line bottom left */}
      <div 
        className="absolute hidden md:block bottom-[18%] left-0 w-[50%] h-[2px] transform -rotate-12 origin-left z-[2]"
        style={{
          backgroundImage: "url('/Video_ss.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to right, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)'
        }}
      ></div>

      {/* Decorative line from bottom right */}
      {/* <div 
        className="absolute hidden md:block bottom-[10%] right-0 w-[40%] h-[3px] transform rotate-9 origin-right z-[2]"
        style={{
          backgroundImage: "url('/Video_ss.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 100%)'
        }}
      ></div> */}

      {/* Decorative line from upper right */}
      <div 
        className="absolute hidden md:block top-[25%] right-0 w-[45%] h-[2px] transform rotate-[-12deg] origin-right z-[2]"
        style={{
          backgroundImage: "url('/Video_ss.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 100%)'
        }}
      ></div>

      {/* Decorative line from mid-right */}
      <div 
        className="absolute hidden md:block top-[45%] right-0 w-[35%] h-[2px] transform rotate-[20deg] origin-right z-[2]"
        style={{
          backgroundImage: "url('/Video_ss.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)'
        }}
      ></div>

      

      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto pt-3 sm:pt-5">
        <div className="mb-10 sm:mb-12 md:mb-16 text-center">
          <h2 className={`${headingFont.className} text-3xl sm:text-4xl md:text-9xl bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent mb-3 sm:mb-4`}>
            I am.
          </h2>
        </div>
        
        {/* Adjective cards container - using relative positioning instead of grid */}
        <div className="relative w-full flex flex-col md:block">
          {/* Left column */}
          <div className="md:w-[49%] md:float-left mb-2 sm:mb-3 md:mb-0">
            <StaggerContainer>
              <AdjectiveCard 
                heading="Student"
                icon={<FaGraduationCap />}
                description="Always learning, always growing. I see every challenge as an opportunity to expand my knowledge and skills."
              />
              
              <div className="mt-2 sm:mt-3">
                <AdjectiveCard 
                  heading="Curiosity Driven"
                  icon={<FaFlask />}
                  description="My natural inquisitiveness drives me to ask 'why' and 'how,' pushing me to understand systems and solutions at a deeper level."
                />
              </div>
            </StaggerContainer>
          </div>
          
          {/* Right column */}
          <div className="md:w-[49%] md:float-right">
            <StaggerContainer>
              <div className="md:mt-20">
                <AdjectiveCard 
                  heading="Explorer"
                  icon={<FaCompass />}
                  description="I venture beyond comfort zones to discover new technologies, methodologies, and perspectives that enhance my work."
                />
              </div>
              
              <div className="mt-2 sm:mt-3">
                <AdjectiveCard 
                  heading="Innovative"
                  icon={<FaLightbulb />}
                  description="I combine creativity with technical expertise to develop unique solutions that stand out from the conventional approaches."
                />
              </div>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MyAdjectives; 