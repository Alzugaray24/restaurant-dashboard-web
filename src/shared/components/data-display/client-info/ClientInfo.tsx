import React from 'react';

interface ClientInfoProps {
  name: string;
  email?: string;
  id?: string | number;
  type?: string;
  totalOrders?: number;
  status?: string;
  className?: string;
}

export const ClientInfo: React.FC<ClientInfoProps> = ({
  name,
  email,
  id,
  type,
  totalOrders,
  status,
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
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>
        <div className="font-medium text-gray-900">{name}</div>
        {email && <div className="text-sm text-gray-500">{email}</div>}
        {(id || type || totalOrders || status) && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
            {id && (
              <div>
                <div className="text-xs text-gray-500">ID del Cliente</div>
                <div className="text-sm text-gray-900 font-medium">#{id}</div>
              </div>
            )}
            {type && (
              <div>
                <div className="text-xs text-gray-500">Tipo</div>
                <div className="text-sm text-gray-900 font-medium">{type}</div>
              </div>
            )}
            {totalOrders !== undefined && (
              <div>
                <div className="text-xs text-gray-500">Total de Órdenes</div>
                <div className="text-sm text-gray-900 font-medium">{totalOrders}</div>
              </div>
            )}
            {status && (
              <div>
                <div className="text-xs text-gray-500">Estado</div>
                <div className="text-sm text-gray-900 font-medium">{status}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 