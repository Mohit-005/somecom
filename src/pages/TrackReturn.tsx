import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReturns } from '../context/ReturnsContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowLeft, Package, CheckCircle, Clock, Truck, MapPin } from 'lucide-react';

const TrackReturn = () => {
  const { id } = useParams<{ id: string }>();
  const { getReturnById } = useReturns();
  
  const returnRequest = id ? getReturnById(id) : undefined;

  if (!returnRequest) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Return Not Found</h1>
          <p className="text-muted-foreground mb-6">The return request you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/returns">Back to Returns</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Mock tracking events for demo
  const trackingEvents = [
    {
      date: '2024-01-18',
      time: '10:30 AM',
      status: 'Return request approved',
      description: 'Your return request has been approved. Please ship the item back to us.',
      location: 'Customer Service Center',
      completed: true
    },
    {
      date: '2024-01-19',
      time: '2:15 PM',
      status: 'Return label generated',
      description: 'Return shipping label has been generated and sent to your email.',
      location: 'Logistics Center',
      completed: true
    },
    {
      date: '2024-01-20',
      time: '9:45 AM',
      status: 'Package picked up',
      description: 'Package has been picked up by our carrier.',
      location: 'Customer Address',
      completed: returnRequest.status !== 'approved'
    },
    {
      date: '2024-01-21',
      time: '11:20 AM',
      status: 'In transit',
      description: 'Package is in transit to our returns processing center.',
      location: 'Distribution Hub',
      completed: returnRequest.status === 'processing' || returnRequest.status === 'completed'
    },
    {
      date: '2024-01-22',
      time: '3:30 PM',
      status: 'Delivered to returns center',
      description: 'Package has been delivered to our returns processing center.',
      location: 'Returns Processing Center',
      completed: returnRequest.status === 'processing' || returnRequest.status === 'completed'
    },
    {
      date: '2024-01-23',
      time: '1:00 PM',
      status: 'Item inspected',
      description: 'Item has been inspected and approved for refund.',
      location: 'Quality Control Department',
      completed: returnRequest.status === 'completed'
    },
    {
      date: '2024-01-24',
      time: '4:45 PM',
      status: 'Refund processed',
      description: 'Refund has been processed and will appear in your account within 3-5 business days.',
      location: 'Finance Department',
      completed: returnRequest.status === 'completed'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'processing': return 'secondary';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/returns" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Returns
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Track Return #{returnRequest.id}</h1>
        <p className="text-muted-foreground">Monitor your return request progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Return Details */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Return Details
                <Badge variant={getStatusColor(returnRequest.status)} className="flex items-center gap-1">
                  {getStatusIcon(returnRequest.status)}
                  {returnRequest.status.charAt(0).toUpperCase() + returnRequest.status.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Return ID</h4>
                <p className="text-sm text-muted-foreground">{returnRequest.id}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Order ID</h4>
                <p className="text-sm text-muted-foreground">{returnRequest.orderId}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Request Date</h4>
                <p className="text-sm text-muted-foreground">{new Date(returnRequest.date).toLocaleDateString()}</p>
              </div>
              {returnRequest.trackingNumber && (
                <div>
                  <h4 className="font-medium mb-1">Tracking Number</h4>
                  <p className="text-sm text-muted-foreground font-mono">{returnRequest.trackingNumber}</p>
                </div>
              )}
              <div>
                <h4 className="font-medium mb-1">Refund Amount</h4>
                <p className="text-sm text-muted-foreground font-medium">${returnRequest.refundAmount.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Return Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {returnRequest.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{item.name}</h5>
                      <p className="text-xs text-muted-foreground">
                        Size: {item.size} • Qty: {item.returnQuantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tracking Timeline */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Tracking Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {trackingEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4 pb-6 last:pb-0">
                    {/* Timeline line */}
                    {index < trackingEvents.length - 1 && (
                      <div className="absolute left-4 top-8 w-px h-16 bg-border"></div>
                    )}
                    
                    {/* Status icon */}
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                      event.completed 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground border-2 border-border'
                    }`}>
                      {event.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    
                    {/* Event details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium text-sm ${
                          event.completed ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {event.status}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {event.date} • {event.time}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        event.completed ? 'text-muted-foreground' : 'text-muted-foreground/70'
                      }`}>
                        {event.description}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackReturn;