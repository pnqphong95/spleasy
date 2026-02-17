import type { Dictionary, FaqItem } from '@/i18n/types';

interface FaqSectionProps {
  dict: Dictionary;
}

export function FaqSection({ dict }: FaqSectionProps) {
  return (
    <section className="bg-background border-t border-border/50 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.faq.title}
        </h2>
        <div className="space-y-4">
          {dict.faq.items.map((item: FaqItem, index: number) => (
            <div
              key={index}
              className="bg-muted/30 border-border/50 hover:bg-muted/50 rounded-[1.5rem] border p-8 transition-colors duration-200"
            >
              <h3 className="font-heading mb-4 text-xl font-semibold">{item.question}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
