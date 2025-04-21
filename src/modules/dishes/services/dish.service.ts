import { AxiosResponse } from "axios";
import { Dish } from "../models/dish.model";
import { DISH_ENDPOINT } from "../../../shared/constants/api";
import axiosInstance from "../../../shared/services/api.service";

export const getDishes = async (): Promise<Dish[]> => {
  try {
    const response: AxiosResponse<Dish[]> = await axiosInstance.get(
      DISH_ENDPOINT
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
};

export const getDishById = async (id: number): Promise<Dish> => {
  try {
    const response: AxiosResponse<Dish> = await axiosInstance.get(
      `${DISH_ENDPOINT}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching dish with id ${id}:`, error);
    throw error;
  }
};

export const createDish = async (dish: Omit<Dish, "id">): Promise<Dish> => {
  try {
    const response: AxiosResponse<Dish> = await axiosInstance.post(
      DISH_ENDPOINT,
      dish
    );
    return response.data;
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
    const response: AxiosResponse<Dish> = await axiosInstance.put(
      `${DISH_ENDPOINT}/${id}`,
      dish
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating dish with id ${id}:`, error);
    throw error;
  }
};

export const deleteDish = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`${DISH_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error deleting dish with id ${id}:`, error);
    throw error;
  }
};
