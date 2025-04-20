"use client";

import React, { useState } from 'react';
import { useCustomers } from '@/modules/customers/hooks/useCustomers';
import { SearchInput } from '@/shared/components/forms/search-input';
import { PrimaryButton } from '@/shared/components/buttons/primary-button';
import { StatCard } from '@/shared/components/cards/stat-card';
import { ActionButtons } from '@/shared/components/buttons/action-buttons';
import { ConfirmationModal } from '@/shared/components/modals/confirmation-modal';
import { Toast } from '@/shared/components/alerts/toast';
import { ToastContainer } from '@/shared/components/alerts/toast-container';
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

// Número de clientes a mostrar por página
const CUSTOMERS_PER_PAGE = 6;

export default function CustomersPage() {
  const { customers, loading, error, deleteCustomer } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<{ id: number, name: string } | null>(null);
  const [toast, setToast] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });
  
  // Filtrar clientes por término de búsqueda
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el total de páginas
  const totalPages = Math.ceil(filteredCustomers.length / CUSTOMERS_PER_PAGE);
  
  // Obtener clientes para la página actual
  const indexOfLastCustomer = currentPage * CUSTOMERS_PER_PAGE;
  const indexOfFirstCustomer = indexOfLastCustomer - CUSTOMERS_PER_PAGE;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  
  // Función para cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Calcular estadísticas
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.type === 'NORMAL').length;
  const inactiveCustomers = totalCustomers - activeCustomers;
  
  // Datos de pedidos (por ahora solo mostramos cantidad estimada)
  const totalOrders = totalCustomers > 0 ? totalCustomers * 2 : 0; // Estimación simple

  // Función para mostrar un toast
  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ show: true, type, message });
  };

  // Función para abrir el modal de eliminación
  const handleDeleteClick = (customer: { id: number, name: string }) => {
    setCustomerToDelete(customer);
    setDeleteModalOpen(true);
  };

  // Función para confirmar la eliminación
  const confirmDelete = async () => {
    if (customerToDelete) {
      const success = await deleteCustomer(customerToDelete.id);
      setDeleteModalOpen(false);
      
      if (success) {
        showToast('success', `Cliente "${customerToDelete.name}" eliminado exitosamente`);
      } else {
        showToast('error', `Error al eliminar el cliente "${customerToDelete.name}"`);
      }
      
      setCustomerToDelete(null);
    }
  };

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
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-gray-500">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{customer.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.type === 'NORMAL' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {customer.type}
                    </span>
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
                          onClick: () => handleDeleteClick({ id: customer.id, name: customer.name }) 
                        }
                      ]}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Paginación */}
      {filteredCustomers.length > 0 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstCustomer + 1}</span> to <span className="font-medium">
              {Math.min(indexOfLastCustomer, filteredCustomers.length)}
            </span> of <span className="font-medium">{filteredCustomers.length}</span> results
          </div>
          
          <div className="flex items-center">
            <nav className="relative z-0 inline-flex -space-x-px">
              <button 
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {/* Renderizar botones de página */}
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                // Mostrar las primeras 3 páginas, la página actual, y la última página
                let pageNum: number;
                if (totalPages <= 5) {
                  // Si hay 5 o menos páginas, mostrar todas
                  pageNum = index + 1;
                } else if (currentPage <= 3) {
                  // Si estamos en las primeras 3 páginas
                  if (index < 4) {
                    pageNum = index + 1;
                  } else {
                    pageNum = totalPages;
                  }
                } else if (currentPage >= totalPages - 2) {
                  // Si estamos en las últimas 3 páginas
                  if (index === 0) {
                    pageNum = 1;
                  } else {
                    pageNum = totalPages - 4 + index;
                  }
                } else {
                  // Si estamos en el medio
                  if (index === 0) {
                    pageNum = 1;
                  } else if (index === 4) {
                    pageNum = totalPages;
                  } else {
                    pageNum = currentPage + index - 2;
                  }
                }
                
                // Si necesitamos mostrar puntos suspensivos en lugar de un número
                if (index > 0 && index < 4 && 
                    ((pageNum > 2 && pageNum < totalPages - 1 && pageNum !== currentPage - 1 && 
                      pageNum !== currentPage && pageNum !== currentPage + 1))) {
                  return (
                    <span key={`ellipsis-${index}`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                  );
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === pageNum
                        ? 'border-green-500 bg-green-50 text-green-600'
                        : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        </div>
      )}
      
      {/* Modal de confirmación para eliminar */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setCustomerToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Confirmar eliminación"
        message="¿Está seguro que desea eliminar a este cliente?"
        highlightedItem={customerToDelete?.name}
        type="delete"
      />
      
      {/* Toast Container */}
      <ToastContainer position="top-right">
        <Toast
          type={toast.type}
          message={toast.message}
          isVisible={toast.show}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
          duration={4000}
        />
      </ToastContainer>
    </div>
  );
} 