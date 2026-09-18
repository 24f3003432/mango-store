/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mango: {
          50: '#F9F5F1',
          100: '#F2E9E0',
          200: '#E7D2BF',
          300: '#D7B79A',
          400: '#C28D68',
          500: '#A66E4E',
          600: '#8B5C42',
          700: '#6F4737',
          800: '#4D352E',
          900: '#2F241F',
          950: '#1B1412',
        },
        leaf: {
          50: '#F5F7F3',
          100: '#E9EFE7',
          200: '#D6E2D8',
          300: '#B4CBBB',
          400: '#8DAE98',
          500: '#738F7D',
          600: '#597267',
          700: '#42564F',
          800: '#2F4038',
          900: '#1F2D29',
        },
        surface: {
          light: '#F7F4F0',
          cardLight: '#FFFFFF',
          dark: '#171614',
          cardDark: '#1F1D1A',
          cardDarkHover: '#2A2622',
          borderLight: '#E8DFD5',
          borderDark: '#3A352F'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'mango': '20px',
        'mango-lg': '28px',
        'mango-sm': '12px',
      },
      boxShadow: {
        'mango-sm': '0 2px 8px -2px rgba(144, 20, 53, 0.2)',
        'mango-glow': '0 0 25px -4px rgba(144, 20, 53, 0.45)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
