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
    <section className="min-h-screen bg-gray-100 pt-8 px-4 md:pl-20 md:pr-20 text-gray-800">
      {/* Container for text and card */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Start invisible and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Fade in and move up to original position
          viewport={{ amount: 0.3 }} // Trigger animation every time 30% is visible
          transition={{ duration: 0.8, ease: "easeOut" }} // Animation duration and easing
        >
          

        {/* New Card Component - Adjusted layout for mobile */}
        <h3 className="text-2xl md:text-3xl text-black font-bold mb-4">About me</h3>
        {/* Stack vertically on mobile, row on md+. Adjust spacing */}
        <div className="mt-1 bg-white p-4 md:p-6 rounded-lg shadow-md w-full flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6">
          {/* Text content wrapper - Full width on mobile, 2/3 on md+ */}
          <div className="w-full md:w-2/3">
            <p className="text-lg md:text-xl mb-4">
              Working as an Infrastructure Software Engineer at NVIDIA, I specialize in building and optimizing the backbone systems essential for our chip design teams. A core part of my role is maintaining and advancing our large-scale execution platform, responsible for managing vast numbers of compute jobs.
            </p>
            <p className="text-lg md:text-xl mb-4">
              I develop specialized analysis tools and management applications designed to turn intricate system data into clear, actionable insights, enhancing overall workflow efficiency.
            </p>
            <p className="text-lg md:text-xl">
              I also focus on creating unifying applications and dashboards that consolidate disparate processes, enabling better collaboration and data visibility across teams.
            </p>
          </div>
          {/* Image wrapper - Full width on mobile, 1/3 on md+. Centered content */}
          <div className="flex items-center justify-center w-full md:w-1/3 perspective">
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