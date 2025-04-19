'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { DashboardLayout } from '../modules/dashboard/layout';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Layout principal que envuelve todas las páginas con el DashboardLayout
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  
  // Determinar si la página actual es la página activa en el sidebar
  const getActivePath = () => {
    // Eliminar la barra inicial para obtener el primer segmento de la ruta
    const segment = pathname.split('/')[1] || 'dashboard';
    return segment === '' ? 'dashboard' : segment;
  };
  
  return (
    <DashboardLayout activeItemId={getActivePath()}>
      {children}
    </DashboardLayout>
  );
};

export default MainLayout; 