import React, { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  children: ReactNode;
  status?: string;
  className?: string;
  headerAction?: ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  status,
  className = '',
  headerAction,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 mb-6 ${className}`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h2 className="text-lg font-medium text-gray-800">{title}</h2>
        <div className="flex items-center gap-2">
          {status && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {status}
            </span>
          )}
          {headerAction}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}; 