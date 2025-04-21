import { Dish } from "../types";
import { DISH_ENDPOINT } from "../constants/api";

// Datos de prueba para usar cuando la API no está disponible
const MOCK_DISHES: Dish[] = [
  {
    id: 1,
    name: "Tiramisú a la Criolla",
    price: 1473,
    type: "COMMON",
    active: true,
  },
  {
    id: 2,
    name: "Risotto Especial",
    price: 2160,
    type: "COMMON",
    active: true,
  },
  {
    id: 3,
    name: "Risotto Tradicional",
    price: 4431,
    type: "COMMON",
    active: false,
  },
  {
    id: 4,
    name: "Ensalada Mediterránea",
    price: 1850,
    type: "VEGETARIAN",
    active: true,
  },
  {
    id: 5,
    name: "Pasta al Pesto",
    price: 2400,
    type: "VEGETARIAN",
    active: false,
  },
];

export const fetchDishes = async (): Promise<Dish[]> => {
  try {
    const response = await fetch(DISH_ENDPOINT);

    if (!response.ok) {
      throw new Error(`Error fetching dishes: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Dish data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    console.log("Using mock data instead");

    // Devolver datos simulados cuando la API no está disponible
    return MOCK_DISHES;
  }
};

export const deleteDish = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${DISH_ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error deleting dish: ${response.statusText}`);
    }

    console.log(`Dish with ID ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error(`Error deleting dish with ID ${id}:`, error);
    return false;
  }
};

export interface DishData {
  name: string;
  price: number;
  type: string;
}

export type CreateDishData = DishData;
export type UpdateDishData = DishData;

export const createDish = async (
  dishData: CreateDishData
): Promise<Dish | null> => {
  try {
    const response = await fetch(DISH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dishData),
    });

    if (!response.ok) {
      throw new Error(`Error creating dish: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Dish created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating dish:", error);
    return null;
  }
};

export const updateDish = async (
  id: number,
  dishData: UpdateDishData
): Promise<Dish | null> => {
  try {
    const response = await fetch(`${DISH_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dishData),
    });

    if (!response.ok) {
      throw new Error(`Error updating dish: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Dish with ID ${id} updated successfully:`, data);
    return data;
  } catch (error) {
    console.error(`Error updating dish with ID ${id}:`, error);
    return null;
  }
};

export const updateDishStatus = async (id: number): Promise<boolean> => {
  try {
    // Buscar el plato actual para obtener el valor inverso de active
    const currentDish = MOCK_DISHES.find((d) => d.id === id);
    const newActiveStatus = currentDish ? !currentDish.active : true;

    const response = await fetch(
      `${DISH_ENDPOINT}/${id}/status?active=${newActiveStatus}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error updating dish status: ${response.statusText}`);
    }

    console.log(`Dish with ID ${id} status updated successfully`);
    return true;
  } catch (error) {
    console.error(`Error updating status for dish with ID ${id}:`, error);

    // Devolver datos simulados cuando la API no está disponible
    const dish = MOCK_DISHES.find((d) => d.id === id);
    if (dish) {
      dish.active = !dish.active;
      return true;
    }

    return false;
  }
};
