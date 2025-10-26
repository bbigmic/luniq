import { ContactForm } from '@/components/contact/contact-form';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        {/* Top Section with Blurred Background */}
        <div className="relative h-[400px] overflow-hidden">
          {/* Background Image with Blur */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-sm"
            style={{
              backgroundImage: "url('/images/bg-ct.avif')"
            }}
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Skontaktuj się z nami
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl">
              Skontaktuj się z nami. Jesteśmy tutaj, aby Ci pomóc i odpowiedzieć na pytania.
            </p>
          </div>
        </div>

        {/* Bottom Section with Contact Info and Form */}
        <div className="bg-black py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Contact Info */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                  Skontaktuj się z nami
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white text-lg">+48 123 456 789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white text-lg">kontakt@przyklad.pl</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}