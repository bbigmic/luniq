'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Proszę podać adres email');
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    toast.success('Pomyślnie zapisano do newslettera!');
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="py-12 sm:py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up" delay={0.2} duration={0.8} distance={40}>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="space-y-4 sm:space-y-6">
                <ScrollAnimation direction="fade" delay={0.4} duration={0.6}>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation direction="fade" delay={0.6} duration={0.6}>
                  <div className="space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-bold">Bądź na bieżąco</h2>
                    <p className="text-base sm:text-lg text-muted-foreground">
                      Zapisz się do naszego newslettera i bądź pierwszy, który dowie się o nowych produktach, 
                      ekskluzywnych ofertach i specjalnych promocjach.
                    </p>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation direction="up" delay={0.8} duration={0.6} distance={20}>
                  {isSubscribed ? (
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">Dziękujemy za zapisanie się!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                      <Input
                        type="email"
                        placeholder="Wprowadź swój email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 h-12 text-base"
                      />
                      <Button type="submit" className="sm:w-auto h-12 px-6 text-base">
                        Zapisz się
                      </Button>
                    </form>
                  )}
                </ScrollAnimation>

                <ScrollAnimation direction="fade" delay={1.0} duration={0.6}>
                  <p className="text-sm text-muted-foreground">
                    Szanujemy Twoją prywatność. Możesz wypisać się w każdej chwili.
                  </p>
                </ScrollAnimation>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
}
