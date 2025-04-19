"use client";

import React, { useState } from 'react';
import { useCustomers } from '@/modules/customers/hooks/useCustomers';
import { SearchInput } from '@/shared/components/forms/search-input';
import { PrimaryButton } from '@/shared/components/buttons/primary-button';
import { StatCard } from '@/shared/components/cards/stat-card';
import { StatusBadge } from '@/shared/components/data-display/status-badge';
import { ActionButtons } from '@/shared/components/buttons/action-buttons';
import { 
  Users, 
  UserCheck, 
  UserX,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash
} from 'lucide-react';

export default function CustomersPage() {
  const { customers, loading, error } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar clientes por término de búsqueda
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calcular estadísticas
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.type === 'NORMAL').length;
  const inactiveCustomers = totalCustomers - activeCustomers;
  
  // Generar datos de pedidos aleatorios para el ejemplo
  const totalOrders = customers.reduce((sum) => sum + Math.floor(Math.random() * 5) + 1, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Encabezado y controles */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        
        <div className="flex items-center gap-4">
          <SearchInput 
            placeholder="Search customers..." 
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          
          <PrimaryButton onClick={() => console.log('Add customer clicked')}>
            Add Customer
          </PrimaryButton>
        </div>
      </div>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon={<Users size={18} />}
          value={totalCustomers}
          title="Total Customers"
          changeText={`+3 this week`}
          changeType="positive"
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        
        <StatCard 
          icon={<UserCheck size={18} />}
          value={activeCustomers}
          title="Active Customers"
          changeText={`+2 this week`}
          changeType="positive"
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        
        <StatCard 
          icon={<UserX size={18} />}
          value={inactiveCustomers}
          title="Inactive Customers"
          changeText={`+1 this week`}
          changeType="neutral"
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        
        <StatCard 
          icon={<ShoppingBag size={18} />}
          value={totalOrders}
          title="Total Orders"
          changeText={`+8 this week`}
          changeType="positive"
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>
      
      {loading && <p className="text-center py-4">Loading customers...</p>}
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          <p>Error: {error}</p>
          <p>Using mock data instead.</p>
        </div>
      )}
      
      {/* Tabla de clientes */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Order
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => {
                // Generar datos de ejemplo para el cliente
                const ordersCount = Math.floor(Math.random() * 15) + 1;
                const isActive = Math.random() > 0.2; // 80% probabilidad de estar activo
                const lastOrderDate = new Date();
                lastOrderDate.setDate(lastOrderDate.getDate() - Math.floor(Math.random() * 30));
                const formattedDate = `${lastOrderDate.getFullYear()}-${String(lastOrderDate.getMonth() + 1).padStart(2, '0')}-${String(lastOrderDate.getDate()).padStart(2, '0')}`;
                
                return (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-gray-500">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">ID: #{customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.name.toLowerCase().replace(/\s+/g, '.')}@example.com</div>
                      <div className="text-sm text-gray-500">+1 {Math.floor(Math.random() * 900) + 100} {Math.floor(Math.random() * 900) + 100} {Math.floor(Math.random() * 900) + 100}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ordersCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={isActive ? 'active' : 'inactive'} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formattedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionButtons 
                        buttons={[
                          { 
                            icon: <Eye size={16} />, 
                            tooltip: 'View', 
                            color: 'info', 
                            onClick: () => console.log(`View customer ${customer.id}`) 
                          },
                          { 
                            icon: <Edit size={16} />, 
                            tooltip: 'Edit', 
                            color: 'success', 
                            onClick: () => console.log(`Edit customer ${customer.id}`) 
                          },
                          { 
                            icon: <Trash size={16} />, 
                            tooltip: 'Delete', 
                            color: 'danger', 
                            onClick: () => console.log(`Delete customer ${customer.id}`) 
                          }
                        ]}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Paginación */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCustomers.length}</span> of <span className="font-medium">{filteredCustomers.length}</span> results
        </div>
        
        <div className="flex items-center">
          <nav className="relative z-0 inline-flex -space-x-px">
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-green-500 bg-green-50 text-sm font-medium text-green-600">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              2
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              3
            </button>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              8
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              9
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              10
            </button>
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
} 