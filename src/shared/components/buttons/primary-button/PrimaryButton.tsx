'use client';

import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

// Define los tipos localmente para evitar problemas de importación
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
   * Full width button
   */
  fullWidth?: boolean;
  
  /**
   * Additional classes
   */
  className?: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Base button styles
  const baseStyles = 'font-medium transition-colors rounded-lg flex items-center justify-center';
  
  // Primary button style
  const primaryStyles = 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50';
  
  // Default size
  const sizeStyles = 'text-sm py-2 px-4';
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Combine all styles
  const buttonStyles = `
    ${baseStyles} 
    ${primaryStyles} 
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

export default PrimaryButton; 