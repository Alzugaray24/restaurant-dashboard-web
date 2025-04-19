'use client';

import React, { ReactNode } from 'react';

export interface ActionButtonItem {
  /**
   * Icono del botón
   */
  icon: ReactNode;
  
  /**
   * Texto del tooltip
   */
  tooltip?: string;
  
  /**
   * Color del botón
   */
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  
  /**
   * Función que se ejecuta al hacer click
   */
  onClick?: () => void;
  
  /**
   * Si el botón está deshabilitado
   */
  disabled?: boolean;
}

export interface ActionButtonsProps {
  /**
   * Array de botones a mostrar
   */
  buttons: ActionButtonItem[];
  
  /**
   * Tamaño de los botones
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Alineación de los botones
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Espacio entre botones
   */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente ActionButtons - Grupo de botones de acción con iconos
 * 
 * Ejemplo de uso:
 * ```tsx
 * <ActionButtons 
 *   buttons={[
 *     { icon: <Eye />, tooltip: 'Ver', color: 'info', onClick: () => {} },
 *     { icon: <Edit />, tooltip: 'Editar', color: 'success', onClick: () => {} },
 *     { icon: <Trash />, tooltip: 'Eliminar', color: 'danger', onClick: () => {} }
 *   ]}
 * />
 * ```
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  buttons,
  size = 'md',
  align = 'right',
  spacing = 'md',
  className = '',
}) => {
  // Mapeo de colores a clases
  const colorClasses = {
    primary: 'text-blue-600 hover:text-blue-900 bg-blue-100',
    success: 'text-green-600 hover:text-green-900 bg-green-100',
    warning: 'text-yellow-600 hover:text-yellow-900 bg-yellow-100',
    danger: 'text-red-600 hover:text-red-900 bg-red-100',
    info: 'text-cyan-600 hover:text-cyan-900 bg-cyan-100',
    default: 'text-gray-600 hover:text-gray-900 bg-gray-100',
  };
  
  // Mapeo de tamaños a clases
  const sizeClasses = {
    sm: 'p-1.5 rounded-full',
    md: 'p-2 rounded-full',
    lg: 'p-2.5 rounded-full',
  };
  
  // Mapeo de iconos a tamaños
  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };
  
  // Mapeo de espaciado
  const spacingClasses = {
    none: 'space-x-0',
    sm: 'space-x-1',
    md: 'space-x-2',
    lg: 'space-x-3',
  };
  
  // Mapeo de alineación
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className={`flex ${alignClasses[align]} ${spacingClasses[spacing]} ${className}`}>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`${colorClasses[button.color || 'default']} ${sizeClasses[size]} ${
            button.disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title={button.tooltip}
          onClick={button.disabled ? undefined : button.onClick}
          disabled={button.disabled}
          type="button"
        >
          <span className={iconSizeClasses[size]}>
            {button.icon}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ActionButtons; 