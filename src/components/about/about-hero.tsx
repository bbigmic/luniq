import { Card, CardContent } from '@/components/ui/card';
import { Package, Users, Award, Globe } from 'lucide-react';

export function AboutHero() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            About Our
            <span className="text-primary block">E-Commerce Platform</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
            We're passionate about providing the best online shopping experience with 
            cutting-edge technology and exceptional customer service.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">10,000+</h3>
                <p className="text-muted-foreground">Products</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">50,000+</h3>
                <p className="text-muted-foreground">Happy Customers</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">5+</h3>
                <p className="text-muted-foreground">Years Experience</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">100+</h3>
                <p className="text-muted-foreground">Countries Served</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
