import { FeatureGrid } from '../components/FeatureGrid';
import { HomeHero } from '../components/HomeHero';
import { SupportStrip } from '../components/SupportStrip';

type HomePageProps = {
  onNavigate: (href: string) => void;
};

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <main>
      <HomeHero onNavigate={onNavigate} />
      <FeatureGrid />
      <SupportStrip />
    </main>
  );
}
