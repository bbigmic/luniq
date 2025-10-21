import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, Shield, Package } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Shipping Information</h1>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
              Fast, reliable shipping to get your products to you quickly
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8">
            {/* Free Shipping Banner */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Free Shipping on Orders Over 200 PLN</h2>
                <p className="text-muted-foreground">
                  Enjoy free standard shipping on all orders 200 PLN and above
                </p>
              </CardContent>
            </Card>

            {/* Shipping Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Shipping Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Truck className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Standard Shipping</h3>
                      <p className="text-sm text-muted-foreground">5-7 business days</p>
                      <p className="text-sm text-muted-foreground">25 PLN or FREE on orders 200 PLN+</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Express Shipping</h3>
                      <p className="text-sm text-muted-foreground">2-3 business days</p>
                      <p className="text-sm text-muted-foreground">55 PLN</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Overnight Shipping</h3>
                      <p className="text-sm text-muted-foreground">Next business day</p>
                      <p className="text-sm text-muted-foreground">105 PLN</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Package className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">International</h3>
                      <p className="text-sm text-muted-foreground">7-14 business days</p>
                      <p className="text-sm text-muted-foreground">85 PLN</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Process */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Order Processing</h3>
                      <p className="text-sm text-muted-foreground">
                        Orders are processed within 1-2 business days of payment confirmation
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Packaging</h3>
                      <p className="text-sm text-muted-foreground">
                        Your items are carefully packaged to ensure safe delivery
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Shipping</h3>
                      <p className="text-sm text-muted-foreground">
                        Your package is shipped and you'll receive tracking information
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Delivery</h3>
                      <p className="text-sm text-muted-foreground">
                        Your package arrives safely at your doorstep
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">Note</Badge>
                    <p className="text-sm">
                      Delivery times are estimates and may vary due to weather, holidays, or other factors beyond our control.
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">Note</Badge>
                    <p className="text-sm">
                      International orders may be subject to customs duties and taxes, which are the customer's responsibility.
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">Note</Badge>
                    <p className="text-sm">
                      We ship to most countries worldwide. Please check our shipping calculator at checkout for availability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Questions About Shipping?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base mb-4">
                  If you have any questions about shipping, delivery times, or tracking your order, 
                  please don't hesitate to contact us:
                </p>
                <div className="space-y-2 text-sm sm:text-base">
                  <p>Email: shipping@ecommerce.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Live Chat: Available 24/7 on our website</p>
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
