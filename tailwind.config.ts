import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Set the default sans-serif font family to use our CSS variable
        sans: ['var(--font-roboto-condensed)', 'sans-serif'],
        // Remove mono if not needed, or set it to roboto-condensed too if desired
        // mono: ['var(--font-roboto-condensed)', 'monospace'], 
      },
      // Add any other theme extensions here if needed in the future
      // Example: 
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
    },
  },
  plugins: [],
};
export default config; 