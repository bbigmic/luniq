import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RotateCcw, Clock, Package, AlertCircle, CheckCircle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Returns & Exchanges</h1>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
              Easy returns and exchanges within 30 days
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8">
            {/* Return Policy Banner */}
            <Card className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
              <CardContent className="p-6 text-center">
                <RotateCcw className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold mb-2">30-Day Return Policy</h2>
                <p className="text-muted-foreground">
                  Not satisfied? Return any item within 30 days for a full refund
                </p>
              </CardContent>
            </Card>

            {/* Return Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>How to Return an Item</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Contact Us</h3>
                      <p className="text-sm text-muted-foreground">
                        Email us at returns@ecommerce.com or call +1 (555) 123-4567 to initiate your return
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Get Return Authorization</h3>
                      <p className="text-sm text-muted-foreground">
                        We'll provide you with a return authorization number and shipping instructions
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Package & Ship</h3>
                      <p className="text-sm text-muted-foreground">
                        Pack the item securely and ship it back using the provided return label
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Receive Refund</h3>
                      <p className="text-sm text-muted-foreground">
                        Once we receive and inspect your return, we'll process your refund within 5-7 business days
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Return Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Return Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>What's Required</span>
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Item must be in original condition</li>
                      <li>• All original packaging included</li>
                      <li>• Tags and labels still attached</li>
                      <li>• Return within 30 days of delivery</li>
                      <li>• Return authorization number</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span>What's Not Eligible</span>
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Items damaged by misuse</li>
                      <li>• Items without original packaging</li>
                      <li>• Personalized or custom items</li>
                      <li>• Items returned after 30 days</li>
                      <li>• Items with removed tags</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exchange Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Exchange Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm sm:text-base">
                  Need a different size or color? We offer free exchanges within 30 days of purchase. 
                  Simply follow the return process and specify that you'd like an exchange instead of a refund.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Exchange Benefits:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Free return shipping for exchanges</li>
                    <li>• Priority processing for exchange orders</li>
                    <li>• No restocking fees</li>
                    <li>• Extended exchange period for gift purchases</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Refund Information */}
            <Card>
              <CardHeader>
                <CardTitle>Refund Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Refund Timeline</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Processing: 1-2 business days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>Inspection: 2-3 business days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Refund: 3-5 business days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Refund Methods</h3>
                    <div className="space-y-2 text-sm">
                      <p>• Credit card: Refunded to original payment method</p>
                      <p>• PayPal: Refunded to PayPal account</p>
                      <p>• Store credit: Available immediately</p>
                      <p>• Bank transfer: 5-7 business days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help with Returns?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base mb-4">
                  Our customer service team is here to help with any questions about returns or exchanges.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Contact Information</h4>
                    <div className="space-y-1 text-sm">
                      <p>Email: returns@ecommerce.com</p>
                      <p>Phone: +1 (555) 123-4567</p>
                      <p>Live Chat: Available 24/7</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Business Hours</h4>
                    <div className="space-y-1 text-sm">
                      <p>Monday - Friday: 9 AM - 6 PM EST</p>
                      <p>Saturday: 10 AM - 4 PM EST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full sm:w-auto">
                    Start Return Process
                  </Button>
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
