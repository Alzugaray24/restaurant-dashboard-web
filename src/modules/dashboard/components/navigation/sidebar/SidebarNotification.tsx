'use client';

import React, { ReactNode } from 'react';

export interface SidebarNotificationProps {
  /**
   * Icono a mostrar
   */
  icon?: ReactNode;
  
  /**
   * Título de la notificación
   */
  title?: string;
  
  /**
   * Subtítulo o descripción
   */
  subtitle?: string;
  
  /**
   * Texto del botón
   */
  buttonText?: string;
  
  /**
   * Función a ejecutar al hacer click en el botón
   */
  onButtonClick?: () => void;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente para mostrar notificaciones o alertas en el sidebar
 */
const SidebarNotification: React.FC<SidebarNotificationProps> = ({
  icon = <span className="text-2xl">👨‍🍳</span>,
  title = 'Please update your',
  subtitle = 'KYC/Food license',
  buttonText = 'Add Papers',
  onButtonClick,
  className = '',
}) => {
  return (
    <div className={`bg-[var(--color-primary-light)] p-4 rounded-lg ${className}`}>
      <div className="flex items-start gap-3">
        <div className="bg-white rounded-full p-2.5">
          <div className="bg-amber-500 rounded-full w-10 h-10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="pt-2">
          <p className="text-sm text-[var(--color-primary)]">{title}</p>
          <p className="text-sm text-[var(--color-primary)] font-semibold">{subtitle}</p>
        </div>
      </div>
      <button 
        className="mt-5 w-full bg-white hover:bg-gray-50 text-[var(--color-primary)] text-sm py-3 rounded-lg border border-[var(--color-primary-light)]"
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SidebarNotification; 