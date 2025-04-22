import React from 'react';

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  currency = '$',
  className = '',
  size = 'md',
  color = 'text-gray-900',
}) => {
  const formattedAmount = amount.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg font-semibold',
  };

  return (
    <span className={`${sizeClasses[size]} ${color} ${className}`}>
      {currency} {formattedAmount}
    </span>
  );
}; 