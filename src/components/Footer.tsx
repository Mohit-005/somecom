import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { Instagram, Twitter, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto max-w-content px-4">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-border">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-medium mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to receive updates on new arrivals, exclusive offers, and style inspiration.
            </p>
            
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="flex-1 bg-background"
              />
              <Button className="rounded-none px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">EVORA</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Timeless fashion for the conscious consumer. Quality craftsmanship meets sustainable design.
              </p>
            </div>

            {/* Shop */}
            <div className="space-y-4">
              <h5 className="font-medium">Shop</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/women" className="hover:text-foreground transition-colors">Women</Link></li>
                <li><Link to="/men" className="hover:text-foreground transition-colors">Men</Link></li>
                <li><Link to="/kids" className="hover:text-foreground transition-colors">Kids</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Accessories</a></li>
                <li><Link to="/sale" className="hover:text-foreground transition-colors">Sale</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h5 className="font-medium">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h5 className="font-medium">Company</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 EVORA. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}