import { ProductCard } from "./ProductCard"
import { Link } from "react-router-dom"
import product1 from "@/assets/product-1.jpg"
import product2 from "@/assets/product-2.jpg"
import product3 from "@/assets/product-3.jpg"
import product4 from "@/assets/product-4.jpg"
import product5 from "@/assets/product-5.jpg"
import product6 from "@/assets/product-6.jpg"

const products = [
  {
    id: 1,
    image: product1,
    name: "Cashmere Crew Sweater",
    price: 295,
    isNew: true,
  },
  {
    id: 2,
    image: product2,
    name: "Classic Denim Jacket",
    price: 185,
    originalPrice: 230,
  },
  {
    id: 3,
    image: product3,
    name: "Linen Wide-Leg Trouser",
    price: 165,
    isNew: true,
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
  {
    id: 6,
    image: product6,
    name: "Classic Oxford Shirt",
    price: 125,
    originalPrice: 155,
  },
]

export function ProductGrid() {
  return (
    <section className="py-section bg-background">
      <div className="container mx-auto max-w-content px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Carefully selected pieces that embody our commitment to quality and timeless design
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
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

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link to="/shop">
            <button className="btn-outline">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}