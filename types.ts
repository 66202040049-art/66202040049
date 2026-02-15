
export enum Category {
  SHIRT = 'เสื้อเชิ้ต',
  PANTS = 'กางเกง',
  DRESS = 'เดรส',
  ACCESSORIES = 'เครื่องประดับ'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Paid' | 'Shipped';
}
