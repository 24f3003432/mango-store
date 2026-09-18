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
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Primary Mango Gold
          600: '#EA580C', // Vibrant Mango Amber/Orange
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        leaf: {
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669',
          700: '#047857'
        },
        surface: {
          light: '#FBFBFD',
          cardLight: '#FFFFFF',
          dark: '#0C0D0E',
          cardDark: '#16171A',
          cardDarkHover: '#1E2024',
          borderLight: '#E5E7EB',
          borderDark: '#26282E'
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
        'mango-sm': '0 2px 8px -2px rgba(245, 158, 11, 0.12)',
        'mango-glow': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
