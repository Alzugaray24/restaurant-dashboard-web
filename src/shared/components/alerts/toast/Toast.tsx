"use client";

import { ReactNode, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  X 
} from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  /**
   * Tipo de toast
   */
  type: ToastType;
  
  /**
   * Mensaje principal
   */
  message: string;
  
  /**
   * Mensaje secundario (opcional)
   */
  description?: string;
  
  /**
   * Si se debe mostrar el toast
   */
  isVisible: boolean;
  
  /**
   * Función para cerrar el toast
   */
  onClose: () => void;
  
  /**
   * Duración en milisegundos (0 para no cerrar automáticamente)
   */
  duration?: number;
  
  /**
   * Contenido personalizado
   */
  children?: ReactNode;
}

/**
 * Componente Toast - Muestra notificaciones temporales
 * 
 * Ejemplo de uso:
 * ```tsx
 * <Toast
 *   type="success"
 *   message="Usuario eliminado exitosamente"
 *   isVisible={showToast}
 *   onClose={() => setShowToast(false)}
 * />
 * ```
 */
export default function Toast({
  type = 'success',
  message,
  description,
  isVisible,
  onClose,
  duration = 3000,
  children
}: ToastProps) {
  // Configuración según el tipo
  const config = {
    success: {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-400',
      textColor: 'text-green-800',
    },
    error: {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-400',
      textColor: 'text-red-800',
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-400',
      textColor: 'text-amber-800',
    },
    info: {
      icon: <Info className="h-5 w-5 text-blue-500" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800',
    },
  };

  // Auto-cerrar después de la duración
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className={`flex w-full max-w-md overflow-hidden rounded-lg border ${config[type].borderColor} ${config[type].bgColor} shadow-lg animate-in slide-in-from-top-5 duration-300`}
      role="alert"
    >
      <div className="flex items-center px-4">
        {config[type].icon}
      </div>
      
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${config[type].textColor}`}>
            {message}
          </p>
          <button 
            onClick={onClose}
            className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {description && (
          <p className="mt-1 text-xs text-gray-600">{description}</p>
        )}
        
        {children}
      </div>
    </div>
  );
} 