'use client';

import { Expense, Member } from '@/types';
import { ExpenseCard } from './expense-card';
import { Loader2, Receipt, TrendingUp, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Dictionary } from '@/i18n/types';

interface ExpenseListProps {
  expenses: Expense[];
  members: Member[];
  loading: boolean;
  dict: Dictionary['dashboard']['activity'];
  lang: string;
  onDelete?: (id: string) => Promise<void>;
  drawerOpen?: boolean;
  totalSpend?: number;
  currentUserBalance?: number;
}

export function ExpenseList({
  expenses,
  members,
  loading,
  dict,
  lang,
  onDelete,
  totalSpend = 0,
  currentUserBalance = 0,
}: ExpenseListProps) {
  const displayedExpenses = expenses;

  const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN').format(Math.abs(val));

  const isNegativeBalance = currentUserBalance < 0;

  if (loading && displayedExpenses.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin opacity-20" />
        <p className="mt-4 text-sm font-medium">{dict.loading}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Group Spend */}
        <Card className="bg-card/60 relative overflow-hidden border border-white/5 py-0 shadow-sm backdrop-blur-sm">
          <div className="bg-primary/10 pointer-events-none absolute -right-4 -bottom-4 h-16 w-16 rounded-full blur-2xl" />
          <CardContent className="flex flex-col gap-1 p-4">
            <div className="text-muted-foreground flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold tracking-widest uppercase">
                {dict.totalSpend}
              </span>
            </div>
            <span className="text-foreground text-lg leading-tight font-black tabular-nums">
              ₫{formatCurrency(totalSpend)}
            </span>
            <span className="text-muted-foreground/50 text-[9px] font-semibold">
              {displayedExpenses.length} {dict.total}
            </span>
          </CardContent>
        </Card>

        {/* Current User Balance */}
        <Card className="bg-card/60 relative overflow-hidden border border-white/5 py-0 shadow-sm backdrop-blur-sm">
          <div
            className={cn(
              'pointer-events-none absolute -right-4 -bottom-4 h-16 w-16 rounded-full blur-2xl',
              isNegativeBalance ? 'bg-money-out/10' : 'bg-money-in/10',
            )}
          />
          <CardContent className="flex flex-col gap-1 p-4">
            <div className="text-muted-foreground flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold tracking-widest uppercase">
                {dict.yourBalance}
              </span>
            </div>
            <span
              className={cn(
                'text-lg leading-tight font-black tabular-nums',
                currentUserBalance === 0
                  ? 'text-muted-foreground'
                  : isNegativeBalance
                    ? 'text-money-out'
                    : 'text-money-in',
              )}
            >
              {isNegativeBalance ? '-' : currentUserBalance > 0 ? '+' : ''}₫
              {formatCurrency(currentUserBalance)}
            </span>
            <span className="text-muted-foreground/50 text-[9px] font-semibold">
              {currentUserBalance === 0 ? '✓' : isNegativeBalance ? '↓ owes' : '↑ owed'}
            </span>
          </CardContent>
        </Card>
      </div>

      {displayedExpenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-muted text-muted-foreground/40 flex h-20 w-20 items-center justify-center rounded-3xl">
            <Receipt className="h-10 w-10" />
          </div>
          <h3 className="font-heading mt-6 text-lg font-bold">{dict.emptyTitle}</h3>
          <p className="text-muted-foreground mt-2 max-w-[200px] text-sm">
            {dict.emptyDescription}
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-muted-foreground text-sm font-bold tracking-widest uppercase">
              {dict.title}
            </h2>
          </div>
          <div className="flex flex-col gap-2 pb-32">
            {displayedExpenses.map((expense, index) => (
              <div
                key={expense.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'both' }}
              >
                <ExpenseCard
                  expense={expense}
                  members={members}
                  dict={dict}
                  lang={lang === 'vi' ? 'vi' : 'en'}
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
