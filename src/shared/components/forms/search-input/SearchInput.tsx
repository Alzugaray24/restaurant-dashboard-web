'use client';

import React, { ChangeEvent, ReactNode } from 'react';
import { Search } from 'lucide-react';

export interface SearchInputProps {
  /**
   * Placeholder del input
   */
  placeholder?: string;
  
  /**
   * Valor actual del input
   */
  value?: string;
  
  /**
   * Función que se ejecuta al cambiar el valor
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Icono customizado (opcional)
   */
  icon?: ReactNode;
  
  /**
   * Tamaño del input
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Si está deshabilitado
   */
  disabled?: boolean;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente SearchInput - Input de búsqueda con icono
 * 
 * Ejemplo de uso:
 * ```tsx
 * <SearchInput 
 *   placeholder="Buscar clientes..."
 *   onChange={(e) => console.log(e.target.value)}
 * />
 * ```
 */
const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Buscar...',
  value,
  onChange,
  icon,
  size = 'md',
  disabled = false,
  className = '',
}) => {
  // Mapeo de tamaños a clases
  const sizeClasses = {
    sm: 'py-1 pl-8 pr-3 text-sm',
    md: 'py-2 pl-10 pr-4 text-sm',
    lg: 'py-3 pl-12 pr-4 text-base',
  };
  
  // Mapeo de tamaños a clases para el icono
  const iconSizeClasses = {
    sm: 'left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4',
    md: 'left-3 top-1/2 transform -translate-y-1/2 h-5 w-5',
    lg: 'left-4 top-1/2 transform -translate-y-1/2 h-6 w-6',
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`absolute ${iconSizeClasses[size]} text-gray-400 pointer-events-none`}>
        {icon || <Search />}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${sizeClasses[size]} w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
      />
    </div>
  );
};

export default SearchInput; 