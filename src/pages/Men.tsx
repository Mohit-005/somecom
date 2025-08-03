import { ProductCard } from "@/components/ProductCard";
import product2 from "@/assets/product-2.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";

const menProducts = [
  {
    id: 2,
    image: product2,
    name: "Classic Denim Jacket",
    price: 185,
    originalPrice: 230,
  },
  {
    id: 4,
    image: product4,
    name: "Organic Cotton Tee",
    price: 45,
  },
  {
    id: 5,
    image: product5,
    name: "Wool Blend Coat",
    price: 450,
  },
];

export default function Men() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-content px-4 py-section">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Men's Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Essential pieces designed for the modern man. Quality craftsmanship 
            meets contemporary style in every garment.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <button className="nav-link text-base">All</button>
          <button className="nav-link text-base">Shirts</button>
          <button className="nav-link text-base">Pants</button>
          <button className="nav-link text-base">Jackets</button>
          <button className="nav-link text-base">Accessories</button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {menProducts.map((product) => (
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

        {/* Load More */}
        <div className="text-center">
          <button className="btn-outline">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
}