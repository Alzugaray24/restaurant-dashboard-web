'use client';

import React, { ReactNode } from 'react';

export type StatusType = 'active' | 'inactive' | 'pending' | 'processing' | 'completed' | 'cancelled' | 'error';

export interface StatusBadgeProps {
  /**
   * Tipo de estado
   */
  status: StatusType;
  
  /**
   * Texto personalizado (opcional)
   */
  text?: string;
  
  /**
   * Icono adicional (opcional)
   */
  icon?: ReactNode;
  
  /**
   * Tamaño del badge
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente StatusBadge - Muestra el estado con colores apropiados
 * 
 * Ejemplo de uso:
 * ```tsx
 * <StatusBadge status="active" />
 * ```
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  icon,
  size = 'md',
  className = '',
}) => {
  // Mapeo de status a configuración (fondo, texto, border)
  const statusConfig = {
    active: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      displayText: text || 'Active',
    },
    inactive: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      displayText: text || 'Inactive',
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      displayText: text || 'Pending',
    },
    processing: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      displayText: text || 'Processing',
    },
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      displayText: text || 'Completed',
    },
    cancelled: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      displayText: text || 'Cancelled',
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      displayText: text || 'Error',
    },
  };

  // Mapeo de tamaños a clases
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  const { bg, text: textColor, displayText } = statusConfig[status];

  return (
    <span 
      className={`inline-flex items-center justify-center rounded-full font-medium ${bg} ${textColor} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {displayText}
    </span>
  );
};

export default StatusBadge; 