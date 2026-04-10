import React from 'react';

const HippoIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
  >
    {/* Body */}
    <ellipse cx="50" cy="65" rx="30" ry="20" fill="#8B4513" />
    {/* Head */}
    <ellipse cx="50" cy="45" rx="25" ry="18" fill="#8B4513" />
    {/* Ears */}
    <ellipse cx="30" cy="35" rx="6" ry="10" fill="#654321" />
    <ellipse cx="70" cy="35" rx="6" ry="10" fill="#654321" />
    {/* Eyes */}
    <circle cx="40" cy="42" r="3" fill="#000" />
    <circle cx="60" cy="42" r="3" fill="#000" />
    {/* Nose */}
    <ellipse cx="50" cy="50" rx="4" ry="2" fill="#000" />
    {/* Mouth */}
    <path d="M 45 55 Q 50 58 55 55" stroke="#000" strokeWidth="2" fill="none" />
    {/* Legs */}
    <rect x="25" y="75" width="8" height="15" fill="#654321" />
    <rect x="42" y="75" width="8" height="15" fill="#654321" />
    <rect x="58" y="75" width="8" height="15" fill="#654321" />
    <rect x="75" y="75" width="8" height="15" fill="#654321" />
  </svg>
);

export default HippoIcon;