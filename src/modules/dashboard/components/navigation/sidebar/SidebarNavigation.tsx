'use client';

import React, { ReactNode } from 'react';
import { NavItem } from '../../../../../shared/components/navigation';

export interface NavItemConfig {
  /**
   * Identificador único
   */
  id: string;
  
  /**
   * Etiqueta a mostrar
   */
  label: string;
  
  /**
   * Icono del elemento
   */
  icon: ReactNode;
  
  /**
   * Si está activo 
   */
  isActive?: boolean;
  
  /**
   * Ruta asociada al elemento
   */
  path?: string;
}

export interface SidebarNavigationProps {
  /**
   * Lista de elementos de navegación
   */
  items?: NavItemConfig[];
  
  /**
   * Función a ejecutar al hacer click
   */
  onItemClick?: (item: NavItemConfig) => void;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente para mostrar la navegación principal del sidebar
 */
const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  items = [],
  onItemClick,
  className = '',
}) => {
  // Handler para manejar los clicks
  const handleItemClick = (item: NavItemConfig) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };
  
  return (
    <nav className={`space-y-6 ${className}`}>
      {items.map((item) => (
        <NavItem 
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={item.isActive}
          onClick={() => handleItemClick(item)}
        />
      ))}
    </nav>
  );
};

export default SidebarNavigation; 