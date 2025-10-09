import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AboutHero } from '@/components/about/about-hero';
import { AboutStats } from '@/components/about/about-stats';
import { AboutTeam } from '@/components/about/about-team';
import { AboutValues } from '@/components/about/about-values';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutHero />
        <AboutStats />
        <AboutValues />
        <AboutTeam />
      </main>
      <Footer />
    </div>
  );
}
