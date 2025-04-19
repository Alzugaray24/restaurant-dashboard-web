import React, { ReactNode } from 'react';

export interface StatCardProps {
  /**
   * Icono a mostrar en la tarjeta
   */
  icon: ReactNode;
  
  /**
   * Valor numérico principal
   */
  value: string | number;
  
  /**
   * Título descriptivo
   */
  title: string;
  
  /**
   * Texto de cambio (opcional, ej: "+12% this week")
   */
  changeText?: string;
  
  /**
   * Tipo de cambio (determina el color)
   */
  changeType?: 'positive' | 'negative' | 'neutral';
  
  /**
   * Color de fondo del icono
   */
  iconBgColor?: string;
  
  /**
   * Color del icono
   */
  iconColor?: string;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente StatCard - Muestra estadísticas con un icono, valor y tendencia
 * 
 * Ejemplo de uso:
 * ```tsx
 * <StatCard 
 *   icon={<Users size={18} />}
 *   value={5}
 *   title="Active Customers"
 *   changeText="+2 this week"
 *   changeType="positive"
 * />
 * ```
 */
const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  title,
  changeText,
  changeType = 'positive',
  iconBgColor = 'bg-green-50', 
  iconColor = 'text-green-600',
  className = '',
}) => {
  // Determinar color para el texto de cambio
  const changeColorClasses = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    neutral: 'text-gray-500',
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow flex items-center gap-4 ${className}`}>
      <div className={`${iconBgColor} p-3 rounded-full`}>
        <div className={`w-8 h-8 ${iconBgColor === 'bg-green-50' ? 'bg-green-100' : 'bg-opacity-20'} rounded-md flex items-center justify-center`}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-xs text-gray-500">{title}</p>
        {changeText && (
          <p className={`text-xs ${changeColorClasses[changeType]}`}>
            {changeText}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard; 