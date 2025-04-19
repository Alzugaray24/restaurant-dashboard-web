import React, { ReactNode } from 'react';

export interface ChartCardProps {
  /**
   * Título del gráfico
   */
  title: string;
  
  /**
   * Subtítulo o descripción opcional
   */
  description?: string;
  
  /**
   * Contenido del gráfico (Chart.js, D3, etc.)
   */
  children: ReactNode;
  
  /**
   * Componentes adicionales para la barra de título (filtros, botones, etc.)
   */
  headerActions?: ReactNode;
  
  /**
   * Altura del contenedor del gráfico
   */
  chartHeight?: string;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  children,
  headerActions,
  chartHeight = "h-48",
  className = '',
}) => {
  return (
    <div className={`bg-white p-4 rounded-lg ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
        {headerActions && (
          <div className="flex items-center gap-2">
            {headerActions}
          </div>
        )}
      </div>

      <div className={`${chartHeight} mt-4`}>
        {children}
      </div>
    </div>
  );
};

export default ChartCard; 