import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToNext = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {/* Use the AVIF as a background image with smooth animation */}
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat hero-background"
          style={{
            backgroundImage: 'url(/video/WhatsAppVideo2025-10-20at08.23.02-ezgif.com-video-to-avif-converter.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        ></div>
        
        {/* Smooth gradient overlay for dynamic effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Bottom shadow gradient for smooth transition */}
        <div className="absolute bottom-16 left-0 right-0 h-60 bg-gradient-to-b from-transparent to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <ScrollAnimation direction="fade" delay={0.2} duration={0.8}>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white">
                LuniQ Vape
                <span className="text-primary block">Kultowy z natury</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-2xl mx-auto px-4">
                Smak, który wyznacza standardy
              </p>
            </div>
          </ScrollAnimation>

        </div>
      </div>

      {/* Scroll Down Icon */}
      <ScrollAnimation direction="fade" delay={1.2} duration={0.8}>
        <button
          onClick={scrollToNext}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
          aria-label="Przewiń w dół"
        >
          <span className="text-xs uppercase tracking-wider font-medium">Przewiń</span>
          <ChevronDown className="w-6 h-6 animate-bounce" strokeWidth={2} />
        </button>
      </ScrollAnimation>
    </section>
  );
}
