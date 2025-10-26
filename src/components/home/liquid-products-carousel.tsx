'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const productImages = [
  '/images/liquid_products/product1_mint_ice_mocna_mieta_ekstremalna_swiezosc_krystaliczna_czystosc_salt.jpg',
  '/images/liquid_products/product2_dragonfruit_strawberry_ice_tropikalna_slodkosc_soczysta_truskawka_lodowe_zakonczenie_salt.jpg',
  '/images/liquid_products/product3_papaya_aloe_kremowa_papaja_chlodny_swiezy_aloes_gladka_nuta_salt.jpg',
  '/images/liquid_products/product4_grape_passionfruit_intensywne_winogrono_orzezwiajaca_marakuja_idealna_rownowaga_salt.jpg',
  '/images/liquid_products/product5_melon_lychee_soczysty_melon_orientalne_kwiatowe_liczi_delikatna_lodowa_nuta_salt.jpg',
  '/images/liquid_products/product6_raspberry_mojito_ice_swieza_malina_mietowa_eksplozja_chlodny_cytrusowy_finisz_salt.jpg',
  '/images/liquid_products/product7_kiwi_guava_passionfruit_slodko_kwasne_kiwi_gladka_guawa_wyrazista_marakuja_salt.jpg',
  '/images/liquid_products/product8_blueberry_ice_soczysta_borowka_chlodne_zakonczenie_gladka_konsystencja_salt.jpg',
  '/images/liquid_products/product9_strawberry_ice_naturalna_truskawka_subtelne_chlodzenie_lekko_kremowe_zakonczenie_salt.jpg',
  '/images/liquid_products/product10_watermelon_ice_dojrzaly_arbuz_chlodna_nuta_orzezwienie_w_czystej_postaci_salt.jpg',
];

export function LiquidProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Zmiana co 5 sekund

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-8 sm:py-12 md:py-16">
      {/* Główne obrazy karuzeli */}
      <div className="relative w-full flex items-center justify-center min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
        {productImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image}
              alt={`Produkt ${index + 1}`}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
            />
          </div>
        ))}
      </div>


      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 group"
        aria-label="Poprzedni slajd"
      >
        <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 text-white group-hover:text-primary transition-colors" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 group"
        aria-label="Następny slajd"
      >
        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 text-white group-hover:text-primary transition-colors" />
      </button>

      {/* Play/Pause button */}
      <button
        onClick={togglePlay}
        className="absolute right-4 top-4 z-30 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 group"
        aria-label={isPlaying ? 'Pauza' : 'Odtwarzaj'}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:text-primary transition-colors" />
        ) : (
          <Play className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:text-primary transition-colors" />
        )}
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3 sm:mb-0 md:mb-8">
        {productImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 sm:w-12 h-2 sm:h-3 bg-primary'
                : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Idź do slajdu ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-30 bg-black/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg">
        <p className="text-white text-sm sm:text-base font-medium">
          {currentIndex + 1} / {productImages.length}
        </p>
      </div>
    </section>
  );
}

