import type { Dictionary, FaqItem } from '@/i18n/types';

interface FaqSectionProps {
  dict: Dictionary;
}

export function FaqSection({ dict }: FaqSectionProps) {
  return (
    <section className="bg-background border-border/50 border-t px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-3xl font-bold">{dict.faq.title}</h2>
        <div className="space-y-8">
          {dict.faq.items.map((item: FaqItem, index: number) => (
            <div key={index} className="bg-muted/30 border-border/50 rounded-2xl border p-6">
              <h3 className="mb-3 text-xl font-bold">{item.question}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
