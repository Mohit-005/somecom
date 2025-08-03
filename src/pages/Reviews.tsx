import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Star, ArrowLeft } from 'lucide-react';

const Reviews = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<{ [key: number]: { rating: number; comment: string } }>({});

  const order = orderId ? getOrderById(orderId) : null;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Leave a Review</h1>
          <p className="text-muted-foreground mb-6">Please log in to leave a review.</p>
          <Button onClick={() => navigate('/login')}>Log In</Button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">The order you're trying to review doesn't exist.</p>
          <Button onClick={() => navigate('/orders')}>Back to Orders</Button>
        </div>
      </div>
    );
  }

  const handleRatingChange = (itemId: number, rating: number) => {
    setReviews(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        rating
      }
    }));
  };

  const handleCommentChange = (itemId: number, comment: string) => {
    setReviews(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        comment
      }
    }));
  };

  const handleSubmitReviews = () => {
    const reviewedItems = Object.keys(reviews).filter(
      itemId => reviews[parseInt(itemId)]?.rating > 0
    );

    if (reviewedItems.length === 0) {
      toast({
        title: "No reviews submitted",
        description: "Please rate at least one item before submitting.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Reviews submitted!",
      description: `Thank you for reviewing ${reviewedItems.length} item(s). Your feedback helps other customers.`,
    });

    navigate('/orders');
  };

  const StarRating = ({ itemId, currentRating }: { itemId: number; currentRating: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(itemId, star)}
            className={`transition-colors ${
              star <= currentRating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Button>
        <h1 className="text-3xl font-bold mb-2">Leave a Review</h1>
        <p className="text-muted-foreground">Order #{order.id} - {new Date(order.date).toLocaleDateString()}</p>
      </div>

      <div className="space-y-6">
        {order.items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-lg">Review {item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 object-cover rounded-md"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} • Price: ${item.price}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium">Your Rating</Label>
                    <div className="mt-2">
                      <StarRating 
                        itemId={item.id} 
                        currentRating={reviews[item.id]?.rating || 0} 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`comment-${item.id}`}>Your Review (Optional)</Label>
                    <Textarea
                      id={`comment-${item.id}`}
                      placeholder="Share your experience with this product..."
                      value={reviews[item.id]?.comment || ''}
                      onChange={(e) => handleCommentChange(item.id, e.target.value)}
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleSubmitReviews} size="lg">
          Submit Reviews
        </Button>
      </div>
    </div>
  );
};

export default Reviews;