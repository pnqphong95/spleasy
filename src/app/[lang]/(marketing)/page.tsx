import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/hero-section';
import { JsonLd } from '@/components/seo/json-ld';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';

const FeaturesSection = dynamic(
  () => import('@/components/sections/features-section').then((mod) => mod.FeaturesSection),
  {
    loading: () => <div className="bg-muted/20 h-96 animate-pulse" />,
  },
);

const FaqSection = dynamic(
  () => import('@/components/sections/faq-section').then((mod) => mod.FaqSection),
  {
    loading: () => <div className="bg-muted/10 h-64 animate-pulse" />,
  },
);

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <HeroSection dict={dict} lang={lang} />
      <FeaturesSection dict={dict} />
      <FaqSection dict={dict} />
      <JsonLd description={dict.metadata.description} />
    </>
  );
}
