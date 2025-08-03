import heroImage from "@/assets/hero-image.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export default function Lookbook() {
  const lookbookImages = [
    { image: heroImage, title: "Autumn Essentials", description: "Timeless pieces for the changing season" },
    { image: product1, title: "Minimalist Wardrobe", description: "Clean lines and neutral tones" },
    { image: product2, title: "Modern Classics", description: "Updated takes on wardrobe staples" },
    { image: product3, title: "Effortless Elegance", description: "Sophisticated simplicity" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-content px-4 py-section">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Lookbook
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Style inspiration and seasonal collections showcasing the versatility 
            and timeless appeal of our pieces.
          </p>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {lookbookImages.map((item, index) => (
            <div key={index} className="space-y-6">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-light mb-4">Get The Look</h2>
          <p className="text-muted-foreground mb-8">
            Shop the pieces featured in our latest lookbook
          </p>
          <button className="btn-outline">
            Shop Featured Items
          </button>
        </div>
      </div>
    </div>
  );
}