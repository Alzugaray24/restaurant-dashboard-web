"use client";

import { FormEvent, useRef, useEffect, useState } from 'react';
import { X, UserPlus, Edit2 } from 'lucide-react';

export interface CustomerFormModalProps {
  /**
   * Indica si el modal está abierto
   */
  isOpen: boolean;
  
  /**
   * Función que se ejecuta al cerrar el modal
   */
  onClose: () => void;
  
  /**
   * Función que se ejecuta al enviar el formulario
   */
  onSubmit: (data: { name: string; email: string }) => void;
  
  /**
   * Título del modal
   */
  title?: string;
  
  /**
   * Si está cargando el envío del formulario
   */
  isLoading?: boolean;

  /**
   * Si es modo edición o creación
   */
  isEditMode?: boolean;

  /**
   * Datos iniciales para edición
   */
  initialData?: {
    name: string;
    email: string;
  };
}

/**
 * Componente CustomerFormModal - Modal para agregar o editar clientes
 * 
 * Ejemplo de uso:
 * ```tsx
 * <CustomerFormModal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   onSubmit={handleSubmit}
 * />
 * ```
 */
export default function CustomerFormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  isLoading = false,
  isEditMode = false,
  initialData = { name: '', email: '' }
}: CustomerFormModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Define el título basado en el modo
  const modalTitle = title || (isEditMode ? "Editar Cliente" : "Agregar Cliente");

  // Actualizar los campos cuando cambian los datos iniciales (para edición)
  useEffect(() => {
    if (isOpen && isEditMode && initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setNameError('');
      setEmailError('');
    } else if (isOpen && !isEditMode) {
      setName('');
      setEmail('');
      setNameError('');
      setEmailError('');
    }
  }, [isOpen, isEditMode, initialData]);

  // Cerrar el modal al presionar Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const validateForm = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('El nombre es requerido');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (!email.trim()) {
      setEmailError('El email es requerido');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email inválido');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({ name, email });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in duration-300 relative pointer-events-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{modalTitle}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-1"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-green-100">
            {isEditMode 
              ? <Edit2 className="w-6 h-6 text-green-600" />
              : <UserPlus className="w-6 h-6 text-green-600" />
            }
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 ${
                  nameError ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ingrese el nombre"
                disabled={isLoading}
              />
              {nameError && <p className="mt-1 text-xs text-red-600">{nameError}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 ${
                  emailError ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ingrese el email"
                disabled={isLoading}
              />
              {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditMode ? 'Actualizando...' : 'Guardando...'}
                  </>
                ) : (
                  isEditMode ? 'Actualizar' : 'Guardar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 