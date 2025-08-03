import { ProductCard } from "@/components/ProductCard";
import product4 from "@/assets/product-4.jpg";

const kidsProducts = [
  {
    id: 7,
    image: product4,
    name: "Kids Organic Cotton Tee",
    price: 25,
  },
];

export default function Kids() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-content px-4 py-section">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Kids Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comfortable, durable pieces designed for little ones. 
            Made with the same attention to quality and sustainability.
          </p>
        </div>

        {/* Age Groups */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <button className="nav-link text-base">All</button>
          <button className="nav-link text-base">Baby (0-2)</button>
          <button className="nav-link text-base">Toddler (2-4)</button>
          <button className="nav-link text-base">Kids (4-8)</button>
          <button className="nav-link text-base">Youth (8-14)</button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {kidsProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>

        {/* Coming Soon */}
        <div className="text-center py-16">
          <h2 className="text-2xl font-light mb-4">More Styles Coming Soon</h2>
          <p className="text-muted-foreground mb-8">
            We're expanding our kids collection with more sustainable and comfortable options
          </p>
          <button className="btn-outline">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}