'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import the component with noSSR to avoid hydration issues
const DishList = dynamic(
  () => import('@/modules/dishes/views/dishes-list').then((mod) => mod.DishList),
  { ssr: false }
);

export default function DishesPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading dishes...</div>}>
      <DishList />
    </Suspense>
  );
} 