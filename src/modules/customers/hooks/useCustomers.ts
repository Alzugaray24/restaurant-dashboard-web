import { useState, useEffect } from "react";
import { Customer } from "../types";
import {
  fetchCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomer,
  CustomerData,
} from "../api/customerApi";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const getCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const success = await deleteCustomer(id);
      if (success) {
        // Actualizar estado local para reflejar la eliminación
        setCustomers((prev) => prev.filter((customer) => customer.id !== id));
        return true;
      } else {
        setDeleteError("No se pudo eliminar el cliente");
        return false;
      }
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Error al eliminar el cliente"
      );
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateCustomer = async (customerData: CustomerData) => {
    setIsCreating(true);
    setCreateError(null);
    try {
      const newCustomer = await createCustomer(customerData);
      if (newCustomer) {
        // Actualizar estado local para incluir el nuevo cliente
        setCustomers((prev) => [...prev, newCustomer]);
        return true;
      } else {
        setCreateError("No se pudo crear el cliente");
        return false;
      }
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : "Error al crear el cliente"
      );
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateCustomer = async (
    id: number,
    customerData: CustomerData
  ) => {
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const updatedCustomer = await updateCustomer(id, customerData);
      if (updatedCustomer) {
        // Actualizar estado local para reflejar la actualización
        setCustomers((prev) =>
          prev.map((customer) =>
            customer.id === id ? { ...customer, ...updatedCustomer } : customer
          )
        );
        return true;
      } else {
        setUpdateError("No se pudo actualizar el cliente");
        return false;
      }
    } catch (err) {
      setUpdateError(
        err instanceof Error ? err.message : "Error al actualizar el cliente"
      );
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    isDeleting,
    deleteError,
    isCreating,
    createError,
    isUpdating,
    updateError,
    refreshCustomers: getCustomers,
    deleteCustomer: handleDeleteCustomer,
    createCustomer: handleCreateCustomer,
    updateCustomer: handleUpdateCustomer,
  };
};
