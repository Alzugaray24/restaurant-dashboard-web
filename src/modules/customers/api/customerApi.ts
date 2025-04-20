import { Customer } from "../types";
import { CUSTOMER_ENDPOINT } from "../constants/api";

// Datos de prueba para usar cuando la API no está disponible
const MOCK_CUSTOMERS: Customer[] = [
  { id: 56, name: "Mati Alzu", type: "NORMAL" },
  { id: 57, name: "Lucas", type: "NORMAL" },
  { id: 59, name: "María Rodríguez", type: "NORMAL" },
  { id: 60, name: "Juan Pérez", type: "NORMAL" },
  { id: 61, name: "Ana García", type: "NORMAL" },
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
