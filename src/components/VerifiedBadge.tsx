import React from 'react';

interface VerifiedBadgeProps {
  className?: string;
  size?: number;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ className = '', size = 26 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md ${className}`}
    >
      <path
        d="M16 1L19.1835 4.11911L23.5 3.00962L24.6974 7.30259L28.9904 8.5L27.8809 12.8165L31 16L27.8809 19.1835L28.9904 23.5L24.6974 24.6974L23.5 28.9904L19.1835 27.8809L16 31L12.8165 27.8809L8.5 28.9904L7.30259 24.6974L3.00962 23.5L4.11911 19.1835L1 16L4.11911 12.8165L3.00962 8.5L7.30259 7.30259L8.5 3.00962L12.8165 4.11911L16 1Z"
        fill="#519FE8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3333 16.3563L14.205 19.2082L20.6666 12.7915"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
