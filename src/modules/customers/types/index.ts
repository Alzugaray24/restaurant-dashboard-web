export interface Order {
  id: number;
  total: number;
  orderDate: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  active: boolean;
  type: string;
  orders?: Order[];
}
