import React from 'react';
import Link from 'next/link';

interface OrderCardProps {
  id: number;
  date: string;
  time: string;
  total: number;
  active?: boolean;
  onClick?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  id,
  date,
  time,
  total,
  active = false,
  onClick,
}) => {
  const formattedTotal = total.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Link href={`/orders/${id}`}>
      <div 
        className={`p-3 border rounded-lg mb-2 cursor-pointer transition-colors ${
          active 
            ? 'bg-green-50 border-green-200' 
            : 'bg-white border-gray-200 hover:bg-gray-50'
        }`}
        onClick={onClick}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium">Orden #{id}</div>
            <div className="text-sm text-gray-500">
              {date} - {time}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-green-600">
              $ {formattedTotal}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}; 