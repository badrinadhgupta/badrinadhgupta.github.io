import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import workData, { WorkItem } from '../data/workData';
import { InfiniteMovingCards } from './InfiniteMovingCards';

const WorkSection: React.FC = () => {
  // Calculate how many cards to display based on screen size
  const [cardsToShow, setCardsToShow] = useState(4);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else if (window.innerWidth < 1280) {
        setCardsToShow(3);
      } else {
        setCardsToShow(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
            <div>
              <div className="mb-3">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 inline-block">
                  Projects
                  <div className="h-1 bg-blue-600 w-1/3 mt-2"></div>
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl text-lg">
                Some of the projects I've worked on
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 overflow-hidden">
          {/* Using InfiniteMovingCards instead of manual scroll */}
          <InfiniteMovingCards 
            items={workData}
            speed="slow"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
};

interface WorkCardProps {
  project: WorkItem;
}

export const WorkCard: React.FC<WorkCardProps> = ({ project }) => {
  return (
    <motion.div
      className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-[600px] pb-5 relative work-card"
      whileHover={{ 
        y: -5,
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        zIndex: 50
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      {project.imageSrc && (
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          <Image 
            src={project.imageSrc} 
            alt={project.imageAlt || project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {project.featured && (
            <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md">
              Featured
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col p-6 flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors duration-300">
            {project.title}
          </h3>
          {project.company && (
            <div className="flex items-center mt-2">
              <span className="block text-sm text-gray-500 font-medium">
                {project.company}
              </span>
              {project.date && (
                <>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-400">
                    {project.date}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
        
        {project.role && (
          <p className="text-sm text-gray-500 mb-4 flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="italic font-medium">{project.role}</span>
          </p>
        )}
        
        <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
          {project.description}
        </p>

        <div className="mb-6 space-y-4 mt-auto">
          {project.specialTags && project.specialTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.specialTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-yellow-50 text-yellow-700 font-medium text-xs px-3 py-1.5 rounded-full border border-yellow-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs text-gray-500">+{project.technologies.length - 3} more</span>
            )}
          </div>
        </div>
        
        <div className="flex gap-4 pt-4 border-t border-gray-100">
          {project.projectUrl && (
            <a 
              href={project.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center transition-all duration-300 hover:translate-x-1"
            >
              View Project
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          
          {project.codeUrl && (
            <a 
              href={project.codeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center transition-all duration-300 hover:translate-x-1"
            >
              View Code
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkSection; 