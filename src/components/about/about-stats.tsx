import { Card, CardContent } from '@/components/ui/card';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

export function AboutStats() {
  const stats = [
    {
      number: '99.9%',
      label: 'Czas działania',
      description: 'Niezawodna usługa z minimalnym czasem przestoju'
    },
    {
      number: '< 2s',
      label: 'Czas ładowania',
      description: 'Błyskawicznie szybkie ładowanie stron'
    },
    {
      number: '24/7',
      label: 'Wsparcie',
      description: 'Całodobowa pomoc klienta'
    },
    {
      number: 'SSL',
      label: 'Bezpieczeństwo',
      description: 'Szyfrowanie na poziomie bankowym dla wszystkich transakcji'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="fade" delay={0.2} duration={0.8}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dlaczego wybrać nas?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jesteśmy zaangażowani w dostarczanie wyjątkowej wydajności i niezawodności
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <ScrollAnimation 
              key={index} 
              direction="up" 
              delay={0.4 + (index * 0.1)} 
              duration={0.6} 
              distance={30}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
