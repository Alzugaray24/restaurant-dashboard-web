'use client';

import React from 'react';
import { DashboardLayout } from '../modules/dashboard/layout';
import { DashboardContent } from '../modules/dashboard/views';

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}
