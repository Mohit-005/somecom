import { Clock, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DeliveryEstimate() {
  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days from now
    
    return {
      date: deliveryDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      }),
      isWeekend: deliveryDate.getDay() === 0 || deliveryDate.getDay() === 6
    };
  };

  const estimate = getEstimatedDelivery();

  return (
    <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center flex-shrink-0">
            <Truck className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-800 dark:text-green-200">
                Order by 2 PM today
              </span>
            </div>
            
            <p className="text-sm text-green-700 dark:text-green-300">
              Get it by <span className="font-medium">{estimate.date}</span>
              {estimate.isWeekend && (
                <span className="text-xs block text-green-600 dark:text-green-400">
                  (Weekend delivery available)
                </span>
              )}
            </p>
            
            <p className="text-xs text-green-600 dark:text-green-400">
              Free standard shipping on orders over $75
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}