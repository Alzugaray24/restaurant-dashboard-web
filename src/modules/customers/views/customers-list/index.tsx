'use client';

import React, { useState } from 'react';
import { SearchInput } from '@/shared/components/forms';
import { StatCard } from '@/shared/components/cards';
import { StatusBadge } from '@/shared/components/data-display';
import { UserAvatar } from '@/shared/components/data-display';
import { ActionButtons } from '@/shared/components/buttons';
import { Pagination } from '@/shared/components/navigation';
import { Eye, Edit, Trash2, Users, ShoppingBag } from 'lucide-react';

// Define el tipo de estado
type CustomerStatus = 'active' | 'inactive';

// Datos de ejemplo para los clientes
const customers = [
  {
    id: 1,
    name: "Jons Sena",
    email: "jons.sena@example.com",
    phone: "+1 234 567 890",
    orders: 12,
    status: "active" as CustomerStatus,
    lastOrder: "2023-04-15",
    avatar: "/avatars/diverse-avatars.png",
  },
  {
    id: 2,
    name: "Sofia Martinez",
    email: "sofia.martinez@example.com",
    phone: "+1 345 678 901",
    orders: 8,
    status: "active" as CustomerStatus,
    lastOrder: "2023-04-12",
    avatar: "/avatars/diverse-woman-avatars.png",
  },
  {
    id: 3,
    name: "Anandreansyah",
    email: "anandreansyah@example.com",
    phone: "+1 456 789 012",
    orders: 15,
    status: "active" as CustomerStatus,
    lastOrder: "2023-04-18",
    avatar: "/avatars/diverse-avatars.png",
  },
  {
    id: 4,
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 567 890 123",
    orders: 5,
    status: "inactive" as CustomerStatus,
    lastOrder: "2023-03-25",
    avatar: "/avatars/diverse-woman-avatars.png",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 678 901 234",
    orders: 10,
    status: "active" as CustomerStatus,
    lastOrder: "2023-04-10",
    avatar: "/avatars/diverse-avatars.png",
  },
  {
    id: 6,
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
    phone: "+1 789 012 345",
    orders: 3,
    status: "active" as CustomerStatus,
    lastOrder: "2023-04-05",
    avatar: "/avatars/diverse-woman-avatars.png",
  },
];

export function CustomersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estadísticas para las tarjetas
  const stats = {
    totalCustomers: { value: 6, change: '+3 this week' },
    activeCustomers: { value: 5, change: '+2 this week' },
    inactiveCustomers: { value: 1, change: '+1 this week', changeType: 'positive' }, // En rojo en la imagen
    totalOrders: { value: 53, change: '+8 this week' },
  };

  // Función para manejar acciones de los botones
  const handleAction = (action: string, id: number) => {
    console.log(`${action} customer with id: ${id}`);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header con búsqueda y botón de agregar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <SearchInput 
            placeholder="Search customers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-auto"
          />
          
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shrink-0"
          >
            Add Customer
          </button>
        </div>
      </div>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Users size={18} className="text-green-600" />}
          value={stats.totalCustomers.value}
          title="Total Customers"
          changeText={stats.totalCustomers.change}
          changeType="positive"
        />
        
        <StatCard
          icon={<Users size={18} className="text-green-600" />}
          value={stats.activeCustomers.value}
          title="Active Customers"
          changeText={stats.activeCustomers.change}
          changeType="positive"
        />
        
        <StatCard
          icon={<Users size={18} className="text-green-600" />}
          value={stats.inactiveCustomers.value}
          title="Inactive Customers"
          changeText={stats.inactiveCustomers.change}
          changeType="negative"
        />
        
        <StatCard
          icon={<ShoppingBag size={18} className="text-green-600" />}
          value={stats.totalOrders.value}
          title="Total Orders"
          changeText={stats.totalOrders.change}
          changeType="positive"
        />
      </div>
      
      {/* Tabla de clientes */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="overflow-x-auto">
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
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserAvatar
                        src={customer.avatar}
                        alt={customer.name}
                        name={customer.name}
                        size="md"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">ID: #{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.orders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      status={customer.status} 
                      text={customer.status === 'active' ? 'Active' : 'Inactive'} 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <ActionButtons
                      buttons={[
                        { 
                          icon: <Eye size={16} />, 
                          tooltip: 'View', 
                          color: 'info', 
                          onClick: () => handleAction('view', customer.id) 
                        },
                        { 
                          icon: <Edit size={16} />, 
                          tooltip: 'Edit', 
                          color: 'success', 
                          onClick: () => handleAction('edit', customer.id) 
                        },
                        { 
                          icon: <Trash2 size={16} />, 
                          tooltip: 'Delete', 
                          color: 'danger', 
                          onClick: () => handleAction('delete', customer.id) 
                        }
                      ]}
                      align="right"
                      size="sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        <div className="px-6 py-3 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing 1 to 6 of 6 results
          </div>
          <Pagination
            totalItems={60}
            itemsPerPage={6}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomersList; 