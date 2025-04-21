"use client";

import { FormEvent, useRef, useEffect, useState } from 'react';
import { X, UtensilsCrossed, Edit2 } from 'lucide-react';

export interface DishFormModalProps {
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
  onSubmit: (data: { name: string; price: number; type: string }) => void;
  
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
    price: number;
    type: string;
  };
}

/**
 * Componente DishFormModal - Modal para agregar o editar platos
 * 
 * Ejemplo de uso:
 * ```tsx
 * <DishFormModal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   onSubmit={handleSubmit}
 * />
 * ```
 */
export default function DishFormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  isLoading = false,
  isEditMode = false,
  initialData = { name: '', price: 0, type: 'COMMON' }
}: DishFormModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const typeSelectRef = useRef<HTMLSelectElement>(null);
  
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [typeError, setTypeError] = useState('');

  // Define el título basado en el modo
  const modalTitle = title || (isEditMode ? "Editar Plato" : "Agregar Plato");

  // Initialize input values when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (nameInputRef.current) {
        nameInputRef.current.value = isEditMode ? initialData.name : '';
      }
      if (priceInputRef.current) {
        priceInputRef.current.value = isEditMode ? initialData.price.toString() : '0';
      }
      if (typeSelectRef.current) {
        typeSelectRef.current.value = isEditMode ? initialData.type : 'COMMON';
      }
      setNameError('');
      setPriceError('');
      setTypeError('');
      
      // Focus the name input after a short delay
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
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
    const nameValue = nameInputRef.current?.value || '';
    const priceValue = priceInputRef.current?.value || '';
    const typeValue = typeSelectRef.current?.value || '';
    
    if (!nameValue.trim()) {
      setNameError('El nombre es requerido');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (!priceValue.trim()) {
      setPriceError('El precio es requerido');
      isValid = false;
    } else if (isNaN(Number(priceValue)) || Number(priceValue) < 0) {
      setPriceError('El precio debe ser un número positivo');
      isValid = false;
    } else {
      setPriceError('');
    }
    
    if (!typeValue) {
      setTypeError('El tipo de plato es requerido');
      isValid = false;
    } else {
      setTypeError('');
    }
    
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({ 
        name: nameInputRef.current?.value || '', 
        price: Number(priceInputRef.current?.value || 0) * 100,
        type: typeSelectRef.current?.value || 'COMMON'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden"
        style={{ position: 'relative', zIndex: 9999 }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{modalTitle}</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-amber-100">
            {isEditMode 
              ? <Edit2 className="w-6 h-6 text-amber-600" />
              : <UtensilsCrossed className="w-6 h-6 text-amber-600" />
            }
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="dish-name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                ref={nameInputRef}
                id="dish-name"
                type="text"
                defaultValue={isEditMode ? initialData.name : ''}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
                  nameError ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ingrese el nombre del plato"
                disabled={isLoading}
                autoComplete="off"
              />
              {nameError && <p className="mt-1 text-xs text-red-600">{nameError}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="dish-price" className="block text-sm font-medium text-gray-700 mb-1">
                Precio (en pesos)
              </label>
              <input
                ref={priceInputRef}
                id="dish-price"
                type="number"
                min="0"
                defaultValue={isEditMode ? (initialData.price / 100).toFixed(2) : 0}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
                  priceError ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ingrese el precio en pesos"
                disabled={isLoading}
                autoComplete="off"
                step="0.01"
              />
              <p className="mt-1 text-xs text-gray-500">Ingrese el precio en pesos (ejemplo: 20.50)</p>
              {priceError && <p className="mt-1 text-xs text-red-600">{priceError}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="dish-type" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de plato
              </label>
              <select
                ref={typeSelectRef}
                id="dish-type"
                defaultValue={isEditMode ? initialData.type : 'COMMON'}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
                  typeError ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isLoading}
              >
                <option value="COMMON">Común</option>
                <option value="POPULAR">Popular</option>
              </select>
              {typeError && <p className="mt-1 text-xs text-red-600">{typeError}</p>}
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg focus:outline-none ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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