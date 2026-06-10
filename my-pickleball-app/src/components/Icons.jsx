import React from 'react';

export const TrophyIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a3 3 0 00-3-3H7a3 3 0 00-3 3v2.75a2 2 0 002 2h4.5M12 13a4.5 4.5 0 004.5-4.5V6a3 3 0 00-3-3h-2M12 13a4.5 4.5 0 01-4.5-4.5V6" />
  </svg>
);

export const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);
// ... Add other icons as defined previously ...