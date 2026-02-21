'use client';

import { Settlement } from '@/lib/balance';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { getAvatarStyle } from '@/lib/avatar';
import { Dictionary } from '@/i18n/types';

interface BalanceListProps {
  settlements: Settlement[];
  dict: Dictionary['dashboard']['balances'];
}

export function BalanceList({ settlements, dict }: BalanceListProps) {
  const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN').format(Math.abs(val));

  if (settlements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="bg-money-in/10 flex h-20 w-20 items-center justify-center rounded-3xl">
          <CheckCircle2 className="text-money-in h-10 w-10" />
        </div>
        <h3 className="font-heading text-lg font-bold">{dict.settledAll}</h3>
        <p className="text-muted-foreground max-w-[200px] text-sm">{dict.settled}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-32">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-muted-foreground text-sm font-bold tracking-widest uppercase">
          {dict.title}
        </h2>
        <span className="text-primary/60 text-xs font-bold">
          {settlements.length} {dict.members}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {settlements.map((s, i) => (
          <Card
            key={i}
            className="bg-card/50 relative overflow-hidden border border-white/5 py-0 shadow-sm backdrop-blur-sm"
          >
            <div className="bg-money-out/5 pointer-events-none absolute -top-8 -left-8 h-20 w-20 rounded-full blur-2xl" />

            <CardContent className="flex items-center gap-3 px-4 py-3">
              {/* From avatar */}
              <div
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-sm',
                  getAvatarStyle(s.fromName),
                )}
              >
                {s.fromName.slice(0, 1).toUpperCase()}
              </div>

              {/* Statement */}
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-foreground text-sm font-bold">{s.fromName}</span>
                  <span className="text-muted-foreground text-xs">{dict.owesTo}</span>
                  <span className="text-foreground text-sm font-bold">{s.toName}</span>
                </div>
                <span className="text-money-out text-base font-black tabular-nums">
                  ₫{formatCurrency(s.amount)}
                </span>
              </div>

              {/* Arrow → to avatar */}
              <ArrowRight className="text-muted-foreground/30 h-4 w-4 shrink-0" />

              <div
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-sm',
                  getAvatarStyle(s.toName),
                )}
              >
                {s.toName.slice(0, 1).toUpperCase()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
