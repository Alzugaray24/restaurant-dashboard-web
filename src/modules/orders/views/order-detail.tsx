'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Order } from '@/modules/orders/types';
import { useOrders } from '@/modules/orders/hooks';
import Loader from '@/shared/components/loader';

interface OrderDetailProps {
  orderId: number;
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  const router = useRouter();
  const { orders, loading, error } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!loading && orders.length > 0) {
      const foundOrder = orders.find(o => o.id === orderId);
      setOrder(foundOrder || null);
    }
  }, [orderId, orders, loading]);

  const handleBack = () => {
    router.push('/orders');
  };

  if (loading) {
    return <Loader text="Cargando detalles de la orden..." />;
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          <p>Error: {error}</p>
        </div>
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-amber-100 text-amber-800 p-4 rounded-lg mb-6">
          <p>No se encontró la orden con ID {orderId}</p>
        </div>
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detalles de la Orden #{order.id}</h1>
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Volver a la lista
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-lg mb-4">Esta es la página de detalles de la orden {order.id}</p>
        <p>Cliente: {order.customer.name} ({order.customer.email})</p>
        <p>Estado: {order.status}</p>
        <p>Fecha: {new Date(order.orderDate).toLocaleDateString()}</p>
        <p>Total: {new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS'
        }).format(order.total)}</p>
      </div>
    </div>
  );
} 