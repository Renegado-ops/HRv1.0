import React from 'react';

export const ITRHRvBrand: React.FC<{ variant?: 'header' | 'login' }> = ({
  variant = 'header',
}) => (
  <div className="flex items-center space-x-2.5 cursor-pointer select-none">
    <svg
      viewBox="0 0 100 100"
      className={variant === 'login' ? 'w-11 h-11' : 'w-8 h-8'}
    >
      <defs>
        <linearGradient
          id="itrBrandGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#0052cc" />
          <stop offset="50%" stopColor="#1ba0d7" />
          <stop offset="100%" stopColor="#00f2ad" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="36"
        fill="none"
        stroke="url(#itrBrandGradient)"
        strokeWidth="14"
        strokeDasharray="170 55"
        transform="rotate(-40 50 50)"
        strokeLinecap="round"
      />
    </svg>
    <div className="flex items-center space-x-1.5 font-sans">
      <span
        className={`font-bold tracking-tight text-xl ${
          variant === 'login' ? 'text-[#0052cc]' : 'text-white'
        }`}
      >
        ITR
      </span>
      <span
        className={`px-2 py-0.5 rounded-md text-xs font-semibold tracking-wider uppercase ${
          variant === 'login'
            ? 'bg-[#1ba0d7] text-white'
            : 'bg-white/20 text-white border border-white/30'
        }`}
      >
        HRv
      </span>
    </div>
  </div>
);
