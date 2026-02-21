'use client';

import { useState } from 'react';
import { Loader2, Plus, Receipt, BarChart3, Settings } from 'lucide-react';
import { useGroup } from '@/hooks/use-group';
import { useSession } from '@/hooks/use-session';
import { useExpenses } from '@/hooks/use-expenses';
import { calculateBalances, calculateSettlements } from '@/lib/balance';
import { DashboardHeader } from '@/components/groups/dashboard-header';
import { AddExpenseDrawer } from '@/components/expenses/add-expense-drawer';
import { ExpenseList } from '@/components/expenses/expense-list';
import { BalanceList } from '@/components/balances/balance-list';
import { SettingsTab } from '@/components/groups/settings-tab';
import { Button } from '@/components/ui/button';
import { expenseService } from '@/infrastructure/firebase/expense-repository';
import { cn } from '@/lib/utils';
import { Dictionary } from '@/i18n/types';

interface GroupDashboardProps {
  groupId: string;
  lang: string;
  dict: Dictionary['dashboard'];
}

export function GroupDashboard({ groupId, lang, dict }: GroupDashboardProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'balances' | 'settings'>('activity');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { group, loading: groupLoading, error } = useGroup(groupId);
  const { expenses, loading: expensesLoading } = useExpenses(groupId);
  const { getSession } = useSession();

  const session = getSession(groupId);
  const currentUser =
    group?.members.find((m) =>
      session?.memberId
        ? m.id === session.memberId
        : m.displayName.toLowerCase() === session?.userName?.toLowerCase(),
    ) || null;

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      await expenseService.deleteExpense(groupId, expenseId);
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  if (groupLoading) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-muted-foreground mt-4 text-sm font-medium">{dict.loading}</p>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-bold italic">{dict.errorTitle}</h2>
        <p className="text-muted-foreground mt-2">{error?.message || dict.errorNotFound}</p>
        <Button variant="link" className="mt-4" onClick={() => (window.location.href = `/${lang}`)}>
          {dict.errorBackHome}
        </Button>
      </div>
    );
  }

  const balances = calculateBalances(group.members, expenses);
  const settlements = calculateSettlements(balances);
  const totalSpend = expenses.reduce((s, e) => s + e.amount, 0);
  const currentUserBalance = currentUser
    ? (balances.find((b) => b.memberId === currentUser.id)?.balance ?? 0)
    : 0;

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden pb-20">
      {/* Decorative Background Elements */}
      <div className="bg-primary/10 absolute top-[-10%] left-[-10%] -z-10 h-[30%] w-[40%] rounded-full blur-[100px]" />
      <div className="absolute right-[-10%] bottom-[20%] -z-10 h-[40%] w-[30%] rounded-full bg-indigo-500/10 blur-[100px]" />

      <DashboardHeader
        group={group}
        lang={lang}
        dict={dict.header}
        onTitleClick={() => setActiveTab('activity')}
      />

      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md">
          {activeTab === 'activity' && (
            <ExpenseList
              expenses={expenses}
              members={group.members}
              loading={expensesLoading}
              dict={dict.activity}
              lang={lang}
              onDelete={handleDeleteExpense}
              drawerOpen={drawerOpen}
              totalSpend={totalSpend}
              currentUserBalance={currentUserBalance}
            />
          )}
          {activeTab === 'balances' && (
            <BalanceList settlements={settlements} dict={dict.balances} />
          )}
          {activeTab === 'settings' && (
            <SettingsTab group={group} lang={lang} dict={dict.settings} />
          )}
        </div>
      </main>

      {/* FAB - Floating Action Button via AddExpenseDrawer - Only visible on Activity Tab */}
      {activeTab === 'activity' && (
        <div className="fixed right-6 bottom-24 z-40">
          <AddExpenseDrawer
            group={group}
            currentUser={currentUser}
            dict={dict.addExpense}
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
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
      )}

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
          <span className="text-[10px] font-bold tracking-wider uppercase">
            {dict.tabs.activity}
          </span>
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
          <span className="text-[10px] font-bold tracking-wider uppercase">
            {dict.tabs.balances}
          </span>
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
          <span className="text-[10px] font-bold tracking-wider uppercase">
            {dict.tabs.settings}
          </span>
        </button>
      </footer>
    </div>
  );
}
