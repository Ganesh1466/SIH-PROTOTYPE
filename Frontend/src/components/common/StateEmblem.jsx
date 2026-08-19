import React from 'react';

export const StateEmblem = ({ className = "h-12 w-auto", dark = false }) => {
  return (
    <img 
      src="/state-emblem.svg" 
      alt="Emblem of Government of Rajasthan" 
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/national-emblem.svg'; }}
      className={`${className} object-contain ${dark ? 'invert' : ''}`}
    />
  );
};
