import { Zap, Users, ShieldCheck } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

interface FeaturesSectionProps {
  dict: Dictionary;
}

export function FeaturesSection({ dict }: FeaturesSectionProps) {
  return (
    <section id="features" className="bg-muted/30 border-border/50 border-y px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-background border-border/50 rounded-3xl border p-8 shadow-sm transition-shadow hover:shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-bold">{dict.features.instantAccess.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {dict.features.instantAccess.description}
            </p>
          </div>

          <div className="bg-background border-border/50 rounded-3xl border p-8 shadow-sm transition-shadow hover:shadow-sm">
            <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-2xl">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-bold">{dict.features.splitEasy.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {dict.features.splitEasy.description}
            </p>
          </div>

          <div className="bg-background border-border/50 rounded-3xl border p-8 shadow-sm transition-shadow hover:shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-bold">{dict.features.transparentSafe.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {dict.features.transparentSafe.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
