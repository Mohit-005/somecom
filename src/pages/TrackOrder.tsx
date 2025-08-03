import { useParams, Link } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, Truck, MapPin, CheckCircle } from "lucide-react";

export default function TrackOrder() {
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useOrders();
  
  const order = getOrderById(id || '');
  
  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Order not found</h1>
          <Link to="/orders">
            <Button variant="outline">Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const trackingSteps = [
    {
      title: "Order Confirmed",
      description: "Your order has been received and confirmed",
      completed: true,
      icon: CheckCircle,
      date: order.date
    },
    {
      title: "Processing",
      description: "Your order is being prepared for shipment",
      completed: order.status !== 'pending',
      icon: Package,
      date: order.status !== 'pending' ? order.date : undefined
    },
    {
      title: "Shipped",
      description: "Your order is on its way",
      completed: ['shipped', 'delivered'].includes(order.status),
      icon: Truck,
      date: ['shipped', 'delivered'].includes(order.status) ? order.date : undefined
    },
    {
      title: "Delivered",
      description: "Your order has been delivered",
      completed: order.status === 'delivered',
      icon: MapPin,
      date: order.status === 'delivered' ? order.date : undefined
    }
  ];

  const getEstimatedDelivery = () => {
    const orderDate = new Date(order.date);
    const deliveryDate = new Date(orderDate.getTime() + (5 * 24 * 60 * 60 * 1000)); // 5 days from order
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-content px-4 py-section">
        {/* Back Button */}
        <Link to="/orders" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracking Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Track Your Order</span>
                  <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </CardTitle>
                <p className="text-muted-foreground">Order ID: {order.id}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {trackingSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="relative flex items-start gap-4">
                        {/* Connection Line */}
                        {index < trackingSteps.length - 1 && (
                          <div 
                            className={`absolute left-5 top-10 w-0.5 h-16 ${
                              step.completed ? 'bg-primary' : 'bg-border'
                            }`}
                          />
                        )}
                        
                        {/* Icon */}
                        <div 
                          className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                            step.completed 
                              ? 'bg-primary border-primary text-primary-foreground' 
                              : 'bg-background border-border text-muted-foreground'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {step.description}
                          </p>
                          {step.date && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(step.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Tracking Number */}
            {order.trackingNumber && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Tracking Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Tracking Number</p>
                    <p className="font-mono text-lg">{order.trackingNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      Estimated Delivery: {getEstimatedDelivery()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>

                <Separator />

                {/* Shipping Address */}
                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}