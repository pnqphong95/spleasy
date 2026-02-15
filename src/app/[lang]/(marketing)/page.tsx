import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { FaqSection } from '@/components/sections/faq-section';
import { JsonLd } from '@/components/seo/json-ld';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <HeroSection dict={dict} />
      <FeaturesSection dict={dict} />
      <FaqSection dict={dict} />
      <JsonLd description={dict.metadata.description} />
    </>
  );
}
