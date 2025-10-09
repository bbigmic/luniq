import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function ContactInfo() {
  const contactDetails = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      details: ['support@ecommerce.com', 'sales@ecommerce.com'],
      description: 'We typically respond within 24 hours'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Address',
      details: ['123 Commerce Street', 'New York, NY 10001', 'United States'],
      description: 'Visit our showroom'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed'],
      description: 'Eastern Time Zone'
    }
  ];

  return (
    <div className="space-y-6">
      {contactDetails.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <div className="space-y-1">
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  {item.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">How long does shipping take?</h4>
              <p className="text-sm text-muted-foreground">
                Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery.
              </p>
            </div>
            <div>
              <h4 className="font-medium">What is your return policy?</h4>
              <p className="text-sm text-muted-foreground">
                We offer a 30-day return policy for all items in original condition.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Do you offer international shipping?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, we ship worldwide. Shipping costs and delivery times vary by location.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
