const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', '"Outfit"', 'sans-serif'],
        athletic: ['Montserrat', 'sans-serif'],
      },
      colors: {
        afa: {
          navy: {
            950: '#020617',
            900: '#070e22',
            850: '#0a1432',
            800: '#0f1d46',
            700: '#1e3a8a',
            600: '#1e40af',
          },
          blue: {
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
          },
          red: {
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
          },
          gold: {
            300: '#fde047',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
          },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 30px -5px rgba(37, 99, 235, 0.45)',
        'glow-red': '0 0 30px -5px rgba(220, 38, 38, 0.45)',
        'glow-gold': '0 0 30px -5px rgba(245, 158, 11, 0.45)',
        'card-depth': '0 20px 40px -15px rgba(2, 6, 23, 0.7)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        "img1": "url('https://img.freepik.com/free-vector/realistic-abstract-football-background_52683-67579.jpg?semt=ais_hybrid')",
        "img2": "url('https://img.freepik.com/free-vector/soccer-stadium_1284-22432.jpg')",
        "img3": "url('https://static.dezeen.com/uploads/2014/07/World-Cup-2014-adidas-football-brazuca_dezeenss_1.jpg')",
        "stadium-mesh": "radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.25) 0%, rgba(2, 6, 23, 0) 70%)",
        "gold-mesh": "radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.25) 0%, rgba(2, 6, 23, 0) 70%)",
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar'),
  ],
}