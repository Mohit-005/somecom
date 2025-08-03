import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useReturns } from '../context/ReturnsContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Package, Truck, Star, XCircle, Eye, Package2, RotateCcw } from 'lucide-react';
import ReturnRequestModal from '../components/ReturnRequestModal';
import { useToast } from '../components/ui/use-toast';

const Orders = () => {
  const { orders } = useOrders();
  const { user } = useAuth();
  const { getReturnsByOrderId } = useReturns();
  const { toast } = useToast();
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">My Orders</h1>
          <p className="text-muted-foreground mb-6">Please log in to view your orders.</p>
          <Button asChild>
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package className="h-4 w-4" />;
      case 'processing': return <Package2 className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <Package className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'processing': return 'default';
      case 'shipped': return 'default';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleReturnRequest = (order: any) => {
    setSelectedOrder(order);
    setReturnModalOpen(true);
  };

  const canRequestReturn = (order: any) => {
    const orderDate = new Date(order.date);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return order.status === 'delivered' && 
           orderDate >= sevenDaysAgo &&
           getReturnsByOrderId(order.id).length === 0;
  };

  const canCancelOrder = (order: any) => {
    return order.status === 'pending' || order.status === 'processing';
  };

  const handleCancelOrder = (orderId: string) => {
    // In real app, this would call an API
    toast({
      title: "Order cancelled",
      description: "Your order has been cancelled successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">View and manage your order history</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Button asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Placed on {new Date(order.date).toLocaleDateString()}</span>
                  <span>Total: ${order.total.toFixed(2)}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium">{item.name}</h5>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size} • Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <p className="text-sm text-muted-foreground line-through">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h4 className="font-medium mb-1">Shipping Address</h4>
                      <p className="text-sm text-muted-foreground">
                        {order.shippingAddress.name}<br />
                        {order.shippingAddress.street}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                        {order.shippingAddress.country}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Payment Method</h4>
                      <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                      {order.trackingNumber && (
                        <>
                          <h4 className="font-medium mb-1 mt-2">Tracking Number</h4>
                          <p className="text-sm text-muted-foreground">{order.trackingNumber}</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                      <Link to={`/product/${order.items[0]?.id}`}>
                        <Eye className="h-4 w-4" />
                        View Details
                      </Link>
                    </Button>
                    {(order.status === 'shipped' || order.status === 'processing') && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                        <Link to={`/track-order/${order.id}`}>
                          <Truck className="h-4 w-4" />
                          Track Package
                        </Link>
                      </Button>
                    )}
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                        <Link to={`/reviews/${order.id}`}>
                          <Star className="h-4 w-4" />
                          Leave Review
                        </Link>
                      </Button>
                    )}
                    {canRequestReturn(order) && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleReturnRequest(order)}
                      >
                        <RotateCcw className="h-4 w-4" />
                        Return Items
                      </Button>
                    )}
                    {canCancelOrder(order) && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <XCircle className="h-4 w-4" />
                        Cancel Order
                      </Button>
                    )}
                    {getReturnsByOrderId(order.id).length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        asChild
                      >
                        <Link to={`/track-return/${getReturnsByOrderId(order.id)[0].id}`}>
                          <Truck className="h-4 w-4" />
                          Track Return
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {selectedOrder && (
        <ReturnRequestModal
          isOpen={returnModalOpen}
          onClose={() => {
            setReturnModalOpen(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default Orders;