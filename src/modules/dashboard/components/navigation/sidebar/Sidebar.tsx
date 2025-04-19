'use client';

import React, { ReactNode } from 'react';
import SidebarLogo from './SidebarLogo';
import SidebarNavigation, { NavItemConfig } from './SidebarNavigation';
import SidebarNotification from './SidebarNotification';
import SidebarFooter from './SidebarFooter';

// Iconos simplificados para ejemplo
const homeIcon = <span>🏠</span>;
const cartIcon = <span>🛒</span>;
const customersIcon = <span>👥</span>;
const dishesIcon = <span>🍽️</span>;
const menuIcon = <span>📋</span>;

// Elementos de navegación predeterminados
const defaultNavItems: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', icon: homeIcon, isActive: true, path: '/dashboard' },
  { id: 'orders', label: 'Orders', icon: cartIcon, path: '/dashboard/orders' },
  { id: 'customers', label: 'Customers', icon: customersIcon, path: '/dashboard/customers' },
  { id: 'dishes', label: 'Dishes', icon: dishesIcon, path: '/dashboard/dishes' },
  { id: 'menus', label: 'Menus', icon: menuIcon, path: '/dashboard/menus' },
];

export interface SidebarProps {
  /**
   * Logo del dashboard
   */
  logo?: {
    title?: string;
    subtitle?: string;
  };
  
  /**
   * Elementos de navegación
   */
  navItems?: NavItemConfig[];
  
  /**
   * Notificación a mostrar
   */
  notification?: {
    icon?: ReactNode;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    onButtonClick?: () => void;
  };
  
  /**
   * Información del footer
   */
  footer?: {
    year?: string;
    companyName?: string;
    createdBy?: string;
  };
  
  /**
   * Handler para clicks de navegación
   */
  onNavItemClick?: (item: NavItemConfig) => void;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente Sidebar que agrupa todos los elementos de navegación lateral
 */
const Sidebar: React.FC<SidebarProps> = ({
  logo,
  navItems = defaultNavItems,
  notification,
  footer,
  onNavItemClick,
  className = '',
}) => {
  return (
    <div className={`dashboard-sidebar ${className}`}>
      <div>
        <SidebarLogo 
          title={logo?.title}
          subtitle={logo?.subtitle}
        />

        <SidebarNavigation 
          items={navItems}
          onItemClick={onNavItemClick}
        />
      </div>

      <div>
        <SidebarNotification 
          icon={notification?.icon}
          title={notification?.title}
          subtitle={notification?.subtitle}
          buttonText={notification?.buttonText}
          onButtonClick={notification?.onButtonClick}
          className="mb-4"
        />

        <SidebarFooter 
          year={footer?.year}
          companyName={footer?.companyName}
          createdBy={footer?.createdBy}
        />
      </div>
    </div>
  );
};

export default Sidebar; 