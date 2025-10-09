import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactInfo } from '@/components/contact/contact-info';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get in Touch</h2>
            <Suspense fallback={<div>Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h2>
            <ContactInfo />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
