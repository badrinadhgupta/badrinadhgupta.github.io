import React, { forwardRef, useEffect, useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import Image from 'next/image';

// Define props type including the optional isHighlighted
interface ContactMeSectionProps {
  isHighlighted?: boolean;
  onTabChange?: (tab: 'work' | 'about') => void;
}

// Wrap component with forwardRef
const ContactMeSection = forwardRef<HTMLElement, ContactMeSectionProps>(({ isHighlighted, onTabChange }, ref) => {
  // --- IMPORTANT: Replace these placeholder URLs with your actual links ---
  const linkedInUrl = "https://www.linkedin.com/in/badri-nerella/"; // Replace with your LinkedIn URL
  const githubUrl = "https://github.com/badrinadhgupta"; // Replace with your GitHub URL
  const twitterUrl = "https://twitter.com/yourusername"; // Replace with your Twitter URL
  const emailAddress = "nerella.rabasa@gmail.com"; // Replace with your email address
  // --- End of placeholders ---

  // State for client-side time rendering
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  // State to track which tab is active
  const [activeTab, setActiveTab] = useState<'work' | 'about'>('work');
  
  // State to control the blogs coming soon notification
  const [showBlogsNotification, setShowBlogsNotification] = useState(false);

  // Effect to set the time only on the client
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);

  // Check which tab is active on mount and when tabs change
  useEffect(() => {
    const checkActiveTab = () => {
      // Multiple selectors to improve detection reliability
      const aboutSelectors = [
        '.bg-\\[\\#FED8B1\\]',
        '.bg-gradient-to-b.from-\\[\\#FED8B1\\]',
        '.bg-\\[\\#A67B5B\\]'
      ];
      
      // Check if any about section elements are visible
      const isAboutVisible = aboutSelectors.some(selector => {
        const el = document.querySelector(selector);
        return el && window.getComputedStyle(el).display !== 'none';
      });
      
      setActiveTab(isAboutVisible ? 'about' : 'work');
    };

    // Initial check
    checkActiveTab();

    // Check on tab changes via observer
    const observer = new MutationObserver(() => {
      // Use requestAnimationFrame to ensure DOM is fully updated
      requestAnimationFrame(checkActiveTab);
    });
    
    // Observe document body for changes to catch tab switches
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Also check on window resize (in case of responsive layout changes)
    window.addEventListener('resize', checkActiveTab);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkActiveTab);
    };
  }, []);

  // Function to handle resume download
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/Badri.pdf';
    link.download = 'Badri_Nerella_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const contactLinks = [
    { name: 'GitHub', url: githubUrl, icon: FaGithub },
    { name: 'LinkedIn', url: linkedInUrl, icon: FaLinkedin },
    // { name: 'Twitter', url: twitterUrl, icon: FaXTwitter },
    { name: 'Email', url: `mailto:${emailAddress}`, icon: FaEnvelope },
  ];

  // Handle navigation clicks
  const handleNavClick = (tab: 'work' | 'about' | 'blogs') => (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (tab === 'work' || tab === 'about') {
      // Change the tab
      onTabChange?.(tab);
      
      // Scroll to top with smooth animation
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else if (tab === 'blogs') {
      // Show the coming soon notification
      setShowBlogsNotification(true);
      
      // Hide it after 3 seconds
      setTimeout(() => {
        setShowBlogsNotification(false);
      }, 3000);
      
      // Handle blogs navigation - could be a future feature
      console.log('Blogs navigation clicked');
    }
  };

  return (
    // Forward the ref to the section element
    <section
      ref={ref}
      className={`relative py-8 md:py-12 px-4 md:px-8 transition-colors duration-500 min-h-[200px] md:min-h-[250px] ${isHighlighted ? 'bg-red-100' : ''}`}
    >
      {/* Background image with subtle gradient overlays */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Prismatic light effect at the top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 opacity-70 z-10"></div>
        
        <Image
          src="/Video_ss.png"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
          className="opacity-80"
        />
        
        {/* Sleek dark gradient overlay - mimics the image design */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/50 to-gray-800/40"></div>
        
        {/* Subtle color noise texture for depth */}
        <div 
          className="absolute inset-0 mix-blend-soft-light opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px'
          }}
        ></div>
        
        {/* Diagonal light streaks similar to the image */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            background: 'linear-gradient(135deg, transparent 65%, rgba(255,255,255,0.4) 70%, transparent 75%), linear-gradient(225deg, transparent 75%, rgba(255,255,255,0.4) 80%, transparent 85%)',
            backgroundSize: '300% 300%',
            animation: 'gradientAnimation 15s ease infinite'
          }}
        ></div>
        
        <style jsx>{`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-5px); }
          }
          
          .notification-appear {
            animation: fadeIn 0.3s ease forwards;
          }
          
          .notification-disappear {
            animation: fadeOut 0.3s ease forwards;
          }
        `}</style>
      </div>
      
      {/* Content with relative positioning to appear above the background */}
      <div className="container mx-auto relative z-20 h-full flex flex-col md:flex-row md:justify-between">
        {/* Left section */}
        <div className="text-left text-white md:max-w-md mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">Curious?</h2>
          <p className="text-sm md:text-base opacity-80 mb-4 md:mb-5">
            I'm always open to new opportunities, collaborations, and projects. Whether you have a project in mind or just want to say hello, feel free to reach out via email or connect with me on any of my socials.
          </p>
          
          <div className="flex items-center space-x-4 md:space-x-5">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Contact me via ${link.name}`}
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                <link.icon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            ))}
            
            {/* Resume download button */}
            <button
              onClick={handleResumeDownload}
              aria-label="Download Resume"
              className="inline-flex items-center px-3 py-1.5 text-xs md:text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-md border border-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              <FaDownload className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
              Resume
            </button>
          </div>
        </div>
        
        {/* Right section */}
        <div className="hidden lg:block text-white text-right self-end md:self-center">
          <div className="mb-4 md:mb-8">
            <h3 className="text-base md:text-lg mb-1">[ NAVIGATION ]</h3>
            <ul className="flex flex-col items-end space-y-1">
              <li>
                <button 
                  onClick={handleNavClick('work')} 
                  className="hover:underline text-right text-sm md:text-base"
                >
                  Work
                </button>
              </li>
              <li>
                <button 
                  onClick={handleNavClick('about')} 
                  className="hover:underline text-right text-sm md:text-base"
                >
                  About
                </button>
              </li>
              <li className="relative flex items-center justify-end">
                <button 
                  onClick={handleNavClick('blogs')} 
                  className="hover:underline text-right text-sm md:text-base"
                >
                  Blogs
                </button>
                
                {/* Coming soon notification */}
                {showBlogsNotification && (
                  <div className="absolute right-full mr-2 whitespace-nowrap text-blue text-xs px-2 py-1 rounded-md notification-appear">
                    Coming soon!
                  </div>
                )}
              </li>
            </ul>
          </div>
          
          <div className="mt-4 md:mt-6">
            {/* Render time only when currentTime state is set (client-side) */}
            {currentTime && (
              <p className="text-right text-xs opacity-70 mb-2">Local time - {currentTime}</p>
            )}

            <div className="border inline-flex rounded-lg overflow-hidden text-xs md:text-sm">
              <div className="flex items-center p-1 bg-transparent">
                <div className="rounded-full bg-white/20 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mr-1">
                  <span className="text-sm md:text-base">🌐</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="px-2 md:px-3 py-1 border-l border-white/20 bg-[#0C0034]/50">Working Globally</div>
                <div className="px-2 md:px-3 py-1 border-l border-t border-white/20 bg-[#0C0034]/50">Available For Work</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-white opacity-70 relative z-20">
        <p className="text-sm md:text-base font-bold">© 2025</p>
        <p className="text-xl md:text-3xl font-bold tracking-wider">BADRI NERELLA</p>
      </div>
    </section>
  );
});

// Add display name for DevTools
ContactMeSection.displayName = 'ContactMeSection';

export default ContactMeSection; 