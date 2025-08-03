export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-content px-4 py-section">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8 text-center">
            About EVORA
          </h1>
          
          <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
            <p>
              Founded on the principle that fashion should be both beautiful and responsible, 
              EVORA represents a new approach to clothing design—one that values quality over quantity, 
              sustainability over trends.
            </p>
            
            <p>
              Every piece in our collection is thoughtfully designed and ethically made, 
              using only the finest sustainable materials. We believe in creating timeless 
              garments that will remain relevant and loved for years to come.
            </p>
            
            <p>
              Our commitment extends beyond just clothing. We work closely with our manufacturing 
              partners to ensure fair working conditions and environmental responsibility throughout 
              our supply chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-4">Sustainability</h3>
              <p className="text-muted-foreground">
                100% sustainable materials and ethical production processes
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium mb-4">Quality</h3>
              <p className="text-muted-foreground">
                Premium craftsmanship ensuring longevity and timeless appeal
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium mb-4">Design</h3>
              <p className="text-muted-foreground">
                Minimalist aesthetic focused on essential, versatile pieces
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}