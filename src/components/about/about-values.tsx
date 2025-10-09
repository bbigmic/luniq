import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Zap, Users } from 'lucide-react';

export function AboutValues() {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Customer First',
      description: 'Every decision we make is guided by what\'s best for our customers. We listen, learn, and continuously improve based on your feedback.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Security & Trust',
      description: 'Your data and privacy are our top priorities. We use industry-leading security measures to protect your information.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Innovation',
      description: 'We stay at the forefront of technology, constantly evolving our platform to provide the best possible shopping experience.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community',
      description: 'We believe in building a community of satisfied customers who trust us with their shopping needs.'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These core principles guide everything we do
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
