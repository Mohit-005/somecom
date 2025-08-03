import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useCountUp } from "@/hooks/useCountUp"
import heroImage from "@/assets/hero-image.jpg"

export function HeroSection() {
  const premiumPieces = useCountUp({ end: 500, suffix: '+', duration: 2500 });
  const sustainable = useCountUp({ end: 100, suffix: '%', duration: 2000 });
  const countries = useCountUp({ end: 50, suffix: '+', duration: 2200 });
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container mx-auto max-w-content px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px] py-section">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="hero-text">
                Timeless
                <br />
                <span className="text-muted-foreground">Elegance</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Discover our curated collection of premium essentials designed for the modern minimalist.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="lg" className="rounded-none">
                  Shop Collection
                </Button>
              </Link>
              <Link to="/lookbook">
                <Button variant="outline" size="lg" className="rounded-none">
                  View Lookbook
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <p ref={premiumPieces.ref} className="text-2xl font-light animate-fade-in">
                  {premiumPieces.count}
                </p>
                <p className="text-sm text-muted-foreground">Premium Pieces</p>
              </div>
              <div>
                <p ref={sustainable.ref} className="text-2xl font-light animate-fade-in">
                  {sustainable.count}
                </p>
                <p className="text-sm text-muted-foreground">Sustainable</p>
              </div>
              <div>
                <p ref={countries.ref} className="text-2xl font-light animate-fade-in">
                  {countries.count}
                </p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={heroImage}
                alt="Fashion Hero"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 bg-card/95 backdrop-blur p-6 max-w-sm shadow-large">
              <h3 className="font-medium mb-2">New Season</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Essential pieces crafted from the finest materials
              </p>
              <Link to="/shop">
                <Button variant="outline" size="sm" className="rounded-none">
                  Explore Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}