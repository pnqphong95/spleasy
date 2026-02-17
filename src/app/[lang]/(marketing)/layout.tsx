import { MarketingHeader } from '@/components/layout/marketing-header';
import { MarketingFooter } from '@/components/layout/marketing-footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';

export default async function MarketingLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="bg-background text-foreground selection:bg-primary/20 selection:text-primary flex min-h-screen flex-col">
      <MarketingHeader dict={dict} lang={lang} />
      <main className="flex-1">{children}</main>
      <MarketingFooter dict={dict} />
    </div>
  );
}
