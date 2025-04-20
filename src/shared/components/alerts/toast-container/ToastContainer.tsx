"use client";

import { ReactNode } from 'react';

export interface ToastContainerProps {
  /**
   * Posición de los toasts
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  
  /**
   * Contenido (toasts)
   */
  children: ReactNode;
}

/**
 * Componente ToastContainer - Contenedor para mostrar múltiples Toast
 * 
 * Ejemplo de uso:
 * ```tsx
 * <ToastContainer position="top-right">
 *   {toasts.map((toast) => (
 *     <Toast key={toast.id} {...toast} />
 *   ))}
 * </ToastContainer>
 * ```
 */
export default function ToastContainer({
  position = 'top-right',
  children
}: ToastContainerProps) {
  // Mapeo de posiciones a clases
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div 
      className={`fixed z-50 flex flex-col gap-2 ${positionClasses[position]}`}
      aria-live="assertive"
    >
      {children}
    </div>
  );
} 