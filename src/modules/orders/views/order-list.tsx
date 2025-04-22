'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrders } from '@/modules/orders/hooks';
import { SearchInput } from '@/shared/components/forms/search-input';
import { StatCard } from '@/shared/components/cards/stat-card';
import { ActionButtons } from '@/shared/components/buttons/action-buttons';
import { Toast } from '@/shared/components/alerts/toast';
import { ToastContainer } from '@/shared/components/alerts/toast-container';
import Loader from '@/shared/components/loader';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';

// Number of orders to show per page
const ORDERS_PER_PAGE = parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || '6', 10);

export function OrderList() {
  const router = useRouter();
  const { 
    orders, 
    loading, 
    error
  } = useOrders();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });
  
  // Filter orders by search term
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  
  // Get orders for current page
  const indexOfLastOrder = currentPage * ORDERS_PER_PAGE;
  const indexOfFirstOrder = indexOfLastOrder - ORDERS_PER_PAGE;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  
  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(price);
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const preparingOrders = orders.filter(o => o.status === 'PREPARING').length;
  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;
  
  // Función para ver detalles de una orden
  const handleViewOrderDetails = (orderId: number) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header and controls */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        
        <div className="flex items-center gap-4">
          <SearchInput 
            placeholder="Search customer..." 
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
      </div>
      
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon={<ShoppingBag size={18} />}
          value={totalOrders}
          title="Total Orders"
          changeText={`${totalOrders} orders`}
          changeType="positive"
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        
        <StatCard 
          icon={<Clock size={18} />}
          value={pendingOrders}
          title="Pending Orders"
          changeText={`${pendingOrders} pending`}
          changeType={pendingOrders > 0 ? "neutral" : "positive"}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        />
        
        <StatCard 
          icon={<Clock size={18} />}
          value={preparingOrders}
          title="Preparing"
          changeText={`${preparingOrders} in progress`}
          changeType="neutral"
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        
        <StatCard 
          icon={<CheckCircle size={18} />}
          value={deliveredOrders}
          title="Delivered"
          changeText={`${deliveredOrders} delivered`}
          changeType="positive"
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
      </div>
      
      {loading && <Loader text="Cargando órdenes..." />}
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          <p>Error: {error}</p>
          <p>Using mock data instead.</p>
        </div>
      )}
      
      {/* Orders table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items Count
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer.email}</div>
                    <div className="text-xs text-gray-500">{order.customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(order.orderDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatPrice(order.total)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.items.length} items
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <ActionButtons 
                      buttons={[
                        { 
                          icon: <Eye size={16} />, 
                          tooltip: 'View Details', 
                          color: 'primary', 
                          onClick: () => handleViewOrderDetails(order.id) 
                        }
                      ]}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-500">No orders found</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to <span className="font-medium">
              {Math.min(indexOfLastOrder, filteredOrders.length)}
            </span> of <span className="font-medium">{filteredOrders.length}</span> results
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
              
              {/* Render page buttons */}
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                // Show first 3 pages, current page, and last page
                let pageNum: number;
                if (totalPages <= 5) {
                  // If 5 or fewer pages, show all
                  pageNum = index + 1;
                } else if (currentPage <= 3) {
                  // If we're on the first 3 pages
                  if (index < 4) {
                    pageNum = index + 1;
                  } else {
                    pageNum = totalPages;
                  }
                } else if (currentPage >= totalPages - 2) {
                  // If we're on the last 3 pages
                  if (index === 0) {
                    pageNum = 1;
                  } else {
                    pageNum = totalPages - 4 + index;
                  }
                } else {
                  // If we're in the middle
                  if (index === 0) {
                    pageNum = 1;
                  } else if (index === 4) {
                    pageNum = totalPages;
                  } else {
                    pageNum = currentPage + index - 2;
                  }
                }
                
                // If we need to show ellipsis instead of a number
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