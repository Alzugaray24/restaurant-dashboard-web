'use client';

import React from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: ReactNode;
  
  /**
   * Optional icon to display before text
   */
  leftIcon?: ReactNode;
  
  /**
   * Optional icon to display after text
   */
  rightIcon?: ReactNode;
  
  /**
   * Button color (default color is based on the dashboard design)
   */
  color?: 'default' | 'blue' | 'green' | 'red';
  
  /**
   * Full width button
   */
  fullWidth?: boolean;
  
  /**
   * Additional classes
   */
  className?: string;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  color = 'default',
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Base button styles
  const baseStyles = 'font-medium transition-colors rounded-lg flex items-center justify-center';
  
  // Color variants
  const colorStyles = {
    default: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    blue: 'border border-blue-100 text-blue-500 hover:bg-blue-50',
    green: 'border border-green-200 text-green-600 hover:bg-green-50',
    red: 'border border-red-100 text-red-500 hover:bg-red-50',
  };
  
  // Default size
  const sizeStyles = 'text-xs py-2 px-3';
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Combine all styles
  const buttonStyles = `
    ${baseStyles} 
    ${colorStyles[color]} 
    ${sizeStyles} 
    ${widthStyles} 
    ${className}
  `;

  return (
    <button className={buttonStyles} {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default OutlineButton; 