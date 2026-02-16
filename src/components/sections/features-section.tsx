import { Zap, Users, ShieldCheck } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

interface FeaturesSectionProps {
  dict: Dictionary;
}

export function FeaturesSection({ dict }: FeaturesSectionProps) {
  return (
    <section id="features" className="bg-muted/30 border-border/50 border-y px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Bento Grid Layout - Asymmetric Spans */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Large Card (Span 2) - Instant Access */}
          <div className="bg-background border-border/50 col-span-1 flex flex-col justify-between rounded-3xl border p-8 shadow-sm transition-all hover:shadow-md md:col-span-2">
            <div>
              <div className="bg-primary/10 text-primary mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="font-heading mb-3 text-2xl font-bold">{dict.features.instantAccess.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                {dict.features.instantAccess.description}
              </p>
            </div>
            {/* Visual decoration could go here for bento style */}
          </div>

          {/* Tall Card (Span 1) - Split Easy */}
          <div className="bg-background border-border/50 col-span-1 flex flex-col justify-between rounded-3xl border p-8 shadow-sm transition-all hover:shadow-md">
            <div className="bg-money-in/10 text-money-in mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-heading mb-3 text-xl font-bold">{dict.features.splitEasy.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {dict.features.splitEasy.description}
              </p>
            </div>
          </div>

          {/* Wide Card (Span 3 or 3) - Transparent (Bottom) */}
          <div className="bg-background border-border/50 col-span-1 md:col-span-3 flex flex-col md:flex-row items-start md:items-center gap-6 rounded-3xl border p-8 shadow-sm transition-all hover:shadow-md">
            <div className="bg-money-settled/10 text-money-settled flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
              <ShieldCheck className="h-7 w-7" />
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
