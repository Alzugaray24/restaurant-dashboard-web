import React from 'react';
import Image from 'next/image';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  note?: string;
}

interface OrderItemsListProps {
  items: OrderItem[];
  onEdit?: () => void;
}

export const OrderItemsList: React.FC<OrderItemsListProps> = ({ items, onEdit }) => {
  // Calculate subtotal for an item
  const calculateSubtotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Items de la Orden</h3>
        {onEdit && (
          <button 
            onClick={onEdit}
            className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-md hover:bg-green-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Editar Items
          </button>
        )}
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plato
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio Unitario
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cantidad
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {item.imageUrl && (
                    <div className="flex-shrink-0 h-10 w-10 mr-3">
                      <Image
                        className="h-10 w-10 rounded-md object-cover"
                        src={item.imageUrl}
                        alt={item.name}
                        width={40}
                        height={40}
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    {item.note && <div className="text-xs text-gray-500">Nota: {item.note}</div>}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                $ {item.price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.quantity}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                $ {calculateSubtotal(item.price, item.quantity).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
              Total:
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-base font-semibold text-gray-900 text-right">
              $ {items.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}; 