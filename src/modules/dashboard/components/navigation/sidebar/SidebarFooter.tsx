'use client';

import React from 'react';

export interface SidebarFooterProps {
  /**
   * Año del copyright
   */
  year?: string;
  
  /**
   * Texto de la empresa o producto
   */
  companyName?: string;
  
  /**
   * Información del creador
   */
  createdBy?: string;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente para mostrar el pie de página del sidebar
 */
const SidebarFooter: React.FC<SidebarFooterProps> = ({
  year = '2023',
  companyName = 'Sedap Restaurant Admin Dashboard',
  createdBy = 'Peterdraw',
  className = '',
}) => {
  return (
    <div className={`text-xs text-secondary ${className}`}>
      <p>{companyName}</p>
      <p>© {year} All Rights Reserved</p>
      <div className="flex items-center mt-1">
        <p>Made with</p>
        <span className="text-red-500 mx-1">❤</span>
        <p>by {createdBy}</p>
      </div>
    </div>
  );
};

export default SidebarFooter; 