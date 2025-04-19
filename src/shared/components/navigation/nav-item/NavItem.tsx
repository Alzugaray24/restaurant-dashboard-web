'use client';

import React, { ReactNode } from 'react';

export interface NavItemProps {
  /**
   * Icono del elemento de navegación
   */
  icon: ReactNode;
  
  /**
   * Texto del elemento
   */
  label: string;
  
  /**
   * Si está activo/seleccionado
   */
  isActive?: boolean;
  
  /**
   * Función de click
   */
  onClick?: () => void;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
  className = '',
}) => {
  // Estilos base
  const baseStyles = "flex items-center gap-3 p-3 rounded-lg";
  
  // Estilos según estado
  const stateStyles = isActive 
    ? "bg-green-50 text-green-600" 
    : "text-gray-500 hover:bg-gray-50";
  
  return (
    <div 
      className={`${baseStyles} ${stateStyles} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default NavItem; 