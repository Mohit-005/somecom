import React from 'react';
import { useReturns } from '../context/ReturnsContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Package, RotateCcw, CheckCircle, XCircle, Clock, Truck } from 'lucide-react';

const Returns = () => {
  const { returns } = useReturns();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Returns & Refunds</h1>
          <p className="text-muted-foreground mb-6">Please log in to view your return requests.</p>
          <Button asChild>
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'processing': return 'secondary';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Returns & Refunds</h1>
        <p className="text-muted-foreground">Track your return requests and refund status</p>
      </div>

      {returns.length === 0 ? (
        <div className="text-center py-12">
          <RotateCcw className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No return requests</h2>
          <p className="text-muted-foreground mb-6">
            You haven't made any return requests yet.
          </p>
          <Button asChild>
            <Link to="/orders">View Orders</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {returns.map((returnRequest) => (
            <Card key={returnRequest.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Return #{returnRequest.id}</CardTitle>
                  <Badge variant={getStatusColor(returnRequest.status)} className="flex items-center gap-1">
                    {getStatusIcon(returnRequest.status)}
                    {returnRequest.status.charAt(0).toUpperCase() + returnRequest.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Order #{returnRequest.orderId}</span>
                  <span>Requested on {new Date(returnRequest.date).toLocaleDateString()}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Items to Return</h4>
                    <div className="space-y-2">
                      {returnRequest.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium">{item.name}</h5>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size} • Quantity: {item.returnQuantity}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Reason: {item.reason}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(item.price * item.returnQuantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h4 className="font-medium mb-1">Return Reason</h4>
                      <p className="text-sm text-muted-foreground">{returnRequest.reason}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Refund Amount</h4>
                      <p className="text-sm text-muted-foreground">${returnRequest.refundAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  {returnRequest.trackingNumber && (
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-1">Return Tracking</h4>
                      <p className="text-sm text-muted-foreground">#{returnRequest.trackingNumber}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    {returnRequest.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        Cancel Request
                      </Button>
                    )}
                    {returnRequest.trackingNumber && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                        <Link to={`/track-return/${returnRequest.id}`}>
                          <Truck className="h-4 w-4" />
                          Track Return
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/orders`}>View Order</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Returns;