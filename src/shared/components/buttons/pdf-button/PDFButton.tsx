import React from 'react';

interface PDFButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export const PDFButton: React.FC<PDFButtonProps> = ({
  onClick,
  className = '',
  label = 'Descargar PDF',
}) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {label}
    </button>
  );
}; 