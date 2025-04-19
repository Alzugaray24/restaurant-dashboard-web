'use client';

import React, { ReactNode } from 'react';
import Sidebar from '../components/navigation/sidebar';
import { NavItemConfig } from '../components/navigation/sidebar/SidebarNavigation';

// Iconos para el sidebar
const homeIcon = <span>🏠</span>;
const cartIcon = <span>🛒</span>;
const customersIcon = <span>👥</span>;
const dishesIcon = <span>🍽️</span>;
const menuIcon = <span>📋</span>;

export interface DashboardLayoutProps {
  /**
   * Contenido a mostrar en el área principal
   */
  children: ReactNode;
}

/**
 * Layout principal para el dashboard
 * Incluye el sidebar y un área para el contenido principal
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // Configuración para el sidebar
  const sidebarConfig = {
    logo: {
      title: "Sedap.",
      subtitle: "Restaurant Dashboard"
    },
    navItems: [
      { id: 'dashboard', label: 'Dashboard', icon: homeIcon, isActive: true, path: '/dashboard' },
      { id: 'orders', label: 'Orders', icon: cartIcon, path: '/dashboard/orders' },
      { id: 'customers', label: 'Customers', icon: customersIcon, path: '/dashboard/customers' },
      { id: 'dishes', label: 'Dishes', icon: dishesIcon, path: '/dashboard/dishes' },
      { id: 'menus', label: 'Menus', icon: menuIcon, path: '/dashboard/menus' },
    ],
    notification: {
      icon: <span className="text-xl">👨‍🍳</span>,
      title: "Please update your",
      subtitle: "KYC/Food license",
      buttonText: "Add Papers",
      onButtonClick: () => console.log("Update license clicked")
    },
    footer: {
      year: "2023",
      companyName: "Sedap Restaurant Admin Dashboard",
      createdBy: "Peterdraw"
    },
    onNavItemClick: (item: NavItemConfig) => console.log("Navegación a:", item.path)
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar {...sidebarConfig} />

      {/* Área de contenido principal */}
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout; 