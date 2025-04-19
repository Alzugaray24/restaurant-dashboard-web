'use client';

import React from 'react';
import { StatCard, ChartCard } from "../../../../shared/components/cards";

// Iconos básicos para los componentes
const cartIcon = <span>🛒</span>;
const calendarIcon = <span>📅</span>;
const downloadIcon = <span>📥</span>;

/**
 * Componente que muestra el contenido principal del dashboard
 */
const DashboardContent: React.FC = () => {
  return (
    <div className="p-6">
      {/* Header del dashboard */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Dashboard</h2>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border rounded-lg p-2 gap-2">
            <div className="text-[var(--color-secondary)]">
              {calendarIcon}
            </div>
            <div>
              <p className="text-xs font-semibold">Filter Periode</p>
              <p className="text-xs text-secondary">23 Jan 2023 - 27 Jan 2023</p>
            </div>
            <div className="text-gray-400">
              <span>◀</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          icon={cartIcon}
          value="75"
          title="Total Orders"
          changeText="+12% this week"
          changeType="positive"
        />
        <StatCard 
          icon={cartIcon}
          value="357"
          title="Total Delivered"
          changeText="+12% this week"
          changeType="positive"
        />
        <StatCard 
          icon={cartIcon}
          value="65"
          title="Total Canceled"
          changeText="+2% this week"
          changeType="negative"
        />
        <StatCard 
          icon={cartIcon}
          value="$128"
          title="Total Revenue"
          changeText="+12% this week"
          changeType="positive"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Pie Chart">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[16px] border-gray-100"></div>
                <div className="absolute inset-0 rounded-full border-[16px] border-red-400 border-l-transparent border-t-transparent border-r-transparent" style={{ transform: "rotate(45deg)" }}></div>
                <span className="font-bold">81%</span>
              </div>
              <p className="text-xs mt-2">Total Order</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[16px] border-gray-100"></div>
                <div className="absolute inset-0 rounded-full border-[16px] border-[var(--color-primary)] border-l-transparent border-t-transparent border-b-transparent" style={{ transform: "rotate(135deg)" }}></div>
                <span className="font-bold">22%</span>
              </div>
              <p className="text-xs mt-2">Customer Growth</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[16px] border-gray-100"></div>
                <div className="absolute inset-0 rounded-full border-[16px] border-blue-400 border-l-transparent border-b-transparent" style={{ transform: "rotate(225deg)" }}></div>
                <span className="font-bold">82%</span>
              </div>
              <p className="text-xs mt-2">Total Revenue</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard 
          title="Chart Order" 
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          headerActions={
            <button className="flex items-center gap-2 border border-blue-100 text-[var(--color-secondary)] px-3 py-1 rounded-lg text-xs">
              {downloadIcon}
              Save Report
            </button>
          }
        >
          <div className="flex flex-col h-full">
            <div className="mb-3">
              <p className="text-xl font-semibold text-gray-700">$5K Order</p>
            </div>
            
            <div className="flex-grow relative">
              {/* Línea azul del gráfico */}
              <div className="absolute inset-0 flex items-center">
                <svg viewBox="0 0 600 100" className="w-full h-full">
                  <path 
                    d="M0,50 C50,30 100,60 150,50 C200,40 250,70 300,50 C350,30 400,60 450,20 C500,40 550,50 600,40" 
                    fill="none" 
                    stroke="#4987F3" 
                    strokeWidth="3"
                  />
                  <circle cx="75" cy="50" r="5" fill="#4987F3" />
                  <circle cx="190" cy="50" r="5" fill="#4987F3" />
                  <circle cx="370" cy="40" r="5" fill="#4987F3" />
                  <circle cx="450" cy="20" r="5" fill="#4987F3" />
                </svg>
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500 pt-4">
              <div>Sunday</div>
              <div>Monday</div>
              <div>Tuesday</div>
              <div>Wednesday</div>
              <div>Thursday</div>
              <div>Friday</div>
              <div>Saturday</div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Customer Reviews */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <ChartCard 
          title="Customer Review"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          headerActions={
            <div className="flex gap-2">
              <button className="border rounded-full w-8 h-8 flex items-center justify-center text-gray-400">
                <span>←</span>
              </button>
              <button className="border rounded-full w-8 h-8 flex items-center justify-center text-gray-400">
                <span>→</span>
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            {/* Review 1 */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center text-xs">
                    👨‍🍳
                  </div>
                  <div>
                    <h4 className="font-medium">Jons Sena</h4>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="rounded-full overflow-hidden w-16 h-16">
                  <div className="bg-orange-200 w-full h-full flex items-center justify-center">
                    🍕
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry&apos;s standard dummy text
              </p>
              
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-gray-300">★</span>
                </div>
                <span className="ml-2 font-bold">4.5</span>
              </div>
            </div>
            
            {/* Review 2 */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center text-xs">
                    👩‍🍳
                  </div>
                  <div>
                    <h4 className="font-medium">Sofia</h4>
                    <p className="text-xs text-gray-500">4 days ago</p>
                  </div>
                </div>
                <div className="rounded-full overflow-hidden w-16 h-16">
                  <div className="bg-amber-200 w-full h-full flex items-center justify-center">
                    🍲
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry&apos;s standard dummy text
              </p>
              
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span className="ml-2 font-bold">5.0</span>
              </div>
            </div>
            
            {/* Review 3 */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center text-xs">
                    👨‍🍳
                  </div>
                  <div>
                    <h4 className="font-medium">Anandreansyah</h4>
                    <p className="text-xs text-gray-500">4 days ago</p>
                  </div>
                </div>
                <div className="rounded-full overflow-hidden w-16 h-16">
                  <div className="bg-red-200 w-full h-full flex items-center justify-center">
                    🍝
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry&apos;s standard dummy text
              </p>
              
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-gray-300">★</span>
                </div>
                <span className="ml-2 font-bold">4.5</span>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default DashboardContent; 