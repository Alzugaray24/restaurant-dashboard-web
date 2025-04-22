'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Order } from '@/modules/orders/types';
import { useOrders } from '@/modules/orders/hooks';
import Loader from '@/shared/components/loader';
import { SectionCard } from '@/shared/components/cards';
import { BackButton, PDFButton, PrintButton } from '@/shared/components/buttons';
import { ClientInfo, OrderInfo, OrderItemsList, OrderCard } from '@/shared/components/data-display';

interface OrderDetailProps {
  orderId: number;
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  const router = useRouter();
  const { orders, loading, error } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [clientOrders, setClientOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && orders.length > 0) {
      const foundOrder = orders.find(o => o.id === orderId);
      setOrder(foundOrder || null);
      
      // Find other orders from the same client
      if (foundOrder) {
        const otherOrders = orders.filter(o => 
          o.customer.id === foundOrder.customer.id
        );
        setClientOrders(otherOrders);
      }
    }
  }, [orderId, orders, loading]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('Funcionalidad de descarga de PDF');
  };

  const handleChangeStatus = () => {
    alert('Funcionalidad de cambio de estado');
  };

  const handleEditItems = () => {
    alert('Funcionalidad de edición de ítems');
  };

  const handleViewClientProfile = () => {
    if (order) {
      router.push(`/customers/${order.customer.id}`);
    }
  };

  const handleCreateNewOrder = () => {
    router.push('/orders/new');
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
        <BackButton href="/orders" label="Volver a la lista" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-amber-100 text-amber-800 p-4 rounded-lg mb-6">
          <p>No se encontró la orden con ID {orderId}</p>
        </div>
        <BackButton href="/orders" label="Volver a la lista" />
      </div>
    );
  }

  // Format order date
  const orderDate = new Date(order.orderDate);
  const formattedDate = orderDate.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = orderDate.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Determine if the order is completed
  const isCompleted = order.status === "DELIVERED";
  
  // Map order status to display text
  const statusText = {
    PENDING: "Pendiente",
    PREPARING: "En preparación",
    READY: "Listo",
    DELIVERED: "Completado",
    CANCELLED: "Cancelado"
  }[order.status];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <BackButton href="/orders" className="mr-3" />
          <h1 className="text-xl font-semibold">Orden #{order.id}</h1>
        </div>
        <div className="flex space-x-3">
          <PrintButton onClick={handlePrint} />
          <PDFButton onClick={handleDownloadPDF} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SectionCard 
            title="Detalles de la Orden" 
            status={isCompleted ? "Completed" : statusText}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OrderInfo 
                date={formattedDate}
                time={formattedTime}
                orderId={order.id}
              />
              <ClientInfo 
                name={order.customer.name}
                email={order.customer.email}
              />
            </div>
          </SectionCard>

          <SectionCard 
            title="Items de la Orden"
            headerAction={
              <button 
                onClick={handleEditItems}
                className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-md hover:bg-green-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Editar Items
              </button>
            }
          >
            <OrderItemsList
              items={order.items.map(item => ({
                id: item.id,
                name: item.dish.name,
                price: item.unitPrice,
                quantity: item.quantity,
                imageUrl: `/images/dishes/${item.dish.id}.jpg`,
                note: item.specialNotes || undefined
              }))}
            />
          </SectionCard>
        </div>
        
        <div className="md:col-span-1">
          <SectionCard title="Información del Cliente">
            <ClientInfo 
              name={order.customer.name}
              email={order.customer.email}
              id={order.customer.id}
              type="NORMAL"
              totalOrders={clientOrders.length}
              status="Activo"
            />
          </SectionCard>

          <SectionCard 
            title="Órdenes del Cliente"
            className="mb-6"
          >
            <div className="space-y-2">
              {clientOrders.map(clientOrder => (
                <OrderCard
                  key={clientOrder.id}
                  id={clientOrder.id}
                  date={new Date(clientOrder.orderDate).toLocaleDateString('es-AR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                  time={new Date(clientOrder.orderDate).toLocaleTimeString('es-AR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                  total={clientOrder.total}
                  active={clientOrder.id === orderId}
                />
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={() => router.push(`/customers/${order.customer.id}`)}
                className="text-green-600 text-sm font-medium hover:text-green-800 w-full text-center py-2"
              >
                Ver todas las órdenes del cliente
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Acciones">
            <div className="space-y-3">
              <button
                onClick={handleChangeStatus}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Cambiar estado
              </button>
              <button
                onClick={handleEditItems}
                className="w-full flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar items de la orden
              </button>
              <button
                onClick={handleViewClientProfile}
                className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Ver perfil del cliente
              </button>
              <button
                onClick={handleCreateNewOrder}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear nueva orden
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
} 