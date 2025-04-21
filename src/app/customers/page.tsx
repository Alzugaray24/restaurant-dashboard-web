"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import the component with noSSR to avoid hydration issues with browser extensions
const CustomersList = dynamic(
  () => import('@/modules/customers/views/customers-list').then((mod) => mod.CustomersList),
  { ssr: false }
);

export default function CustomersPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading customers...</div>}>
      <CustomersList />
    </Suspense>
  );
} 