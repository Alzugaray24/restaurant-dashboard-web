'use client';

import React, { Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useOrders } from '@/modules/orders/hooks';
import Loader from '@/shared/components/loader';

// Import the component with noSSR to avoid hydration issues with browser extensions
const OrderList = dynamic(
  () => import('@/modules/orders/views').then((mod) => mod.OrderList),
  { ssr: false }
);

// Separate logging component to avoid interference with the main component
function OrdersLogger() {
  const { orders, loading, error } = useOrders();

  useEffect(() => {
    if (!loading) {
      console.log('Orders data from API:', orders);
      if (error) {
        console.error('Error fetching orders:', error);
      }
    }
  }, [orders, loading, error]);

  return null;
}

export default function OrdersPage() {
  return (
    <>
      <OrdersLogger />
      <Suspense fallback={<div className="min-h-[500px]"><Loader text="Cargando órdenes..." /></div>}>
        <OrderList />
      </Suspense>
    </>
  );
} 