import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/footer-bg.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/luniq-logo-new.png" 
                alt="Luniq Logo" 
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="text-lg font-bold text-white">LuniQ Vape</span>
            </div>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-white/80 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-white/80 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-white/80 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Informacje kontaktowe</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <Mail className="h-4 w-4" />
                <span>support@luniq-five.vercel.app</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <Phone className="h-4 w-4" />
                <span>+48 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <MapPin className="h-4 w-4" />
                <span>ul. Przykładowa 123, Warszawa, Polska</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white/70">
            © 2024 LuniQ Vape. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
