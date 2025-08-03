import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-content px-4 py-section">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-8">Your Cart</h1>
            <div className="max-w-md mx-auto">
              <p className="text-muted-foreground mb-8">Your shopping cart is empty</p>
              <Link to="/shop">
                <Button className="rounded-none">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-content px-4 py-section">
        <h1 className="text-4xl font-light mb-12 text-center">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 p-6 border border-border">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-32 object-cover"
                />
                
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.size && (
                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                  )}
                  <p className="font-medium">${item.price}</p>
                  
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <Button
              variant="outline"
              onClick={clearCart}
              className="rounded-none"
            >
              Clear Cart
            </Button>
          </div>
          
          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-muted/30 p-6 space-y-4">
              <h2 className="text-xl font-medium">Order Summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              <Link to="/checkout" className="block">
                <Button className="w-full rounded-none">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <Link to="/shop" className="block">
                <Button variant="outline" className="w-full rounded-none">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}