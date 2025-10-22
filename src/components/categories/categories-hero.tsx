import { ScrollAnimation } from '@/components/ui/scroll-animation';

export function CategoriesHero() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 text-center">
        <ScrollAnimation direction="fade" delay={0.2} duration={0.8}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Shop by
            <span className="text-primary block">Category</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of products organized by category. 
            Find exactly what you're looking for with ease.
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
}
