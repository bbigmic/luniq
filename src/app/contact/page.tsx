import { ContactForm } from '@/components/contact/contact-form';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Skontaktuj się z nami</h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Chcielibyśmy usłyszeć od Ciebie. Wyślij nam wiadomość, a odpowiemy tak szybko, jak to możliwe.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skontaktuj się z nami</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-sm text-muted-foreground">support@luniq-five.vercel.app</p>
                      <p className="text-sm text-muted-foreground">sprzedaz@luniq-five.vercel.app</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Telefon</h3>
                      <p className="text-sm text-muted-foreground">+48 123 456 789</p>
                      <p className="text-sm text-muted-foreground">Bezpłatny: +48 800 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Adres</h3>
                      <p className="text-sm text-muted-foreground">
                        ul. Przykładowa 123<br />
                        Dzielnica Biznesowa<br />
                        Warszawa, 00-001<br />
                        Polska
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Godziny pracy</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Poniedziałek - Piątek: 9:00 - 18:00</p>
                        <p>Sobota: 10:00 - 16:00</p>
                        <p>Niedziela: Zamknięte</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dlaczego się z nami skontaktować?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Obsługa klienta</h4>
                    <p className="text-sm text-muted-foreground">
                      Potrzebujesz pomocy z zamówieniem, pytaniami o produkty lub problemami z kontem? 
                      Nasz zespół wsparcia jest tutaj, aby pomóc.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Zapytania biznesowe</h4>
                    <p className="text-sm text-muted-foreground">
                      Zainteresowany partnerstwem, zamówieniami hurtowymi lub możliwościami sprzedaży? 
                      Porozmawiajmy o tym, jak możemy współpracować.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Opinie i sugestie</h4>
                    <p className="text-sm text-muted-foreground">
                      Cenimy Twoją opinię! Podziel się swoimi przemyśleniami na temat tego, jak możemy poprawić 
                      Twoje doświadczenia zakupowe.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Czas odpowiedzi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Wsparcie email</span>
                      <span className="text-sm font-medium">W ciągu 24 godzin</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Wsparcie telefoniczne</span>
                      <span className="text-sm font-medium">Natychmiastowe</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Czat na żywo</span>
                      <span className="text-sm font-medium">W ciągu 5 minut</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}