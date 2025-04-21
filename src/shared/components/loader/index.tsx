'use client';

import React from 'react';

interface LoaderProps {
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  text = 'Cargando...', 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <div className="relative w-12 h-12 mb-3">
        <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin">
          <div className="h-3 w-3 absolute top-0 left-1/2 -ml-1.5 rounded-full bg-blue-600"></div>
          <div className="h-3 w-3 absolute top-1.5 right-1.5 rounded-full bg-blue-500 opacity-90"></div>
          <div className="h-3 w-3 absolute right-0 top-1/2 -mt-1.5 rounded-full bg-blue-400 opacity-80"></div>
          <div className="h-3 w-3 absolute bottom-1.5 right-1.5 rounded-full bg-green-500 opacity-70"></div>
          <div className="h-3 w-3 absolute bottom-0 left-1/2 -ml-1.5 rounded-full bg-green-600 opacity-60"></div>
          <div className="h-3 w-3 absolute bottom-1.5 left-1.5 rounded-full bg-amber-500 opacity-70"></div>
          <div className="h-3 w-3 absolute left-0 top-1/2 -mt-1.5 rounded-full bg-amber-600 opacity-80"></div>
          <div className="h-3 w-3 absolute top-1.5 left-1.5 rounded-full bg-red-500 opacity-90"></div>
        </div>
      </div>
      {text && <p className="text-gray-600 font-medium">{text}</p>}
    </div>
  );
};

export default Loader; 