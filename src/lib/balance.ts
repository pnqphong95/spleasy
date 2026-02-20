import { Expense, Member } from '@/types';

export interface MemberBalance {
  memberId: string;
  memberDisplayName: string;
  balance: number;
}

/**
 * Calculates net balances for all members in a group based on expenses.
 * Balance = Total Paid - Total Share
 */
export function calculateBalances(members: Member[], expenses: Expense[]): MemberBalance[] {
  const balanceMap: Record<string, number> = {};

  // Initialize all members with 0 balance
  members.forEach((m) => {
    balanceMap[m.id] = 0;
  });

  expenses.forEach((expense) => {
    const { amount, payerId, involvedMemberIds, type = 'expense' } = expense;

    if (type === 'expense') {
      // 1. Payer gets credit for the full amount they paid
      if (balanceMap[payerId] !== undefined) {
        balanceMap[payerId] += amount;
      }

      // 2. Each involved member owes their equal share
      if (involvedMemberIds.length > 0) {
        const share = amount / involvedMemberIds.length;
        involvedMemberIds.forEach((id) => {
          if (balanceMap[id] !== undefined) {
            balanceMap[id] -= share;
          }
        });
      }
    } else if (type === 'reimbursement') {
      // For reimbursements (Settle Up):
      // Payer (sender) gets credit (reduces debt)
      if (balanceMap[payerId] !== undefined) {
        balanceMap[payerId] += amount;
      }

      // Involved Member (receiver) gets debit (reduces credit)
      // Usually only one person is involved in a settlement
      involvedMemberIds.forEach((id) => {
        if (balanceMap[id] !== undefined) {
          balanceMap[id] -= amount;
        }
      });
    }
  });

  return members.map((m) => ({
    memberId: m.id,
    memberDisplayName: m.displayName,
    balance: Math.round(balanceMap[m.id] || 0), // Round to avoid float issues in currency
  }));
}
