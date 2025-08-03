import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ArrowLeft } from "lucide-react";
import { DeliveryEstimate } from "@/components/DeliveryEstimate";
import { ProductReviews } from "@/components/ProductReviews";
import ProductFeatures from "@/components/ProductFeatures";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const products = [
  {
    id: 1,
    image: product1,
    name: "Cashmere Crew Sweater",
    price: 295,
    isNew: true,
    category: 'women' as const,
    description: "Luxuriously soft cashmere sweater in a classic crew neck silhouette. Perfect for layering or wearing on its own.",
  },
  {
    id: 2,
    image: product2,
    name: "Classic Denim Jacket",
    price: 185,
    originalPrice: 230,
    category: 'men' as const,
    description: "Timeless denim jacket crafted from premium organic cotton. A versatile piece that gets better with age.",
  },
  {
    id: 3,
    image: product3,
    name: "Linen Wide-Leg Trouser",
    price: 165,
    isNew: true,
    category: 'women' as const,
    description: "Effortlessly elegant wide-leg trousers in breathable linen. Perfect for warm weather styling.",
  },
  {
    id: 4,
    image: product4,
    name: "Organic Cotton Tee",
    price: 45,
    category: 'men' as const,
    description: "Essential organic cotton tee with a relaxed fit. Sustainably made and incredibly comfortable.",
  },
  {
    id: 5,
    image: product5,
    name: "Wool Blend Coat",
    price: 450,
    category: 'men' as const,
    description: "Sophisticated wool blend coat with clean lines and impeccable tailoring. Perfect for cooler weather.",
  },
  {
    id: 6,
    image: product6,
    name: "Classic Oxford Shirt",
    price: 125,
    originalPrice: 155,
    category: 'women' as const,
    description: "Crisp oxford shirt in premium cotton. A wardrobe staple that works for any occasion.",
  },
];

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Product not found</h1>
          <Link to="/shop">
            <Button variant="outline" className="rounded-none">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-content px-4 py-section">
        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              {product.isNew && (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-foreground text-background mb-4">
                  NEW
                </span>
              )}
              <h1 className="text-3xl font-light mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-medium">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-4">Size</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border border-border hover:border-foreground transition-colors ${
                      selectedSize === size ? 'bg-foreground text-background' : ''
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full rounded-none"
                size="lg"
              >
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                className="w-full rounded-none"
                size="lg"
              >
                Add to Wishlist
              </Button>
            </div>

            {/* Product Features */}
            <ProductFeatures />

            {/* Delivery Estimate */}
            <DeliveryEstimate />

            {/* Product Details */}
            <div className="space-y-4 pt-8 border-t border-border">
              <h3 className="font-medium">Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Premium materials</li>
                <li>• Sustainable production</li>
                <li>• Classic fit</li>
                <li>• Care: Machine wash cold</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Reviews Section */}
        <div className="mt-16">
          <ProductReviews productId={product.id} />
        </div>
      </div>
    </div>
  );
}