"use client";

import React, { useState } from 'react';
import { useCustomers } from '@/modules/customers/hooks/useCustomers';
import { SearchInput } from '@/shared/components/forms/search-input';
import { PrimaryButton } from '@/shared/components/buttons/primary-button';
import { StatCard } from '@/shared/components/cards/stat-card';
import { ActionButtons } from '@/shared/components/buttons/action-buttons';
import { ConfirmationModal } from '@/shared/components/modals/confirmation-modal';
import { CustomerFormModal } from '@/shared/components/modals/customer-form-modal';
import { Toast } from '@/shared/components/alerts/toast';
import { ToastContainer } from '@/shared/components/alerts/toast-container';
import { 
  Users, 
  UserCheck, 
  UserX,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Edit,
  Power
} from 'lucide-react';
import { CustomerData } from '@/modules/customers/api/customerApi';

// Número de clientes a mostrar por página
const CUSTOMERS_PER_PAGE = parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || '6', 10);

export default function CustomersPage() {
  const { 
    customers, 
    loading, 
    error, 
    createCustomer, 
    updateCustomer,
    updateCustomerStatus,
    isCreating,
    isUpdating,
  } = useCustomers();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<{ id: number, name: string, active: boolean } | null>(null);
  const [customerToEdit, setCustomerToEdit] = useState<{ id: number, name: string, email: string, type: string } | null>(null);
  const [toast, setToast] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });
  
  // Filtrar clientes por término de búsqueda y estado activo
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (showActiveOnly ? c.active : !c.active)
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
  const activeCustomers = customers.filter(c => c.active).length;
  const frecuentCustomers = customers.filter(c => c.type === 'FRECUENT').length;
  
  // Calcular el total de órdenes para todos los clientes
  const totalOrders = customers.reduce((sum, customer) => 
    sum + (customer.orders?.length || 0), 0);

  // Función para mostrar un toast
  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ show: true, type, message });
  };

  // Función para abrir el modal de eliminación (ahora cambia estado)
  const handleStatusChangeClick = (customer: { id: number, name: string, active: boolean }) => {
    setCustomerToDelete({...customer});
    setDeleteModalOpen(true);
  };

  // Función para abrir el modal de añadir cliente
  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  // Función para abrir el modal de edición
  const handleEditClick = (customer: { id: number, name: string, email: string, type: string }) => {
    setCustomerToEdit(customer);
    setEditModalOpen(true);
  };

  // Función para confirmar el cambio de estado
  const confirmStatusChange = async () => {
    if (customerToDelete) {
      const success = await updateCustomerStatus(customerToDelete.id);
      setDeleteModalOpen(false);
      
      if (success) {
        const newStatus = !customerToDelete.active ? 'activado' : 'desactivado';
        showToast('success', `Cliente "${customerToDelete.name}" ${newStatus} exitosamente`);
      } else {
        showToast('error', `Error al cambiar el estado del cliente "${customerToDelete.name}"`);
      }
      
      setCustomerToDelete(null);
    }
  };

  // Función para manejar el envío del formulario de añadir cliente
  const handleAddCustomer = async (data: CustomerData) => {
    const success = await createCustomer(data);
    setAddModalOpen(false);
    
    if (success) {
      showToast('success', `Cliente "${data.name}" creado exitosamente`);
    } else {
      showToast('error', `Error al crear el cliente "${data.name}"`);
    }
  };

  // Función para manejar el envío del formulario de editar cliente
  const handleEditCustomer = async (data: CustomerData) => {
    if (customerToEdit) {
      const success = await updateCustomer(customerToEdit.id, data);
      setEditModalOpen(false);
      
      if (success) {
        showToast('success', `Cliente "${data.name}" actualizado exitosamente`);
      } else {
        showToast('error', `Error al actualizar el cliente "${data.name}"`);
      }
      
      setCustomerToEdit(null);
    }
  };

  // Función para alternar entre mostrar solo activos o todos
  const toggleActiveFilter = () => {
    setShowActiveOnly(!showActiveOnly);
    setCurrentPage(1); // Resetear a la primera página cuando cambiamos el filtro
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
          
          <button
            onClick={toggleActiveFilter}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              showActiveOnly 
                ? 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {showActiveOnly ? 'Show Inactive' : 'Show Active'}
          </button>
          
          <PrimaryButton onClick={handleAddClick}>
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
          changeText={`${totalCustomers > 0 ? '+' : ''}${totalCustomers} customers`}
          changeType="positive"
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        
        <StatCard 
          icon={<UserCheck size={18} />}
          value={activeCustomers}
          title="Active Customers"
          changeText={`${activeCustomers} active`}
          changeType="positive"
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        
        <StatCard 
          icon={<UserX size={18} />}
          value={frecuentCustomers}
          title="Frequent Customers"
          changeText={`${frecuentCustomers} frequent`}
          changeType="neutral"
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        
        <StatCard 
          icon={<ShoppingBag size={18} />}
          value={totalOrders}
          title="Total Orders"
          changeText={`${totalOrders} orders`}
          changeType="positive"
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
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
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
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
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => {
                // Calcular la fecha de la última orden si existen órdenes
                let formattedDate = 'N/A';
                let ordersCount = 0;
                
                // Usar técnica de renderizado estable para evitar errores de hidratación
                if (typeof window !== 'undefined' && customer.orders && customer.orders.length > 0) {
                  ordersCount = customer.orders.length;
                  const lastOrderDate = new Date(customer.orders.sort((a, b) => 
                    new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
                  )[0].orderDate);
                  
                  formattedDate = `${lastOrderDate.getFullYear()}-${String(lastOrderDate.getMonth() + 1).padStart(2, '0')}-${String(lastOrderDate.getDate()).padStart(2, '0')}`;
                } else {
                  ordersCount = customer.orders?.length || 0;
                }
                
                return (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-gray-500">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-xs text-gray-500">ID: #{customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.type === 'FRECUENT' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {customer.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ordersCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formattedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionButtons 
                        buttons={[
                          { 
                            icon: <Edit size={16} />, 
                            tooltip: 'Edit', 
                            color: 'success', 
                            onClick: () => handleEditClick({ 
                              id: customer.id, 
                              name: customer.name, 
                              email: customer.email,
                              type: customer.type
                            }) 
                          },
                          { 
                            icon: <Power size={16} />, 
                            tooltip: customer.active ? 'Deactivate' : 'Activate', 
                            color: customer.active ? 'warning' : 'success', 
                            onClick: () => handleStatusChangeClick({ 
                              id: customer.id, 
                              name: customer.name,
                              active: customer.active
                            }) 
                          }
                        ]}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
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
      
      {/* Modal de confirmación para cambiar estado */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setCustomerToDelete(null);
        }}
        onConfirm={confirmStatusChange}
        title="Confirmar cambio de estado"
        message={`¿Está seguro que desea ${customerToDelete?.active ? 'desactivar' : 'activar'} a este cliente?`}
        highlightedItem={customerToDelete?.name}
        type="warning"
      />
      
      {/* Modal para agregar cliente */}
      <CustomerFormModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddCustomer}
        isLoading={isCreating}
      />
      
      {/* Modal para editar cliente */}
      <CustomerFormModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setCustomerToEdit(null);
        }}
        onSubmit={handleEditCustomer}
        isLoading={isUpdating}
        isEditMode={true}
        initialData={customerToEdit || { name: '', email: '', type: 'NORMAL' }}
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