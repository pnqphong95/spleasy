'use client';

import { useState, useEffect } from 'react';
import { Expense } from '@/types';
import { expenseService } from '@/infrastructure/firebase/expense-repository';

export function useExpenses(groupId: string | undefined) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!groupId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    const unsubscribe = expenseService.subscribeToExpenses(
      groupId,
      (data) => {
        setExpenses(data);
        setLoading(false);
      },
      (err) => {
        console.error('useExpenses: Subscription error', err);
        setError(err);
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [groupId]);

  return { expenses, loading, error };
}
