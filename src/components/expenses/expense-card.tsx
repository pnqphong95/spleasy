'use client';

import { Expense, Member } from '@/types';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getAvatarStyle } from '@/lib/avatar';
import { Dictionary } from '@/i18n/types';
import { vi, enUS } from 'date-fns/locale';

interface ExpenseCardProps {
  expense: Expense;
  members: Member[];
  dict: Dictionary['dashboard']['activity'];
  lang: 'en' | 'vi';
  onDelete?: (id: string) => Promise<void>;
}

export function ExpenseCard({ expense, members, dict, lang, onDelete }: ExpenseCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const locale = lang === 'vi' ? vi : enUS;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onDelete || isDeleting) return;
    setIsDeleting(true);
    try {
      await onDelete(expense.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN').format(val);

  return (
    <Card className="bg-card/50 relative flex flex-row items-stretch overflow-hidden border border-white/5 py-0 shadow-sm backdrop-blur-sm">
      {/* Background glow */}
      <div className="bg-primary/5 pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full blur-2xl" />

      {/* Main content */}
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2">
        {/* Payer avatar */}
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold shadow-sm',
            getAvatarStyle(expense.payerName),
          )}
        >
          <span className="text-xs">{expense.payerName.slice(0, 1).toUpperCase()}</span>
        </div>

        {/* Text content */}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          {/* Description + amount */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-foreground/90 truncate text-sm font-bold">{expense.description}</h3>
            <span className="text-primary/90 shrink-0 text-sm font-black tabular-nums">
              ₫{formatCurrency(expense.amount)}
            </span>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-1.5">
            {/* Involved avatars */}
            <div className="flex -space-x-1">
              {expense.involvedMemberIds.slice(0, 4).map((id: string) => {
                const member = members.find((m) => m.id === id);
                return (
                  <div
                    key={id}
                    className={cn(
                      'ring-card flex h-3.5 w-3.5 items-center justify-center rounded-full text-[6px] font-black text-white ring-1',
                      getAvatarStyle(member?.displayName || id),
                    )}
                  >
                    {(member?.displayName.slice(0, 1) ?? '?').toUpperCase()}
                  </div>
                );
              })}
            </div>

            <p className="text-muted-foreground truncate text-[10px] font-medium">
              {dict.paidBy}{' '}
              <span className="text-foreground/60 font-bold">{expense.payerName}</span>
            </p>

            <span className="text-muted-foreground/40 ml-auto shrink-0 text-[9px] font-semibold">
              {formatDistanceToNow(expense.createdAt, { addSuffix: true, locale })}
            </span>
          </div>
        </div>
      </div>

      {/* Delete action — dedicated right column, full-height 44px+ touch target */}
      {onDelete && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          title={dict.deleteLabel}
          aria-label={dict.deleteLabel}
          className={cn(
            // Mobile-first: min 44px touch target, full card height, separated by a subtle border
            'relative z-10 flex min-w-[44px] items-center justify-center border-l border-white/5',
            'text-muted-foreground/30 transition-colors',
            'hover:bg-destructive/10 hover:text-destructive',
            'active:bg-destructive/20 active:text-destructive',
            isDeleting && 'text-destructive/60',
          )}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </button>
      )}
    </Card>
  );
}
