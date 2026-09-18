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
          50: '#FDF2F4',
          100: '#FCE7EC',
          200: '#F9CBD6',
          300: '#F29CB0',
          400: '#DC5A77',
          500: '#901435', // Signature Royal Burgundy
          600: '#7E0F2D', // Deep Burgundy Hover
          700: '#680A23', // Dark Cabernet
          800: '#54081C', // Midnight Velvet Burgundy
          900: '#3F0514', // Deep Burgundy
          950: '#25020B',
        },
        leaf: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
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
        'mango-sm': '0 2px 8px -2px rgba(144, 20, 53, 0.2)',
        'mango-glow': '0 0 25px -4px rgba(144, 20, 53, 0.45)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
        'elevation': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        'elevation-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(0.6deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.04)', opacity: '0.92' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-up': 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.35s ease-out forwards',
        'shimmer': 'shimmer 2.5s infinite linear',
      }
    },
  },
  plugins: [],
}
