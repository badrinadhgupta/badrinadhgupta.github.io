// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    // ---- START: Add these lines ----
    output: 'export', // Instructs Next.js to produce static HTML files
  
    // Optional: Configure base path if deploying to a subdirectory (e.g., username.github.io/repo-name)
    // Replace 'your-repo-name' with the actual name of your GitHub repository
    // basePath: '/your-repo-name', 
    // assetPrefix: '/your-repo-name/', // Ensures assets (JS, CSS, images) load correctly
  
    // Optional: Disable Next.js Image Optimization if using next/image
    // The default loader requires a server; use 'unoptimized' for static export
    // Or configure a cloud-based loader if needed.
    images: {
      unoptimized: true,
    },
    // ---- END: Add these lines ----
  
    // Keep any other configurations you might have
    reactStrictMode: true, 
  };
  
  module.exports = nextConfig;