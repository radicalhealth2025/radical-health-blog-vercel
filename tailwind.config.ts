import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A8C5A7', // Sage green
          light: '#C5DCC4',
          dark: '#8BAF8A',
        },
        secondary: {
          DEFAULT: '#D5C6E6', // Soft lavender
          light: '#E8DFF3',
          dark: '#BFA8D9',
        },
        accent: {
          DEFAULT: '#F5F1E8', // Warm cream
          light: '#FAF8F3',
          dark: '#E8E1D3',
        },
        background: '#F0F4F8', // Gentle blue-gray
        text: {
          DEFAULT: '#3A3A3A', // Charcoal gray
          light: '#6B6B6B',
        },
      },
      fontFamily: {
        heading: ['Inter', 'Manrope', 'sans-serif'],
        body: ['Georgia', 'Merriweather', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};

export default config;
