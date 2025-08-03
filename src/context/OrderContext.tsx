import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

// Mock orders for demo
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      {
        id: 1,
        name: 'Classic White Shirt',
        price: 89,
        originalPrice: 120,
        image: '/src/assets/product-1.jpg',
        category: 'men',
        quantity: 1,
        size: 'M'
      },
      {
        id: 2,
        name: 'Denim Jacket',
        price: 149,
        image: '/src/assets/product-2.jpg',
        category: 'women',
        quantity: 1,
        size: 'S'
      }
    ],
    total: 238,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Fashion Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    paymentMethod: '**** 4242',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    date: '2024-01-20',
    status: 'shipped',
    items: [
      {
        id: 3,
        name: 'Summer Dress',
        price: 79,
        image: '/src/assets/product-3.jpg',
        category: 'women',
        quantity: 2,
        size: 'M'
      }
    ],
    total: 158,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Fashion Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    paymentMethod: '**** 4242',
    trackingNumber: 'TRK987654321'
  }
];

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      getOrderById,
    }}>
      {children}
    </OrderContext.Provider>
  );
};