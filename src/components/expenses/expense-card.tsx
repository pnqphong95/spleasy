'use client';

import { Expense } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface ExpenseCardProps {
  expense: Expense;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val);
  };

  return (
    <Card className="bg-card overflow-hidden border-none shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
          <span className="text-lg font-bold">{expense.payerName.slice(0, 1).toUpperCase()}</span>
        </div>

        <div className="flex flex-1 flex-col truncate">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground truncate font-bold">{expense.description}</h3>
            <span className="text-primary text-sm font-bold tabular-nums">
              ₫{formatCurrency(expense.amount)}
            </span>
          </div>

          <div className="mt-0.5 flex items-center justify-between">
            <p className="text-muted-foreground truncate text-xs font-medium">
              Paid by <span className="text-foreground">{expense.payerName}</span>
            </p>
            <span className="text-muted-foreground/60 text-[10px] font-bold tracking-wider uppercase">
              {formatDistanceToNow(expense.createdAt, { addSuffix: true })}
            </span>
          </div>

          <div className="mt-2 flex -space-x-2">
            {expense.involvedMemberIds.slice(0, 5).map((id, i) => (
              <div
                key={id}
                className="bg-muted ring-card flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-black ring-2"
              >
                {/* Placeholder for initials if we had member data here, but keeping it simple for now as per spec */}
                •
              </div>
            ))}
            {expense.involvedMemberIds.length > 5 && (
              <div className="bg-muted ring-card flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-black ring-2">
                +{expense.involvedMemberIds.length - 5}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
