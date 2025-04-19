'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
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
  
  /**
   * ID del elemento de navegación activo
   */
  activeItemId?: string;
}

/**
 * Layout principal para el dashboard
 * Incluye el sidebar y un área para el contenido principal
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  activeItemId = 'dashboard'
}) => {
  const router = useRouter();

  // Configuración para el sidebar
  const sidebarConfig = {
    logo: {
      title: "Sedap.",
      subtitle: "Restaurant Dashboard"
    },
    navItems: [
      { 
        id: 'dashboard', 
        label: 'Dashboard', 
        icon: homeIcon, 
        isActive: activeItemId === 'dashboard', 
        path: '/' 
      },
      { 
        id: 'orders', 
        label: 'Orders', 
        icon: cartIcon, 
        isActive: activeItemId === 'orders', 
        path: '/orders' 
      },
      { 
        id: 'customers', 
        label: 'Customers', 
        icon: customersIcon, 
        isActive: activeItemId === 'customers', 
        path: '/customers' 
      },
      { 
        id: 'dishes', 
        label: 'Dishes', 
        icon: dishesIcon, 
        isActive: activeItemId === 'dishes', 
        path: '/dishes' 
      },
      { 
        id: 'menus', 
        label: 'Menus', 
        icon: menuIcon, 
        isActive: activeItemId === 'menus', 
        path: '/menus' 
      },
    ],
    notification: {
      icon: <span className="text-2xl">👨‍🍳</span>,
      title: "Please update",
      subtitle: "your KYC/Food license",
      buttonText: "Add Papers",
      onButtonClick: () => {
        console.log("Update license clicked");
        // Aquí podríamos navegar a una página para actualizar la licencia
        // router.push('/license');
      }
    },
    footer: {
      year: "2023",
      companyName: "Sedap Restaurant Admin Dashboard",
      createdBy: "Peterdraw"
    },
    onNavItemClick: (item: NavItemConfig) => {
      console.log("Navegación a:", item.path);
      if (item.path) {
        router.push(item.path);
      }
    }
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