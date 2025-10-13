import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm sm:text-base">
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, or contact us for support.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Payment information (processed securely through Stripe)</li>
                  <li>Shipping and billing addresses</li>
                  <li>Order history and preferences</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm sm:text-base">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer support</li>
                  <li>Send you updates about your orders</li>
                  <li>Improve our products and services</li>
                  <li>Send you marketing communications (with your consent)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy. We may share information with 
                  trusted service providers who assist us in operating our website and conducting business.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. All payment information is 
                  processed securely through Stripe and is not stored on our servers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 space-y-2 text-sm sm:text-base">
                  <p>Email: privacy@ecommerce.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Commerce St, City, State 12345</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
