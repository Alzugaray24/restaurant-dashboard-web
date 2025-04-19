'use client';

import React from 'react';
import Image from 'next/image';

export interface UserAvatarProps {
  /**
   * URL de la imagen
   */
  src: string;
  
  /**
   * Texto alternativo
   */
  alt: string;
  
  /**
   * Nombre del usuario (para iniciales de fallback)
   */
  name?: string;
  
  /**
   * Tamaño del avatar
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Si es circular
   */
  rounded?: boolean;
  
  /**
   * Color de fondo para el fallback (iniciales)
   */
  fallbackBgColor?: string;
  
  /**
   * Color del texto para el fallback (iniciales)
   */
  fallbackTextColor?: string;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente UserAvatar - Avatar para usuarios con soporte para fallback a iniciales
 * 
 * Ejemplo de uso:
 * ```tsx
 * <UserAvatar 
 *   src="/avatars/john.jpg"
 *   alt="John Doe"
 *   name="John Doe"
 * />
 * ```
 */
const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  rounded = true,
  fallbackBgColor = 'bg-gray-200',
  fallbackTextColor = 'text-gray-600',
  className = '',
}) => {
  // Mapeo de tamaños a dimensiones numéricas
  const sizeDimensions = {
    xs: { size: 24, fontSize: 'text-xs' },
    sm: { size: 32, fontSize: 'text-sm' },
    md: { size: 40, fontSize: 'text-sm' },
    lg: { size: 48, fontSize: 'text-base' },
    xl: { size: 64, fontSize: 'text-lg' },
  };
  
  // Obtener dimensiones según el tamaño
  const { size: dimensions, fontSize } = sizeDimensions[size];
  
  // Función para obtener las iniciales del nombre
  const getInitials = (name?: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const roundedClass = rounded ? 'rounded-full' : 'rounded-md';
  
  return (
    <div 
      className={`relative overflow-hidden ${roundedClass} ${className}`}
      style={{ width: dimensions, height: dimensions }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={dimensions}
          height={dimensions}
          className="object-cover w-full h-full"
        />
      ) : (
        <div 
          className={`w-full h-full ${fallbackBgColor} ${fallbackTextColor} ${fontSize} font-medium flex items-center justify-center`}
        >
          {getInitials(name || alt)}
        </div>
      )}
    </div>
  );
};

export default UserAvatar; 