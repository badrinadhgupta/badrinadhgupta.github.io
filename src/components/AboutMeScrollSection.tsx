import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AboutMeScrollSection.css'; // Import the CSS file

const AboutMeScrollSection: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDoubleClick = () => {
    console.log("Double clicked");
  };

  return (
    <section className="min-h-screen bg-gray-100 pt-8 pl-20 pr-20 text-gray-800">
      {/* Container for text and card */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Start invisible and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Fade in and move up to original position
          viewport={{ amount: 0.3 }} // Trigger animation every time 30% is visible
          transition={{ duration: 0.8, ease: "easeOut" }} // Animation duration and easing
        >
          

        {/* New Card Component */}
        <h3 className="text-3xl text-black font-bold mb-4">About me</h3>
        <div className="mt-1 bg-white p-6 rounded-lg shadow-md w-full flex items-center space-x-6">
          {/* Text content wrapper (takes 2/3 width) */}
          <div className="w-2/3">
            <p>
              As a software engineer focused on infrastructure, I thrive on building and refining the backbone systems that power large-scale operations.<br></br>
              My expertise lies in crafting robust, scalable execution platforms designed to handle extensive computational job farms efficiently.<br></br>
              I develop sophisticated analysis tools and user-friendly management applications, transforming raw, complex system data into actionable insights and elegant operational solutions.<br></br>
              Furthermore, I enjoy spearheading initiatives that bridge gaps between teams; by creating intuitive data visualization dashboards and unified management applications, I help streamline diverse processes, enhance infrastructure oversight, and boost overall efficiency.
            </p>
          </div>
          {/* Image wrapper (takes 1/3 width) with perspective */}
          <div className="flex items-center justify-center w-1/3 perspective">
            {/* Flip container */}
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
                  className="rounded-lg object-cover w-[100%] h-auto shadow-md"
                />
              </div>
              {/* Back Face */}
              <div className="flip-card-back">
                <img 
                  src="/Badri_kolkata_chilling.JPG"
                  alt="Badri chilling" 
                  className="rounded-lg object-cover w-[100%] h-auto shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMeScrollSection; 