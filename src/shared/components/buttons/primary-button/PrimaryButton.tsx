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

  /**
   * Shows loading spinner
   */
  isLoading?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  isLoading = false,
  disabled,
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
  
  // Disabled styles
  const disabledStyles = (disabled || isLoading) ? 'opacity-70 cursor-not-allowed' : '';
  
  // Combine all styles
  const buttonStyles = `
    ${baseStyles} 
    ${primaryStyles} 
    ${sizeStyles} 
    ${widthStyles}
    ${disabledStyles}
    ${className}
  `;

  // Loading spinner
  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button 
      className={buttonStyles} 
      disabled={disabled || isLoading} 
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          {children}
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default PrimaryButton; 