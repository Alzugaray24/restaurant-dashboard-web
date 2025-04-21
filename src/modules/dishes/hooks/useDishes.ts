import { useState, useEffect } from "react";
import { Dish } from "../types";
import {
  fetchDishes,
  deleteDish,
  createDish,
  updateDish,
  DishData,
} from "../api";

export const useDishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const getDishes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDishes();
      setDishes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDish = async (id: number) => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const success = await deleteDish(id);
      if (success) {
        // Actualizar estado local para reflejar la eliminación
        setDishes((prev) => prev.filter((dish) => dish.id !== id));
        return true;
      } else {
        setDeleteError("No se pudo eliminar el plato");
        return false;
      }
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Error al eliminar el plato"
      );
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateDish = async (dishData: DishData) => {
    setIsCreating(true);
    setCreateError(null);
    try {
      const newDish = await createDish(dishData);
      if (newDish) {
        // Actualizar estado local para incluir el nuevo plato
        setDishes((prev) => [...prev, newDish]);
        return true;
      } else {
        setCreateError("No se pudo crear el plato");
        return false;
      }
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : "Error al crear el plato"
      );
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateDish = async (id: number, dishData: DishData) => {
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const updatedDish = await updateDish(id, dishData);
      if (updatedDish) {
        // Actualizar estado local para reflejar la actualización
        setDishes((prev) =>
          prev.map((dish) =>
            dish.id === id ? { ...dish, ...updatedDish } : dish
          )
        );
        return true;
      } else {
        setUpdateError("No se pudo actualizar el plato");
        return false;
      }
    } catch (err) {
      setUpdateError(
        err instanceof Error ? err.message : "Error al actualizar el plato"
      );
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    getDishes();
  }, []);

  return {
    dishes,
    loading,
    error,
    isDeleting,
    deleteError,
    isCreating,
    createError,
    isUpdating,
    updateError,
    refreshDishes: getDishes,
    deleteDish: handleDeleteDish,
    createDish: handleCreateDish,
    updateDish: handleUpdateDish,
  };
};
