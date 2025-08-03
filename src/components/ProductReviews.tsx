import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah M.',
    rating: 5,
    date: '2024-01-10',
    title: 'Perfect fit and quality',
    content: 'This sweater is exactly what I was looking for. The cashmere is incredibly soft and the fit is perfect. Will definitely be ordering more colors!',
    verified: true
  },
  {
    id: '2',
    author: 'Michael R.',
    rating: 4,
    date: '2024-01-05',
    title: 'Great quality, runs slightly large',
    content: 'Beautiful sweater with excellent craftsmanship. Only note is that it runs a bit large, so consider sizing down. Overall very happy with the purchase.',
    verified: true
  },
  {
    id: '3',
    author: 'Jennifer K.',
    rating: 5,
    date: '2023-12-28',
    title: 'Love it!',
    content: 'Soft, comfortable, and stylish. This has become my go-to sweater for both work and weekend. Highly recommend!',
    verified: true
  }
];

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const { toast } = useToast();

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;
  const totalReviews = mockReviews.length;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !newReview.trim()) {
      toast({
        title: "Please complete your review",
        description: "Please add a rating and comment before submitting.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback. Your review will be published shortly.",
    });

    setNewReview('');
    setRating(0);
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void, onStarHover?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => onStarClick?.(star) : undefined}
            onMouseEnter={interactive ? () => onStarHover?.(star) : undefined}
            onMouseLeave={interactive ? () => onStarHover?.(0) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customer Reviews</span>
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({totalReviews} reviews)
              </span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Write a Review */}
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-1">
                {renderStars(
                  hoveredStar || rating, 
                  true, 
                  setRating, 
                  setHoveredStar
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <Textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={4}
              />
            </div>
            
            <Button type="submit">Submit Review</Button>
          </form>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {mockReviews.map((review, index) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.author}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-muted-foreground">{review.content}</p>
                </div>
              </div>
            </CardContent>
            {index < mockReviews.length - 1 && <Separator />}
          </Card>
        ))}
      </div>
    </div>
  );
}