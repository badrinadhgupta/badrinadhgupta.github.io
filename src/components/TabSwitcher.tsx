import React from 'react';
import { motion } from 'framer-motion';

interface TabSwitcherProps {
  activeTab: 'work' | 'about';
  onTabChange: (tab: 'work' | 'about') => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex justify-center">
      <div className="bg-white/20 backdrop-blur-9xl rounded-full p-1 shadow-lg flex">
        <TabButton 
          isActive={activeTab === 'work'} 
          onClick={() => onTabChange('work')}
          label="Work"
        />
        <TabButton 
          isActive={activeTab === 'about'} 
          onClick={() => onTabChange('about')}
          label="About"
        />
      </div>
    </div>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        isActive ? 'text-white' : 'text-gray-700 hover:text-black'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-black rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default TabSwitcher; 