import React from 'react';

export interface AvatarProps {
  /**
   * URL de la imagen
   */
  src: string;
  
  /**
   * Texto alternativo
   */
  alt: string;
  
  /**
   * Tamaño del avatar
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Borde (opcional)
   */
  border?: boolean;
  
  /**
   * Color del borde
   */
  borderColor?: string;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  border = false,
  borderColor = 'border-white',
  className = '',
}) => {
  // Mapeo de tamaños a clases
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  // Clases base
  const baseClasses = "rounded-full overflow-hidden";
  
  // Clases de borde
  const borderClasses = border ? `border-2 ${borderColor}` : '';
  
  return (
    <div className={`${baseClasses} ${sizeClasses[size]} ${borderClasses} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar; 