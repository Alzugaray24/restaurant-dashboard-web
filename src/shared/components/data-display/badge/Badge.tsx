import React, { ReactNode } from 'react';

export interface BadgeProps {
  /**
   * Contenido del badge
   */
  children: ReactNode;
  
  /**
   * Variante de color
   */
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default';
  
  /**
   * Tamaño del badge
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Si es redondeado
   */
  rounded?: boolean;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  className = '',
}) => {
  // Mapeo de variantes a clases
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800',
    default: 'bg-gray-100 text-gray-800',
  };
  
  // Mapeo de tamaños a clases
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2.5 py-1.5',
  };
  
  // Clases de borde
  const roundedClasses = rounded ? 'rounded-full' : 'rounded';
  
  return (
    <span className={`inline-flex items-center ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge; 