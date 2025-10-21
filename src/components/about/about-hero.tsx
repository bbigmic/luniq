import { Card, CardContent } from '@/components/ui/card';
import { Package, Users, Award, Globe } from 'lucide-react';

export function AboutHero() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
            O naszej
            <span className="text-primary block">Platformie E-Commerce</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
            Jesteśmy pasjonatami dostarczania najlepszych doświadczeń zakupowych online z 
            najnowocześniejszą technologią i wyjątkową obsługą klienta.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">10,000+</h3>
                <p className="text-base text-muted-foreground">Produktów</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">50,000+</h3>
                <p className="text-base text-muted-foreground">Zadowolonych klientów</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">5+</h3>
                <p className="text-base text-muted-foreground">Lat doświadczenia</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">100+</h3>
                <p className="text-base text-muted-foreground">Obsługiwanych krajów</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
