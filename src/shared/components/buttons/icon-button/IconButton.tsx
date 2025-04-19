'use client';

import React from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to display
   */
  icon: ReactNode;
  
  /**
   * Button variant
   */
  variant?: 'default' | 'outline' | 'ghost';
  
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Is the button rounded (circular)
   */
  rounded?: boolean;
  
  /**
   * Additional classes
   */
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'default',
  size = 'md',
  rounded = false,
  className = '',
  ...props
}) => {
  // Base button styles
  const baseStyles = 'flex items-center justify-center transition-colors';
  
  // Variant styles
  const variantStyles = {
    default: 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50',
    outline: 'bg-transparent border border-gray-300 text-gray-500 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
  };
  
  // Shape styles
  const shapeStyles = rounded ? 'rounded-full' : 'rounded-lg';
  
  // Combine all styles
  const buttonStyles = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${shapeStyles} 
    ${className}
  `;

  return (
    <button className={buttonStyles} {...props}>
      {icon}
    </button>
  );
};

export default IconButton; 