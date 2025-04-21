import { Dish } from "../models/dish.model";
import { DISH_ENDPOINT } from "../../../shared/constants/api";

export const getDishes = async (): Promise<Dish[]> => {
  try {
    const response = await fetch(DISH_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Error fetching dishes: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
};

export const getDishById = async (id: number): Promise<Dish> => {
  try {
    const response = await fetch(`${DISH_ENDPOINT}/${id}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching dish with id ${id}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching dish with id ${id}:`, error);
    throw error;
  }
};

export const createDish = async (dish: Omit<Dish, "id">): Promise<Dish> => {
  try {
    const response = await fetch(DISH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dish),
    });
    if (!response.ok) {
      throw new Error(`Error creating dish: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating dish:", error);
    throw error;
  }
};

export const updateDish = async (
  id: number,
  dish: Partial<Dish>
): Promise<Dish> => {
  try {
    const response = await fetch(`${DISH_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dish),
    });
    if (!response.ok) {
      throw new Error(
        `Error updating dish with id ${id}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating dish with id ${id}:`, error);
    throw error;
  }
};

export const deleteDish = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${DISH_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Error deleting dish with id ${id}: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error deleting dish with id ${id}:`, error);
    throw error;
  }
};
