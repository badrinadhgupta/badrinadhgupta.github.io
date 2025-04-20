import React, { forwardRef } from 'react';
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa';

// Define props type including the optional isHighlighted
interface ContactMeSectionProps {
  isHighlighted?: boolean;
}

// Wrap component with forwardRef
const ContactMeSection = forwardRef<HTMLElement, ContactMeSectionProps>(({ isHighlighted }, ref) => {
  // --- IMPORTANT: Replace these placeholder URLs with your actual links ---
  const linkedInUrl = "https://www.linkedin.com/in/badri-nerella-6166a81b7/"; // Replace with your LinkedIn URL
  const githubUrl = "https://github.com/badrinadhgupta"; // Replace with your GitHub URL
  const instagramUrl = "https://www.instagram.com/baddriiiii/?igsh=eXA4MWR2N3Bpdzhk&utm_source=qr#"; // Replace with your Instagram URL
  const emailAddress = "nerella.rabasa@example.com"; // Replace with your email address
  // --- End of placeholders ---

  const contactLinks = [
    { name: 'LinkedIn', url: linkedInUrl, icon: FaLinkedin },
    { name: 'GitHub', url: githubUrl, icon: FaGithub },
    { name: 'Instagram', url: instagramUrl, icon: FaInstagram },
    { name: 'Email', url: `mailto:${emailAddress}`, icon: FaEnvelope },
  ];

  return (
    // Forward the ref to the section element
    // Add conditional highlight class and transition
    <section
      ref={ref}
      className={`bg-gray-50 py-16 px-4 md:px-8 transition-colors duration-500 ${isHighlighted ? 'bg-red-100' : ''}`}
    >
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-light mb-10 text-gray-800 opacity-90">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Feel free to reach out through any of these platforms.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12"> {/* Increased gap */}
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Contact me via ${link.name}`}
              // Enhanced hover effects: scale, lift, color change
              className="group flex flex-col items-center text-gray-600 hover:text-black transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
            >
              {/* Slightly larger icons, adjusted initial color */}
              <link.icon className="w-12 h-12 md:w-14 md:h-14 mb-2 transition-colors duration-300" />
              <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

// Add display name for DevTools
ContactMeSection.displayName = 'ContactMeSection';

export default ContactMeSection; 