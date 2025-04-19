'use client';

import React, { ReactNode } from 'react';
import { PrimaryButton } from '../../../../../shared/components/buttons';

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
  icon = <span className="text-xl">👨‍🍳</span>,
  title = 'Please update your',
  subtitle = 'KYC/Food license',
  buttonText = 'Add Papers',
  onButtonClick,
  className = '',
}) => {
  return (
    <div className={`bg-[var(--color-primary-light)] p-4 rounded-lg ${className}`}>
      <div className="flex items-start gap-3">
        <div className="bg-white p-2 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-xs text-[var(--color-primary)]">{title}</p>
          <p className="text-xs text-[var(--color-primary)] font-semibold">{subtitle}</p>
        </div>
      </div>
      <PrimaryButton 
        className="mt-3 w-full bg-white text-[var(--color-primary)] text-xs py-2 rounded-lg border border-green-200"
        onClick={onButtonClick}
      >
        {buttonText}
      </PrimaryButton>
    </div>
  );
};

export default SidebarNotification; 