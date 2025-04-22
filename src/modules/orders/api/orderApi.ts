import { Order, OrderStatus } from "../types";
import { ORDER_ENDPOINT } from "../constants/api";

// Mock data to use when API is not available
const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    customer: {
      id: 56,
      name: "Mati Alzu",
      email: "mati@example.com",
      active: true,
      type: "NORMAL",
    },
    total: 3500,
    status: "PENDING",
    orderDate: "2023-10-15T14:30:00Z",
    items: [
      {
        id: 1,
        dish: {
          id: 1,
          name: "Tiramisú a la Criolla",
          price: 1500,
          type: "DESSERT",
          active: true,
        },
        unitPrice: 1500,
        quantity: 1,
        specialNotes: null,
      },
      {
        id: 2,
        dish: {
          id: 2,
          name: "Risotto Especial",
          price: 2000,
          type: "MAIN",
          active: true,
        },
        unitPrice: 2000,
        quantity: 1,
        specialNotes: null,
      },
    ],
  },
  {
    id: 2,
    customer: {
      id: 57,
      name: "Lucas",
      email: "lucas@example.com",
      active: true,
      type: "NORMAL",
    },
    total: 4000,
    status: "DELIVERED",
    orderDate: "2023-10-14T18:45:00Z",
    items: [
      {
        id: 3,
        dish: {
          id: 4,
          name: "Ensalada Mediterránea",
          price: 1800,
          type: "STARTER",
          active: true,
        },
        unitPrice: 1800,
        quantity: 2,
        specialNotes: null,
      },
      {
        id: 4,
        dish: {
          id: 1,
          name: "Tiramisú a la Criolla",
          price: 1500,
          type: "DESSERT",
          active: true,
        },
        unitPrice: 1500,
        quantity: 1,
        specialNotes: null,
      },
    ],
  },
  {
    id: 3,
    customer: {
      id: 60,
      name: "Juan Pérez",
      email: "juan@example.com",
      active: true,
      type: "NORMAL",
    },
    total: 2400,
    status: "PREPARING",
    orderDate: "2023-10-15T19:20:00Z",
    items: [
      {
        id: 5,
        dish: {
          id: 5,
          name: "Pasta al Pesto",
          price: 2400,
          type: "MAIN",
          active: true,
        },
        unitPrice: 2400,
        quantity: 1,
        specialNotes: null,
      },
    ],
  },
];

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch(ORDER_ENDPOINT);

    if (!response.ok) {
      throw new Error(`Error fetching orders: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Order data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    console.log("Using mock data instead");

    // Return mock data when API is not available
    return MOCK_ORDERS;
  }
};

export const fetchOrderById = async (id: number): Promise<Order | null> => {
  try {
    const response = await fetch(`${ORDER_ENDPOINT}/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching order: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Order with ID ${id} fetched successfully:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    console.log("Using mock data instead");

    // Return mock data when API is not available
    const order = MOCK_ORDERS.find((o) => o.id === id);
    return order || null;
  }
};

export interface OrderData {
  customerId: number;
  items: {
    dishId: number;
    quantity: number;
    specialNotes?: string;
  }[];
}

export type CreateOrderData = OrderData;
export type UpdateOrderData = Partial<OrderData>;

export const createOrder = async (
  orderData: CreateOrderData
): Promise<Order | null> => {
  try {
    const response = await fetch(ORDER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Error creating order: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Order created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
};

export const updateOrder = async (
  id: number,
  orderData: UpdateOrderData
): Promise<Order | null> => {
  try {
    const response = await fetch(`${ORDER_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Error updating order: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Order with ID ${id} updated successfully:`, data);
    return data;
  } catch (error) {
    console.error(`Error updating order with ID ${id}:`, error);
    return null;
  }
};

export const updateOrderStatus = async (
  id: number,
  status: OrderStatus
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${ORDER_ENDPOINT}/${id}/status?status=${status}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error updating order status: ${response.statusText}`);
    }

    console.log(`Order with ID ${id} status updated successfully to ${status}`);
    return true;
  } catch (error) {
    console.error(`Error updating status for order with ID ${id}:`, error);

    // Mock update for offline testing
    const order = MOCK_ORDERS.find((o) => o.id === id);
    if (order) {
      order.status = status;
      return true;
    }

    return false;
  }
};

export const deleteOrder = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${ORDER_ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error deleting order: ${response.statusText}`);
    }

    console.log(`Order with ID ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error(`Error deleting order with ID ${id}:`, error);
    return false;
  }
};
