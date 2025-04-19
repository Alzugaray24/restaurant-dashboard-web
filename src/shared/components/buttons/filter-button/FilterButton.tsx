'use client';

import React from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to display
   */
  icon?: ReactNode;
  
  /**
   * Button label
   */
  label: string;
  
  /**
   * Secondary text/value to display
   */
  value?: string;
  
  /**
   * Icon to display on the right side (e.g. chevron)
   */
  rightIcon?: ReactNode;
  
  /**
   * Additional classes
   */
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  icon,
  label,
  value,
  rightIcon,
  className = '',
  ...props
}) => {
  return (
    <button 
      className={`flex items-center bg-white border rounded-lg p-2 gap-2 ${className}`}
      {...props}
    >
      {icon && (
        <div className="text-blue-500">
          {icon}
        </div>
      )}
      
      <div>
        <p className="text-xs font-semibold">{label}</p>
        {value && <p className="text-xs text-gray-500">{value}</p>}
      </div>
      
      {rightIcon && (
        <div className="text-gray-400">
          {rightIcon}
        </div>
      )}
    </button>
  );
};

export default FilterButton; 