import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock,
  Search,
  Book,
  Users
} from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
              Find answers to common questions and get the support you need
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-sm">Live Chat</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Phone className="h-6 w-6" />
                    <span className="text-sm">Call Us</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Mail className="h-6 w-6" />
                    <span className="text-sm">Email Support</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Book className="h-6 w-6" />
                    <span className="text-sm">FAQ</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Categories */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ordering & Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">How do I place an order?</h4>
                    <p className="text-sm text-muted-foreground">
                      Simply browse our products, add items to your cart, and proceed to checkout. 
                      You can pay with credit card, PayPal, or other supported payment methods.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">What payment methods do you accept?</h4>
                    <p className="text-sm text-muted-foreground">
                      We accept all major credit cards (Visa, Mastercard, American Express), 
                      PayPal, Apple Pay, and Google Pay.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Is my payment information secure?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, all payments are processed securely through Stripe. We never store 
                      your payment information on our servers.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping & Delivery</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">How long does shipping take?</h4>
                    <p className="text-sm text-muted-foreground">
                      Standard shipping takes 5-7 business days. Express shipping (2-3 days) 
                      and overnight shipping are also available.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Do you offer free shipping?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes! We offer free standard shipping on all orders over $50. 
                      International shipping is available for $19.99.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Can I track my order?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, once your order ships, you'll receive a tracking number via email 
                      to monitor your package's progress.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Returns & Exchanges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">What is your return policy?</h4>
                    <p className="text-sm text-muted-foreground">
                      We offer a 30-day return policy. Items must be in original condition 
                      with all packaging and tags included.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">How do I return an item?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact our customer service team to get a return authorization number, 
                      then ship the item back using the provided return label.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Are exchanges free?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, exchanges are free within 30 days. We'll provide a prepaid return 
                      label for your convenience.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account & Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">How do I create an account?</h4>
                    <p className="text-sm text-muted-foreground">
                      Click "Sign Up" in the top right corner and provide your email address 
                      and create a password. You can also sign up with Google.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">I forgot my password</h4>
                    <p className="text-sm text-muted-foreground">
                      Click "Forgot Password" on the sign-in page and enter your email address. 
                      We'll send you a reset link.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">How do I update my account information?</h4>
                    <p className="text-sm text-muted-foreground">
                      Sign in to your account and go to "Account Settings" to update your 
                      personal information, shipping addresses, and preferences.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Contact Our Support Team</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Live Chat</h3>
                      <p className="text-sm text-muted-foreground">Available 24/7</p>
                      <Button size="sm" className="mt-2">Start Chat</Button>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone Support</h3>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-xs text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email Support</h3>
                      <p className="text-sm text-muted-foreground">support@ecommerce.com</p>
                      <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Order Status
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Shipping Times
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Return Policy
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Payment Issues
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Account Setup
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Product Information
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    International Orders
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Gift Cards
                  </Badge>
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
