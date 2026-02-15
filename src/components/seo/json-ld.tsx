import { SITE_NAME } from '@/lib/constants';

interface JsonLdProps {
  description: string;
}

export function JsonLd({ description }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: SITE_NAME,
          operatingSystem: 'Web',
          applicationCategory: 'FinanceApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'VND',
          },
          description,
        }),
      }}
    />
  );
}
