import { ProductCard } from "@/components/ProductCard";
import product1 from "@/assets/product-1.jpg";
import product3 from "@/assets/product-3.jpg";
import product6 from "@/assets/product-6.jpg";

const womenProducts = [
  {
    id: 1,
    image: product1,
    name: "Cashmere Crew Sweater",
    price: 295,
    isNew: true,
  },
  {
    id: 3,
    image: product3,
    name: "Linen Wide-Leg Trouser",
    price: 165,
    isNew: true,
  },
  {
    id: 6,
    image: product6,
    name: "Classic Oxford Shirt",
    price: 125,
    originalPrice: 155,
  },
];

export default function Women() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-content px-4 py-section">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Women's Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughtfully designed pieces that celebrate femininity through 
            clean lines, luxurious fabrics, and timeless silhouettes.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <button className="nav-link text-base">All</button>
          <button className="nav-link text-base">Dresses</button>
          <button className="nav-link text-base">Tops</button>
          <button className="nav-link text-base">Bottoms</button>
          <button className="nav-link text-base">Knitwear</button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {womenProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              isNew={product.isNew}
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