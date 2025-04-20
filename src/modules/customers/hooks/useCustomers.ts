import { useState, useEffect } from "react";
import { Customer } from "../types";
import { fetchCustomers, deleteCustomer } from "../api/customerApi";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  useEffect(() => {
    getCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    isDeleting,
    deleteError,
    refreshCustomers: getCustomers,
    deleteCustomer: handleDeleteCustomer,
  };
};
