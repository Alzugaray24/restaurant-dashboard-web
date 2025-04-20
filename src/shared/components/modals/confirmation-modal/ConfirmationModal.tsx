"use client";

import { useEffect, useRef, ReactNode } from "react";
import { X, Trash2, AlertTriangle, Info, AlertCircle } from "lucide-react";

export type ConfirmationModalType = 'delete' | 'warning' | 'info' | 'error';

export interface ConfirmationModalProps {
  /**
   * Indica si el modal está abierto
   */
  isOpen: boolean;
  
  /**
   * Función que se ejecuta al cerrar el modal
   */
  onClose: () => void;
  
  /**
   * Función que se ejecuta al confirmar la acción
   */
  onConfirm: () => void;
  
  /**
   * Título del modal
   */
  title?: string;
  
  /**
   * Mensaje principal del modal
   */
  message: string;
  
  /**
   * Elemento o texto destacado en el mensaje (opcional)
   */
  highlightedItem?: string | ReactNode;
  
  /**
   * Texto del botón para confirmar
   */
  confirmButtonText?: string;
  
  /**
   * Texto del botón para cancelar
   */
  cancelButtonText?: string;
  
  /**
   * Tipo de modal (cambia los colores e iconos)
   */
  type?: ConfirmationModalType;
}

/**
 * Componente ConfirmationModal - Modal para confirmar acciones importantes
 * 
 * Ejemplo de uso:
 * ```tsx
 * <ConfirmationModal 
 *   isOpen={isModalOpen} 
 *   onClose={() => setIsModalOpen(false)}
 *   onConfirm={handleDeleteUser}
 *   title="Confirmar eliminación"
 *   message="¿Desea eliminar a este usuario?"
 *   highlightedItem="John Doe"
 *   type="delete"
 * />
 * ```
 */
export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message,
  highlightedItem,
  confirmButtonText,
  cancelButtonText = "No, cancelar",
  type = "delete"
}: ConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Configuración basada en el tipo
  const config = {
    delete: {
      icon: <Trash2 className="w-6 h-6 text-red-600" />,
      iconBg: "bg-red-100",
      confirmButtonText: confirmButtonText || "Sí, eliminar",
      confirmButtonColor: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      iconBg: "bg-amber-100",
      confirmButtonText: confirmButtonText || "Continuar",
      confirmButtonColor: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 text-white",
    },
    info: {
      icon: <Info className="w-6 h-6 text-blue-600" />,
      iconBg: "bg-blue-100",
      confirmButtonText: confirmButtonText || "Aceptar",
      confirmButtonColor: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
    },
    error: {
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      iconBg: "bg-red-100",
      confirmButtonText: confirmButtonText || "Entendido",
      confirmButtonColor: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
    },
  };

  // Cerrar el modal al presionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in duration-300 pointer-events-auto"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-1"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className={`flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full ${config[type].iconBg}`}>
            {config[type].icon}
          </div>
          <p className="text-center text-gray-700 mb-6">
            {message}
            {highlightedItem && (
              <span className="block font-semibold mt-2">
                {highlightedItem}
              </span>
            )}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              {cancelButtonText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 ${config[type].confirmButtonColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
            >
              {config[type].confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 