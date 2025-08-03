import { ProductCard } from "@/components/ProductCard";
import product2 from "@/assets/product-2.jpg";
import product6 from "@/assets/product-6.jpg";

const saleProducts = [
  {
    id: 2,
    image: product2,
    name: "Classic Denim Jacket",
    price: 185,
    originalPrice: 230,
  },
  {
    id: 6,
    image: product6,
    name: "Classic Oxford Shirt",
    price: 125,
    originalPrice: 155,
  },
];

export default function Sale() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-content px-4 py-section">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Sale
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selected pieces at reduced prices. Same quality, same craftsmanship, 
            exceptional value.
          </p>
          <div className="mt-6 inline-block bg-destructive text-destructive-foreground px-4 py-2 text-sm font-medium">
            Up to 40% Off Selected Items
          </div>
        </div>

        {/* Sale Categories */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <button className="nav-link text-base">All Sale</button>
          <button className="nav-link text-base">Women's Sale</button>
          <button className="nav-link text-base">Men's Sale</button>
          <button className="nav-link text-base">Kids Sale</button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {saleProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
            />
          ))}
        </div>

        {/* Sale Info */}
        <div className="bg-muted/30 p-8 text-center">
          <h2 className="text-xl font-medium mb-4">Sale Terms</h2>
          <p className="text-sm text-muted-foreground">
            Sale prices are valid while stocks last. No additional discounts apply. 
            Standard return policy applies to all sale items.
          </p>
        </div>
      </div>
    </div>
  );
}