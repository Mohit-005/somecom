import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-content px-4 py-section">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-8">Please Log In</h1>
            <p className="text-muted-foreground mb-8">You need to be logged in to view your wishlist</p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemoveFromWishlist = (productId: number, productName: string) => {
    removeFromWishlist(productId);
    toast({
      title: "Removed from wishlist",
      description: `${productName} has been removed from your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-content px-4 py-section">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <div className="space-x-3">
            {items.length > 0 && (
              <Button variant="outline" onClick={clearWishlist}>
                Clear All
              </Button>
            )}
            <Link to="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-light mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save items you love to your wishlist for later</p>
            <Link to="/shop">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <div className="relative">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-[3/4] object-cover transition-transform group-hover:scale-105"
                    />
                  </Link>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                    onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {item.isNew && (
                    <Badge className="absolute top-3 left-3">New</Badge>
                  )}
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-medium hover:underline">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}