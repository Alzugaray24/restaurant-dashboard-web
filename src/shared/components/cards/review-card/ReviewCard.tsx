import React, { ReactNode } from 'react';

export interface ReviewCardProps {
  /**
   * URL de la imagen de avatar
   */
  avatarSrc: string;
  
  /**
   * Nombre del usuario
   */
  username: string;
  
  /**
   * Tiempo transcurrido desde la reseña (ej: "2 days ago")
   */
  timeAgo: string;
  
  /**
   * Texto de la reseña
   */
  reviewText: string;
  
  /**
   * Calificación (de 1 a 5)
   */
  rating: number;
  
  /**
   * URL de la imagen del producto/comida
   */
  productImageSrc: string;
  
  /**
   * Componente de icono de estrella
   */
  starIcon: ReactNode;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  avatarSrc,
  username,
  timeAgo,
  reviewText,
  rating,
  productImageSrc,
  starIcon,
  className = '',
}) => {
  // Función para renderizar estrellas basadas en la calificación
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Estrella llena
        stars.push(
          <div key={i} className="text-yellow-400 fill-yellow-400">
            {starIcon}
          </div>
        );
      } else {
        // Estrella vacía
        stars.push(
          <div key={i} className="text-gray-200">
            {starIcon}
          </div>
        );
      }
    }
    return stars;
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-5 flex justify-between ${className}`}>
      <div className="flex flex-col max-w-[60%]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarSrc} alt={username} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-semibold">{username}</p>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          {reviewText}
        </p>
        <div className="flex items-center mt-auto">
          <div className="flex">
            {renderStars()}
          </div>
          <span className="ml-2 font-semibold">{rating}.0</span>
        </div>
      </div>
      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImageSrc}
          alt="Food dish"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ReviewCard; 