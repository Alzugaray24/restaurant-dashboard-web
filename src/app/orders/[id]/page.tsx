'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/shared/components/loader';

// Importar el componente de forma dinámica para evitar problemas de hidratación
const OrderDetail = dynamic(
  () => import('@/modules/orders/views').then(mod => ({ default: mod.OrderDetail })),
  { ssr: false }
);

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = parseInt(params.id, 10);

  // Validar que el ID sea un número válido
  if (isNaN(orderId)) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          <p>ID de orden inválido: {params.id}</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-[500px]"><Loader text="Cargando detalles..." /></div>}>
      <OrderDetail orderId={orderId} />
    </Suspense>
  );
} 