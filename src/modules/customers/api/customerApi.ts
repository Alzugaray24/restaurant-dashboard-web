import { Customer } from "../types";
import { CUSTOMER_ENDPOINT } from "../constants/api";

// Datos de prueba para usar cuando la API no está disponible
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 56,
    name: "Mati Alzu",
    email: "mati@example.com",
    active: true,
    type: "NORMAL",
  },
  {
    id: 57,
    name: "Lucas",
    email: "lucas@example.com",
    active: true,
    type: "NORMAL",
  },
  {
    id: 59,
    name: "María Rodríguez",
    email: "maria@example.com",
    active: false,
    type: "NORMAL",
  },
  {
    id: 60,
    name: "Juan Pérez",
    email: "juan@example.com",
    active: true,
    type: "FRECUENT",
  },
  {
    id: 61,
    name: "Ana García",
    email: "ana@example.com",
    active: true,
    type: "NORMAL",
  },
];

export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch(CUSTOMER_ENDPOINT);

    if (!response.ok) {
      throw new Error(`Error fetching customers: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Customer data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    console.log("Using mock data instead");

    // Devolver datos simulados cuando la API no está disponible
    return MOCK_CUSTOMERS;
  }
};

export const deleteCustomer = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${CUSTOMER_ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error deleting customer: ${response.statusText}`);
    }

    console.log(`Customer with ID ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error(`Error deleting customer with ID ${id}:`, error);
    return false;
  }
};

export interface CustomerData {
  name: string;
  email: string;
  type?: string;
}

export type CreateCustomerData = CustomerData;
export type UpdateCustomerData = CustomerData;

export const createCustomer = async (
  customerData: CreateCustomerData
): Promise<Customer | null> => {
  try {
    const response = await fetch(CUSTOMER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error(`Error creating customer: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Customer created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating customer:", error);
    return null;
  }
};

export const updateCustomer = async (
  id: number,
  customerData: UpdateCustomerData
): Promise<Customer | null> => {
  try {
    const response = await fetch(`${CUSTOMER_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error(`Error updating customer: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Customer with ID ${id} updated successfully:`, data);
    return data;
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    return null;
  }
};

export const updateCustomerStatus = async (id: number): Promise<boolean> => {
  try {
    // Buscar el cliente actual para obtener el valor inverso de active
    const currentCustomer = MOCK_CUSTOMERS.find((c) => c.id === id);
    const newActiveStatus = currentCustomer ? !currentCustomer.active : true;

    const response = await fetch(
      `${CUSTOMER_ENDPOINT}/${id}/status?active=${newActiveStatus}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error updating customer status: ${response.statusText}`);
    }

    console.log(`Customer with ID ${id} status updated successfully`);
    return true;
  } catch (error) {
    console.error(`Error updating status for customer with ID ${id}:`, error);
    return false;
  }
};
