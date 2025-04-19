'use client';

import React from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  lastOrder: string;
  totalSpent: number;
  ordersCount: number;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    lastOrder: '2023-08-15',
    totalSpent: 345.50,
    ordersCount: 12
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    location: 'Los Angeles, CA',
    lastOrder: '2023-08-10',
    totalSpent: 127.85,
    ordersCount: 5
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    phone: '(555) 234-5678',
    location: 'Chicago, IL',
    lastOrder: '2023-08-05',
    totalSpent: 542.30,
    ordersCount: 18
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    phone: '(555) 876-5432',
    location: 'Miami, FL',
    lastOrder: '2023-07-28',
    totalSpent: 89.95,
    ordersCount: 3
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '(555) 345-6789',
    location: 'Seattle, WA',
    lastOrder: '2023-07-22',
    totalSpent: 276.40,
    ordersCount: 9
  }
];

const CustomersTable: React.FC = () => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
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
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Order
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Spent
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Orders
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockCustomers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{customer.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{customer.location}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{new Date(customer.lastOrder).toLocaleDateString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${customer.totalSpent.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{customer.ordersCount}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-primary-600 hover:text-primary-900">View</button>
                <span className="mx-2 text-gray-300">|</span>
                <button className="text-primary-600 hover:text-primary-900">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">42</span> customers
          </div>
          <div className="flex-1 flex justify-end">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button aria-current="page" className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                1
              </button>
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                2
              </button>
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable; 