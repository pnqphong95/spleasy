'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, Plus, Receipt, BarChart3, Settings } from 'lucide-react';
import { useGroup } from '@/hooks/use-group';
import { useSession } from '@/hooks/use-session';
import { useExpenses } from '@/hooks/use-expenses';
import { calculateBalances } from '@/lib/balance';
import { DashboardHeader } from '@/components/groups/dashboard-header';
import { AddExpenseDrawer } from '@/components/expenses/add-expense-drawer';
import { ExpenseList } from '@/components/expenses/expense-list';
import { BalanceList } from '@/components/balances/balance-list';
import { SettingsTab } from '@/components/groups/settings-tab';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function GroupDashboardPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const [activeTab, setActiveTab] = useState<'activity' | 'balances' | 'settings'>('activity');
  const { group, loading: groupLoading, error } = useGroup(groupId);
  const { expenses, loading: expensesLoading } = useExpenses(groupId);
  const { getSession } = useSession();

  const session = getSession(groupId);
  const currentUser = group?.members.find((m) => m.displayName === session?.userName) || null;

  if (groupLoading) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-muted-foreground mt-4 text-sm font-medium">Loading group details...</p>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-bold italic">Oops!</h2>
        <p className="text-muted-foreground mt-2">
          {error?.message || "We couldn't find this group."}
        </p>
        <Button variant="link" className="mt-4" onClick={() => (window.location.href = '/')}>
          Go back home
        </Button>
      </div>
    );
  }

  const balances = calculateBalances(group.members, expenses);

  return (
    <div className="flex min-h-[100dvh] flex-col pb-20">
      <DashboardHeader group={group} />

      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md">
          {activeTab === 'activity' && (
            <ExpenseList expenses={expenses} loading={expensesLoading} />
          )}
          {activeTab === 'balances' && (
            <BalanceList balances={balances} group={group} currentUser={currentUser} />
          )}
          {activeTab === 'settings' && <SettingsTab group={group} />}
        </div>
      </main>

      {/* FAB - Floating Action Button via AddExpenseDrawer */}
      <div className="fixed right-6 bottom-24 z-40">
        <AddExpenseDrawer
          group={group}
          currentUser={currentUser}
          trigger={
            <Button
              size="icon"
              className="bg-primary shadow-primary/25 h-14 w-14 rounded-full p-0 text-white shadow-lg transition-transform active:scale-90"
            >
              <Plus className="h-7 w-7" />
            </Button>
          }
        />
      </div>

      {/* Bottom Nav Placeholder */}
      <footer className="bg-background/80 fixed right-0 bottom-0 left-0 flex h-20 items-center justify-around border-t px-6 pb-4 backdrop-blur-md">
        <button
          onClick={() => setActiveTab('activity')}
          className={cn(
            'flex flex-col items-center gap-1 transition-all',
            activeTab === 'activity' ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          <Receipt
            className={cn('h-6 w-6', activeTab === 'activity' ? 'fill-primary/20' : 'opacity-40')}
          />
          <span className="text-[10px] font-bold tracking-wider uppercase">Activity</span>
        </button>

        <button
          onClick={() => setActiveTab('balances')}
          className={cn(
            'flex flex-col items-center gap-1 transition-all',
            activeTab === 'balances' ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          <BarChart3
            className={cn('h-6 w-6', activeTab === 'balances' ? 'fill-primary/20' : 'opacity-40')}
          />
          <span className="text-[10px] font-bold tracking-wider uppercase">Balances</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={cn(
            'flex flex-col items-center gap-1 transition-all',
            activeTab === 'settings' ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          <Settings
            className={cn('h-6 w-6', activeTab === 'settings' ? 'fill-primary/20' : 'opacity-40')}
          />
          <span className="text-[10px] font-bold tracking-wider uppercase">Settings</span>
        </button>
      </footer>
    </div>
  );
}
