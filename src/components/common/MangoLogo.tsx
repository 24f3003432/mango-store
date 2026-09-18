import React from 'react';

interface MangoLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const MangoLogo: React.FC<MangoLogoProps> = ({
  className = '',
  size = 28,
  showText = false
}) => {
  return (
    <div className={`inline-flex items-center gap-2 group select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="mangoFruitGrad" x1="20" y1="15" x2="85" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="45" y1="2" x2="70" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Emerald Leaf atop */}
        <path
          d="M48 10 C 50 3, 62 1, 74 6 C 72 15, 62 20, 52 18 C 47 16, 47 12, 48 10 Z"
          fill="url(#leafGrad)"
        />

        {/* Stylized Mango Fruit Silhouette (distinct smooth curve, NOT a bitten fruit) */}
        <path
          d="M 52 16 
             C 32 16, 16 34, 16 56 
             C 16 80, 34 94, 56 94 
             C 78 94, 88 80, 88 56 
             C 88 28, 68 16, 52 16 Z"
          fill="url(#mangoFruitGrad)"
          filter="url(#softGlow)"
        />

        {/* Elegant internal highlight curve */}
        <path
          d="M 28 42 C 30 30, 40 22, 54 20"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
      </svg>
      {showText && (
        <span className="font-semibold text-lg tracking-tight text-neutral-900 dark:text-white group-hover:text-mango-500 transition-colors">
          Mango
        </span>
      )}
    </div>
  );
};
