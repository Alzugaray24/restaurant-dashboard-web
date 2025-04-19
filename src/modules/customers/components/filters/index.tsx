'use client';

import React from 'react';

const CustomersFilters: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[250px]">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Search by name, email, or phone..."
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700 mb-1">
            Last Order Date
          </label>
          <select
            id="orderDate"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">Any time</option>
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
            <option value="last90days">Last 90 days</option>
          </select>
        </div>
        
        <div className="w-full sm:w-auto">
          <label htmlFor="spentAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Total Spent
          </label>
          <select
            id="spentAmount"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">Any amount</option>
            <option value="under100">Under $100</option>
            <option value="100to250">$100 - $250</option>
            <option value="over250">Over $250</option>
          </select>
        </div>
        
        <div className="w-full sm:w-auto flex items-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersFilters; 