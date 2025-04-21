"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/shared/components/loader';

// Import the component with noSSR to avoid hydration issues with browser extensions
const CustomersList = dynamic(
  () => import('@/modules/customers/views/customers-list').then((mod) => mod.CustomersList),
  { ssr: false }
);

export default function CustomersPage() {
  return (
    <Suspense fallback={<div className="min-h-[500px]"><Loader text="Cargando clientes..." /></div>}>
      <CustomersList />
    </Suspense>
  );
} 