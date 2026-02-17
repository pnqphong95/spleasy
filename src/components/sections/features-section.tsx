import { Zap, Users, ShieldCheck } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

interface FeaturesSectionProps {
  dict: Dictionary;
}

export function FeaturesSection({ dict }: FeaturesSectionProps) {
  return (
    <section id="features" className="bg-muted/30 border-t border-b border-border/50 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {dict.features.header.title}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-xl">
            {dict.features.header.description}
          </p>
        </div>

        {/* Bento Grid Layout - Asymmetric Spans */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Large Card (Span 2) - Instant Access */}
          <div className="bg-background border-border/50 hover:border-primary/20 col-span-1 flex flex-col justify-between rounded-[2rem] border p-10 shadow-sm transition-all duration-300 hover:shadow-xl md:col-span-2">
            <div>
              <div className="bg-primary/10 text-primary mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
                <Zap className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading mb-3 text-2xl font-bold">{dict.features.instantAccess.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                {dict.features.instantAccess.description}
              </p>
            </div>
          </div>

          {/* Tall Card (Span 1) - Split Easy */}
          <div className="bg-background border-border/50 hover:border-money-in/20 col-span-1 flex flex-col justify-between rounded-[2rem] border p-10 shadow-sm transition-all duration-300 hover:shadow-xl">
            <div className="bg-money-in/10 text-money-in mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
              <Users className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading mb-3 text-xl font-bold">{dict.features.splitEasy.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {dict.features.splitEasy.description}
              </p>
            </div>
          </div>

          {/* Wide Card (Span 3 or 3) - Transparent (Bottom) */}
          <div className="bg-background border-border/50 hover:border-money-settled/20 col-span-1 flex flex-col items-start gap-8 rounded-[2rem] border p-10 shadow-sm transition-all duration-300 hover:shadow-xl md:col-span-3 md:flex-row md:items-center">
            <div className="bg-money-settled/10 text-money-settled flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
              <ShieldCheck className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading mb-2 text-xl font-bold">{dict.features.transparentSafe.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {dict.features.transparentSafe.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
