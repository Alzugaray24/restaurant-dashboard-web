/**
 * Possible statuses for an order
 */
export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

/**
 * Customer interface
 */
export interface Customer {
  /**
   * ID of the customer
   */
  id: number;

  /**
   * Name of the customer
   */
  name: string;

  /**
   * Email of the customer
   */
  email: string;

  /**
   * Whether the customer is active
   */
  active: boolean;

  /**
   * Type of customer
   */
  type: string;
}

/**
 * Dish interface
 */
export interface Dish {
  /**
   * ID of the dish
   */
  id: number;

  /**
   * Name of the dish
   */
  name: string;

  /**
   * Price of the dish
   */
  price: number;

  /**
   * Type of the dish
   */
  type: string;

  /**
   * Whether the dish is active
   */
  active: boolean;
}

/**
 * Order item interface representing a dish in an order
 */
export interface OrderItem {
  /**
   * ID of the order item
   */
  id: number;

  /**
   * Dish object
   */
  dish: Dish;

  /**
   * Quantity of this dish in the order
   */
  quantity: number;

  /**
   * Unit price of the dish
   */
  unitPrice: number;

  /**
   * Special notes for the dish
   */
  specialNotes: string | null;
}

/**
 * Order interface
 */
export interface Order {
  /**
   * Unique ID of the order
   */
  id: number;

  /**
   * Customer who placed the order
   */
  customer: Customer;

  /**
   * Total amount of the order
   */
  total: number;

  /**
   * Status of the order
   */
  status: OrderStatus;

  /**
   * Date when the order was created
   */
  orderDate: string;

  /**
   * Items in the order
   */
  items: OrderItem[];
}
