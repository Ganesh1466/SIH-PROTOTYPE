import React from 'react';

export const StateEmblem = ({ className = "h-12 w-auto", dark = false }) => {
  return (
    <img 
      src="/state-emblem.svg" 
      alt="Emblem of Government of Rajasthan" 
      className={`${className} object-contain ${dark ? 'invert' : ''}`}
    />
  );
};
