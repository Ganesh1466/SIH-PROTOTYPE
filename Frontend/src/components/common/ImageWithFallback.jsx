import React, { useState } from 'react';
import { Building2, User } from 'lucide-react';

export const ImageWithFallback = ({
  src,
  alt = '',
  fallbackType = 'company', // 'company' | 'avatar'
  className = '',
  ...props
}) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    if (fallbackType === 'avatar') {
      return (
        <div className={`flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold ${className}`}>
          <User className="w-1/2 h-1/2" />
        </div>
      );
    }
    return (
      <div className={`flex items-center justify-center bg-slate-100 text-slate-500 font-bold ${className}`}>
        <Building2 className="w-1/2 h-1/2" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
      {...props}
    />
  );
};
