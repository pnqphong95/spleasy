import { Expense } from '../types';

export interface IExpenseService {
  addExpense(expense: Omit<Expense, 'id' | 'createdAt'>): Promise<string>;
  getExpenses(groupId: string): Promise<Expense[]>;
  subscribeToExpenses(
    groupId: string,
    callback: (expenses: Expense[]) => void,
    onError?: (error: Error) => void,
  ): () => void;
  deleteExpense(groupId: string, expenseId: string): Promise<void>;
}
