import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-content px-4 py-section">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8 text-center">
            Contact Us
          </h1>
          
          <p className="text-center text-muted-foreground mb-12">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input className="bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input className="bg-background" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" className="bg-background" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input className="bg-background" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea rows={6} className="bg-background" />
            </div>
            
            <Button className="w-full rounded-none" size="lg">
              Send Message
            </Button>
          </form>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div>
              <h3 className="font-medium mb-2">Customer Service</h3>
              <p className="text-muted-foreground">hello@evora.com</p>
              <p className="text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Press Inquiries</h3>
              <p className="text-muted-foreground">press@evora.com</p>
              <p className="text-muted-foreground">24-48 hour response</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}