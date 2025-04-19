'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  /**
   * Número total de elementos
   */
  totalItems: number;
  
  /**
   * Número de elementos por página
   */
  itemsPerPage: number;
  
  /**
   * Página actual
   */
  currentPage: number;
  
  /**
   * Función que se ejecuta al cambiar de página
   */
  onPageChange: (page: number) => void;
  
  /**
   * Número de botones de página a mostrar
   */
  siblingCount?: number;
  
  /**
   * Si debe mostrarse la versión responsive
   */
  responsive?: boolean;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente Pagination - Navegación entre páginas de resultados
 * 
 * Ejemplo de uso:
 * ```tsx
 * <Pagination 
 *   totalItems={100}
 *   itemsPerPage={10}
 *   currentPage={1}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */
const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  siblingCount = 1,
  responsive = true,
  className = '',
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // No mostrar paginación si solo hay una página
  if (totalPages <= 1) return null;
  
  // Calcular rango de elementos mostrados
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  // Función para generar el rango de páginas a mostrar
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
  };
  
  // Generar array de páginas a mostrar
  const generatePagination = () => {
    // Si el número total de páginas es menor o igual a 7, mostrar todas
    if (totalPages <= 5 + siblingCount * 2) {
      return range(1, totalPages);
    }
    
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    
    // Caso 1: Solo puntos a la derecha
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }
    
    // Caso 2: Solo puntos a la izquierda
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, '...', ...rightRange];
    }
    
    // Caso 3: Puntos a ambos lados
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, '...', ...middleRange, '...', totalPages];
    }
  };
  
  const pages = generatePagination();
  
  return (
    <div className={`bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 ${className}`}>
      {/* Versión móvil */}
      {responsive && (
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      )}
      
      {/* Versión desktop */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {/* Botón anterior */}
            <button
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            
            {/* Números de página */}
            {pages?.map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                );
              }
              
              const isCurrentPage = page === currentPage;
              
              return (
                <button
                  key={`page-${page}`}
                  onClick={() => onPageChange(Number(page))}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    isCurrentPage
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                  aria-current={isCurrentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            })}
            
            {/* Botón siguiente */}
            <button
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination; 