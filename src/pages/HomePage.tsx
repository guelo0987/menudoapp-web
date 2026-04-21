import { FeatureGrid } from '../components/FeatureGrid';
import { HomeHero } from '../components/HomeHero';

type HomePageProps = {
  onNavigate: (href: string) => void;
};

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <main>
      <HomeHero onNavigate={onNavigate} />
      <FeatureGrid />
    </main>
  );
}
