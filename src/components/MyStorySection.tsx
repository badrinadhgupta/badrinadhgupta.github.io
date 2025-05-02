import React from 'react';
import { motion } from 'framer-motion';
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

// Animation variants for the top clip-path
const sectionVariants = {
  hidden: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }, // Straight top edge
  visible: {
    clipPath: 'polygon(0 5vw, 100% 0, 100% 100%, 0% 100%)', // Slanted top edge (high right, dips left)
    transition: { duration: 0.7, ease: "easeInOut" }
  }
};

const MyStorySection: React.FC = () => {
  return (
    <motion.section 
      className="relative py-16 px-0 md:px-8 text-gray-800 overflow-hidden pt-[8vw] pb-[10vw]" // Added bottom padding to accommodate blend
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
      style={{ clipPath: 'polygon(0 5vw, 100% 0, 100% 95%, 0% 100%)' }} // Added slant to bottom edge for blend
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
          maskImage: 'linear-gradient(to left, black 70%, transparent 100%)', // Fade out to the left
          WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 100%)' // For Safari/Webkit
        }}
      ></div>
      
      {/* Decorative line from mid left */}
      <div 
        className="absolute hidden md:block top-[55%] left-0 w-[50%] h-[2px] transform rotate-6 -translate-y-1/2 origin-left z-[2]"
        style={{
          backgroundImage: "url('/Video_ss.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to right, black 70%, transparent 100%)', // Fade out to the right
          WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)' // For Safari/Webkit
        }}
      ></div>
      
      {/* Decorative diagonal line bottom left */}
      <div 
        className="absolute hidden md:block bottom-[18%] left-0 w-[50%] h-[2px] transform -rotate-12 origin-left z-[2]"
        style={{
          backgroundImage: "url('/Video_ss.png')",
          backgroundSize: 'cover', // Optional, but good practice
          backgroundPosition: 'center', // Optional, but good practice
          maskImage: 'linear-gradient(to right, black 70%, transparent 100%)', // Fade out to the right
          WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)' // For Safari/Webkit
        }}
      ></div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.1, once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Section heading
          <div className="mb-12 text-center">
            <h2 className={`${headingFont.className} text-4xl md:text-5xl bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent mb-4`}>
              My Story
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
          </div> */}
          
          {/* Simple big paragraph version */}
          <div className="px-6 md:px-12 lg:px-24">
            <div className="">
              {/* Paragraph 1 */}
              <motion.p 
                className={`${bodyFont.className} text-gray-700 text-lg leading-relaxed`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                My Story started way back in 6th grade when a friend and I decided to build a website for our apartment complex. We found wix.com, and after some trial and error, we made it - but we actually had no idea how it worked. This curiosity led me to take up computer science in highschool. My official journey with coding started with Java, and once it clicked, I was hooked. I loved the logic and seeing the results of my work.
              </motion.p>
              
              {/* Paragraph 2 */}
              <motion.p 
                className={`${bodyFont.className} text-gray-700 text-lg leading-relaxed mt-6`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }} // Increased delay
              >
                Since then, I explored many languages and frameworks, and I loved every bit of it. In 11th and 12th, our school didn't care much about computer science, and it was just focused on physics and math. But this didn't fade my excitement and I picked it all right back up in college. I explored many languages, frameworks, and platforms; and I still love to explore and learn new things.
              </motion.p>
              
              {/* Paragraph 3 */}
              <motion.p 
                className={`${bodyFont.className} text-gray-700 text-lg leading-relaxed mt-6`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }} // Increased delay
              >
                I actually ended up taking electronics and communication Engineering in college, but during Covid-19, I was just focused on learning every little thing about computers. This put me in a weird position where I was stuck between hardware and software worlds. Placement season rolled in, and I was just going with the flow. And then, NVIDIA came in, and I went the hardware route. But at work, I found exactly the middle ground - working around hardware colleagues but building flows, automations and unique projects.
              </motion.p>
              
              {/* Paragraph 4 */}
              <motion.p 
                className={`${bodyFont.className} text-gray-700 text-lg leading-relaxed mt-6`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }} // Increased delay
              >
                And now, AI came in, and the power of software and an engineer's role has just changed. I'm now learning about AI and its applications. In fact, majority of this portfolio was made with the help of AI. This is my attempt to see with my basic knowledge of web dev, what kind of a website I can build.
              </motion.p>
              
              {/* Paragraph 5 (Italic) */}
              <motion.p 
                className={`${bodyFont.className} text-gray-700 text-lg leading-relaxed mt-6 font-medium italic`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }} // Increased delay
              >
                Embrace AI, resistance is futile.
              </motion.p>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="mt-16 text-center">
            <p className={`${bodyFont.className} text-gray-700 italic mb-6`}>This journey continues as I explore new technologies and challenges...</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MyStorySection; 