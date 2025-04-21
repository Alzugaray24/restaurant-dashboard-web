/**
 * Tipos de platos
 */
export type DishType =
  | "COMMON"
  | "SPECIAL"
  | "VEGETARIAN"
  | "VEGAN"
  | "POPULAR";

/**
 * Interfaz para el modelo de plato
 */
export interface Dish {
  /**
   * ID único del plato
   */
  id: number;

  /**
   * Nombre del plato
   */
  name: string;

  /**
   * Precio del plato en centavos
   */
  price: number;

  /**
   * Tipo de plato
   */
  type: DishType;
}
