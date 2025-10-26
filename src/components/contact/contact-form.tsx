'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: 'Kontakt z formularza',
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Wiadomość wysłana pomyślnie! Odpowiemy w ciągu 24 godzin.');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        toast.error(data.error || 'Nie udało się wysłać wiadomości. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast.error('Nie udało się wysłać wiadomości. Sprawdź połączenie i spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        Wyślij nam wiadomość
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="firstName" className="text-white text-base block mb-2">
            Imię *
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="h-12 text-base bg-white"
          />
        </div>

        <div>
          <Label htmlFor="lastName" className="text-white text-base block mb-2">
            Nazwisko *
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="h-12 text-base bg-white"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-white text-base block mb-2">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="h-12 text-base bg-white"
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-white text-base block mb-2">
            Wiadomość *
          </Label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-3 py-3 border border-gray-600 bg-white rounded-md resize-none text-base"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base bg-gray-700 text-white hover:bg-gray-600"
        >
          {isSubmitting ? 'WYSYŁANIE...' : 'WYŚLIJ'}
        </Button>
      </form>
    </div>
  );
}
