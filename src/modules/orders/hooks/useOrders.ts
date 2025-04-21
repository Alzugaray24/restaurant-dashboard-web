import { useState, useEffect } from "react";
import { Order, OrderStatus } from "../types";
import {
  fetchOrders,
  fetchOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  CreateOrderData,
  UpdateOrderData,
} from "../api";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);
  const [updateStatusError, setUpdateStatusError] = useState<string | null>(
    null
  );

  const getOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrderById(id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id: number) => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const success = await deleteOrder(id);
      if (success) {
        // Update local state to reflect deletion
        setOrders((prev) => prev.filter((order) => order.id !== id));
        return true;
      } else {
        setDeleteError("No se pudo eliminar la orden");
        return false;
      }
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Error al eliminar la orden"
      );
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateOrder = async (orderData: CreateOrderData) => {
    setIsCreating(true);
    setCreateError(null);
    try {
      const newOrder = await createOrder(orderData);
      if (newOrder) {
        // Update local state to include the new order
        setOrders((prev) => [...prev, newOrder]);
        return true;
      } else {
        setCreateError("No se pudo crear la orden");
        return false;
      }
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : "Error al crear la orden"
      );
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateOrder = async (id: number, orderData: UpdateOrderData) => {
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const updatedOrder = await updateOrder(id, orderData);
      if (updatedOrder) {
        // Update local state to reflect the update
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, ...updatedOrder } : order
          )
        );
        return true;
      } else {
        setUpdateError("No se pudo actualizar la orden");
        return false;
      }
    } catch (err) {
      setUpdateError(
        err instanceof Error ? err.message : "Error al actualizar la orden"
      );
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateOrderStatus = async (id: number, status: OrderStatus) => {
    setIsUpdatingStatus(true);
    setUpdateStatusError(null);
    try {
      const success = await updateOrderStatus(id, status);
      if (success) {
        // Update local state to reflect the status change
        setOrders((prev) =>
          prev.map((order) => (order.id === id ? { ...order, status } : order))
        );
        return true;
      } else {
        setUpdateStatusError("No se pudo actualizar el estado de la orden");
        return false;
      }
    } catch (err) {
      setUpdateStatusError(
        err instanceof Error
          ? err.message
          : "Error al actualizar el estado de la orden"
      );
      return false;
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    isDeleting,
    deleteError,
    isCreating,
    createError,
    isUpdating,
    updateError,
    isUpdatingStatus,
    updateStatusError,
    refreshOrders: getOrders,
    getOrderById,
    deleteOrder: handleDeleteOrder,
    createOrder: handleCreateOrder,
    updateOrder: handleUpdateOrder,
    updateOrderStatus: handleUpdateOrderStatus,
  };
};
