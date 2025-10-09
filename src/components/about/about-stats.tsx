import { Card, CardContent } from '@/components/ui/card';

export function AboutStats() {
  const stats = [
    {
      number: '99.9%',
      label: 'Uptime',
      description: 'Reliable service with minimal downtime'
    },
    {
      number: '< 2s',
      label: 'Load Time',
      description: 'Lightning-fast page loading speeds'
    },
    {
      number: '24/7',
      label: 'Support',
      description: 'Round-the-clock customer assistance'
    },
    {
      number: 'SSL',
      label: 'Security',
      description: 'Bank-level encryption for all transactions'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to delivering exceptional performance and reliability
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
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
          ))}
        </div>
      </div>
    </section>
  );
}
