'use client';

import { Expense } from '@/types';
import { ExpenseCard } from './expense-card';
import { Loader2, Receipt } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  loading: boolean;
}

export function ExpenseList({ expenses, loading }: ExpenseListProps) {
  if (loading && expenses.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin opacity-20" />
        <p className="mt-4 text-sm font-medium">Loading activity...</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted text-muted-foreground/40 flex h-20 w-20 items-center justify-center rounded-3xl">
          <Receipt className="h-10 w-10" />
        </div>
        <h3 className="font-heading mt-6 text-lg font-bold">No activity yet</h3>
        <p className="text-muted-foreground mt-2 max-w-[200px] text-sm">
          Every dinner, coffee, or trip will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-muted-foreground text-sm font-bold tracking-widest uppercase">
          Activity
        </h2>
        <span className="text-primary/60 text-xs font-bold">{expenses.length} TOTAL</span>
      </div>
      <div className="flex flex-col gap-3 pb-32">
        {expenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
}
