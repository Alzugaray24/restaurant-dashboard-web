'use client';



import React, { useState } from 'react';
import { useDishes } from '@/modules/dishes/hooks';
import { SearchInput } from '@/shared/components/forms/search-input';
import { PrimaryButton } from '@/shared/components/buttons/primary-button';
import { StatCard } from '@/shared/components/cards/stat-card';
import { ActionButtons } from '@/shared/components/buttons/action-buttons';
import { ConfirmationModal } from '@/shared/components/modals/confirmation-modal';
import { DishFormModal } from '@/shared/components/modals/dish-form-modal';
import { Toast } from '@/shared/components/alerts/toast';
import { ToastContainer } from '@/shared/components/alerts/toast-container';
import { 
  UtensilsCrossed, 
  Utensils, 
  Salad,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash
} from 'lucide-react';
import { DishData } from '@/modules/dishes/api';

// Número de platos a mostrar por página
const DISHES_PER_PAGE = parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || '6', 10);

export default function DishesPage() {
  const { 
    dishes, 
    loading, 
    error, 
    deleteDish, 
    createDish, 
    updateDish,
    isCreating,
    isUpdating
  } = useDishes();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dishToDelete, setDishToDelete] = useState<{ id: number, name: string } | null>(null);
  const [dishToEdit, setDishToEdit] = useState<{ id: number, name: string, price: number, type: string } | null>(null);
  const [toast, setToast] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });
  
  // Filtrar platos por término de búsqueda
  const filteredDishes = dishes.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el total de páginas
  const totalPages = Math.ceil(filteredDishes.length / DISHES_PER_PAGE);
  
  // Obtener platos para la página actual
  const indexOfLastDish = currentPage * DISHES_PER_PAGE;
  const indexOfFirstDish = indexOfLastDish - DISHES_PER_PAGE;
  const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);
  
  // Función para cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Función para formatear el precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(price / 100); // El precio está en centavos
  };

  // Calcular estadísticas
  const totalDishes = dishes.length;
  const commonDishes = dishes.filter(d => d.type === 'COMMON').length;
  
  // Nuevas estadísticas
  const popularDishes = dishes.filter(d => d.type === 'POPULAR').length;
  const mostExpensiveDish = dishes.length > 0 
    ? dishes.reduce((max, dish) => dish.price > max.price ? dish : max, dishes[0])
    : null;

  // Función para mostrar un toast
  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ show: true, type, message });
  };

  // Función para abrir el modal de eliminación
  const handleDeleteClick = (dish: { id: number, name: string }) => {
    setDishToDelete(dish);
    setDeleteModalOpen(true);
  };

  // Función para abrir el modal de añadir plato
  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  // Función para abrir el modal de edición
  const handleEditClick = (dish: { id: number, name: string, price: number, type: string }) => {
    setDishToEdit(dish);
    setEditModalOpen(true);
  };

  // Función para confirmar la eliminación
  const confirmDelete = async () => {
    if (dishToDelete) {
      const success = await deleteDish(dishToDelete.id);
      setDeleteModalOpen(false);
      
      if (success) {
        showToast('success', `Plato "${dishToDelete.name}" eliminado exitosamente`);
      } else {
        showToast('error', `Error al eliminar el plato "${dishToDelete.name}"`);
      }
      
      setDishToDelete(null);
    }
  };

  // Función para manejar el envío del formulario de añadir plato
  const handleAddDish = async (data: DishData) => {
    const success = await createDish(data);
    setAddModalOpen(false);
    
    if (success) {
      showToast('success', `Plato "${data.name}" creado exitosamente`);
    } else {
      showToast('error', `Error al crear el plato "${data.name}"`);
    }
  };

  // Función para manejar el envío del formulario de editar plato
  const handleEditDish = async (data: DishData) => {
    if (dishToEdit) {
      const success = await updateDish(dishToEdit.id, data);
      setEditModalOpen(false);
      
      if (success) {
        showToast('success', `Plato "${data.name}" actualizado exitosamente`);
      } else {
        showToast('error', `Error al actualizar el plato "${data.name}"`);
      }
      
      setDishToEdit(null);
    }
  };

  // Función para renderizar el tipo de plato
  const renderDishType = (type: string) => {
    switch (type) {
      case 'COMMON':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            COMÚN
          </span>
        );
      case 'POPULAR':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            POPULAR
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {type}
          </span>
        );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Encabezado y controles */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dishes</h1>
        
        <div className="flex items-center gap-4">
          <SearchInput 
            placeholder="Search dishes..." 
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          
          <PrimaryButton onClick={handleAddClick}>
            Add Dish
          </PrimaryButton>
        </div>
      </div>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon={<UtensilsCrossed size={18} />}
          value={totalDishes}
          title="Total Dishes"
          changeText={`${totalDishes > 0 ? '+' : ''}${totalDishes} dishes`}
          changeType="positive"
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        
        <StatCard 
          icon={<Utensils size={18} />}
          value={commonDishes}
          title="Common Dishes"
          changeText={`${commonDishes} common`}
          changeType="positive"
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        
        <StatCard 
          icon={<ChefHat size={18} />}
          value={popularDishes}
          title="Popular Dishes"
          changeText={`${popularDishes} popular`}
          changeType="neutral"
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
        />
        
        <StatCard 
          icon={<Salad size={18} />}
          value={mostExpensiveDish ? Number((mostExpensiveDish.price / 100).toFixed(0)) : 0}
          title="Most Expensive"
          changeText={mostExpensiveDish ? formatPrice(mostExpensiveDish.price) : 'No dishes'}
          changeType="positive"
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
      </div>
      
      {loading && <p className="text-center py-4">Loading dishes...</p>}
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          <p>Error: {error}</p>
          <p>Using mock data instead.</p>
        </div>
      )}
      
      {/* Tabla de platos */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentDishes.length > 0 ? (
              currentDishes.map((dish) => (
                <tr key={dish.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">#{dish.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{dish.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatPrice(dish.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderDishType(dish.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <ActionButtons 
                      buttons={[
                        { 
                          icon: <Edit size={16} />, 
                          tooltip: 'Editar', 
                          color: 'success', 
                          onClick: () => handleEditClick(dish) 
                        },
                        { 
                          icon: <Trash size={16} />, 
                          tooltip: 'Eliminar', 
                          color: 'danger', 
                          onClick: () => handleDeleteClick(dish) 
                        }
                      ]}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-500">No dishes found</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Paginación */}
      {filteredDishes.length > 0 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstDish + 1}</span> to <span className="font-medium">
              {Math.min(indexOfLastDish, filteredDishes.length)}
            </span> of <span className="font-medium">{filteredDishes.length}</span> results
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
      
      {/* Modals */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm deletion"
        message="Are you sure you want to delete this dish?"
        highlightedItem={dishToDelete?.name}
        type="delete"
      />
      
      <DishFormModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddDish}
        isLoading={isCreating}
      />
      
      <DishFormModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditDish}
        isEditMode={true}
        initialData={dishToEdit ? { 
          name: dishToEdit.name,
          price: dishToEdit.price,
          type: dishToEdit.type
        } : undefined}
        isLoading={isUpdating}
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