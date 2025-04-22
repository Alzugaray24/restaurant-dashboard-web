import React from 'react';

interface OrderInfoProps {
  date: string;
  time?: string;
  orderId?: string | number;
  className?: string;
}

export const OrderInfo: React.FC<OrderInfoProps> = ({
  date,
  time,
  orderId,
  className = '',
}) => {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="rounded-full bg-gray-100 p-2 mr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>
        <div className="font-medium text-gray-900">Fecha de la Orden</div>
        <div className="text-sm text-gray-500">
          {date} {time && `- ${time}`}
        </div>
        {orderId && (
          <div className="mt-3">
            <div className="text-xs text-gray-500">ID de la Orden</div>
            <div className="text-sm text-gray-900 font-medium">#{orderId}</div>
          </div>
        )}
      </div>
    </div>
  );
}; 