import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface OrderConfirmationProps {
  orderId: string;
  onClose: () => void;
}

export function OrderConfirmation({ orderId, onClose }: OrderConfirmationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getEstimatedDelivery = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <Card className={`w-80 shadow-lg border border-green-200 dark:border-green-800 transform transition-all duration-500 ${
        isVisible ? 'scale-100' : 'scale-95'
      }`}>
        <CardContent className="p-6 space-y-4">
          {/* Success Icon and Message */}
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center animate-scale-in">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
            </div>
            
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-foreground">Order Placed!</h3>
              <p className="text-sm text-muted-foreground">
                Your order has been confirmed successfully.
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-muted/30 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <Package className="w-3 h-3" />
              <span className="font-medium">Order #{orderId}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Delivery: {getEstimatedDelivery()}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Link to="/orders" className="flex-1">
              <Button size="sm" className="w-full text-xs">
                View Order
              </Button>
            </Link>
            
            <Button 
              size="sm"
              variant="outline" 
              className="flex-1 text-xs" 
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}