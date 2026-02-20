import { db } from './config';
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { IExpenseService } from '../../services/expense';
import { Expense } from '../../types';

export class ExpenseRepository implements IExpenseService {
  async addExpense(expense: Omit<Expense, 'id' | 'createdAt'>): Promise<string> {
    const expenseData = {
      ...expense,
      createdAt: Date.now(),
    };

    try {
      const docRef = await addDoc(
        collection(db, 'groups', expense.groupId, 'expenses'),
        expenseData,
      );
      return docRef.id;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  }

  async getExpenses(groupId: string): Promise<Expense[]> {
    const q = query(collection(db, 'groups', groupId, 'expenses'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Expense, 'id'>),
    }));
  }

  subscribeToExpenses(
    groupId: string,
    callback: (expenses: Expense[]) => void,
    onError?: (error: Error) => void,
  ): () => void {
    const q = query(collection(db, 'groups', groupId, 'expenses'), orderBy('createdAt', 'desc'));

    return onSnapshot(
      q,
      (querySnapshot) => {
        const expenses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Expense, 'id'>),
        }));
        callback(expenses);
      },
      (error) => {
        console.error('Snapshot error for group', groupId, error);
        if (onError) onError(error);
      },
    );
  }
}

export const expenseService: IExpenseService = new ExpenseRepository();
