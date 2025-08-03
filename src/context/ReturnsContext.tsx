import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface ReturnRequest {
  id: string;
  orderId: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  items: (CartItem & { returnQuantity: number; reason: string })[];
  reason: string;
  refundAmount: number;
  trackingNumber?: string;
}

interface ReturnsContextType {
  returns: ReturnRequest[];
  addReturn: (returnData: Omit<ReturnRequest, 'id' | 'date' | 'status'>) => void;
  getReturnById: (id: string) => ReturnRequest | undefined;
  getReturnsByOrderId: (orderId: string) => ReturnRequest[];
  updateReturnStatus: (id: string, status: ReturnRequest['status']) => void;
}

const ReturnsContext = createContext<ReturnsContextType | undefined>(undefined);

export const useReturns = () => {
  const context = useContext(ReturnsContext);
  if (!context) {
    throw new Error('useReturns must be used within a ReturnsProvider');
  }
  return context;
};

// Mock returns for demo
const mockReturns: ReturnRequest[] = [
  {
    id: 'RET-001',
    orderId: 'ORD-001',
    date: '2024-01-18',
    status: 'approved',
    items: [
      {
        id: 1,
        name: 'Classic White Shirt',
        price: 89,
        originalPrice: 120,
        image: '/src/assets/product-1.jpg',
        category: 'men',
        quantity: 1,
        size: 'M',
        returnQuantity: 1,
        reason: 'Size too small'
      }
    ],
    reason: 'Size too small',
    refundAmount: 89,
    trackingNumber: 'RET123456789'
  }
];

export const ReturnsProvider = ({ children }: { children: ReactNode }) => {
  const [returns, setReturns] = useState<ReturnRequest[]>(mockReturns);

  const addReturn = (returnData: Omit<ReturnRequest, 'id' | 'date' | 'status'>) => {
    const newReturn: ReturnRequest = {
      ...returnData,
      id: `RET-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setReturns(prev => [newReturn, ...prev]);
  };

  const getReturnById = (id: string) => {
    return returns.find(returnReq => returnReq.id === id);
  };

  const getReturnsByOrderId = (orderId: string) => {
    return returns.filter(returnReq => returnReq.orderId === orderId);
  };

  const updateReturnStatus = (id: string, status: ReturnRequest['status']) => {
    setReturns(prev => prev.map(returnReq => 
      returnReq.id === id ? { ...returnReq, status } : returnReq
    ));
  };

  return (
    <ReturnsContext.Provider value={{
      returns,
      addReturn,
      getReturnById,
      getReturnsByOrderId,
      updateReturnStatus,
    }}>
      {children}
    </ReturnsContext.Provider>
  );
};