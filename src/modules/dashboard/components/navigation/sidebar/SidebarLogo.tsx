'use client';

import React from 'react';

export interface SidebarLogoProps {
  /**
   * Texto del título principal
   */
  title?: string;
  
  /**
   * Texto del subtítulo
   */
  subtitle?: string;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente para mostrar el logo y título en el sidebar
 */
const SidebarLogo: React.FC<SidebarLogoProps> = ({
  title = 'Sedap.',
  subtitle = 'Restaurant Dashboard',
  className = '',
}) => {
  return (
    <div className={`mb-10 ${className}`}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-xs text-secondary">{subtitle}</p>
    </div>
  );
};

export default SidebarLogo; 