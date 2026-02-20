'use client';

import { useState } from 'react';
import { Group, Member } from '@/types';
import { expenseService } from '@/infrastructure/firebase/expense-repository';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { MemberSelector } from './member-selector';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface AddExpenseDrawerProps {
  group: Group;
  currentUser: Member | null;
  trigger?: React.ReactNode;
}

export function AddExpenseDrawer({ group, currentUser, trigger }: AddExpenseDrawerProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('0');
  const [description, setDescription] = useState('');
  const [payerId, setPayerId] = useState(currentUser?.id || group.members[0]?.id);
  const [involvedIds, setInvolvedIds] = useState<string[]>(group.members.map((m) => m.id));
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 12) {
      setAmount(val || '0');
    }
  };

  const handleSubmit = async () => {
    const numAmount = parseInt(amount);
    if (numAmount <= 0) {
      toast.error('Please enter an amount');
      return;
    }
    if (!description.trim()) {
      toast.error('Please enter a description');
      return;
    }
    if (involvedIds.length === 0) {
      toast.error('Select at least one person to split with');
      return;
    }

    setLoading(true);
    try {
      const payer = group.members.find((m) => m.id === payerId);
      await expenseService.addExpense({
        groupId: group.id,
        description: description.trim(),
        amount: numAmount,
        payerId: payerId,
        payerName: payer?.displayName || 'Unknown',
        involvedMemberIds: involvedIds,
        createdBy: currentUser?.id || payerId,
      });

      toast.success('Expense added successfully!');
      setOpen(false);
      // Reset form
      setAmount('0');
      setDescription('');
    } catch (error) {
      console.error('Failed to add expense:', error);
      toast.error('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val: string) => {
    const n = parseInt(val);
    return new Intl.NumberFormat('vi-VN').format(n);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger || (
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Plus className="h-7 w-7" />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="max-h-[96vh] rounded-t-[2.5rem]">
        <DrawerHeader className="relative flex flex-col items-center pb-0">
          <DrawerClose asChild className="absolute top-2 right-6">
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
          <DrawerTitle className="font-heading text-muted-foreground/60 text-lg font-bold tracking-widest uppercase">
            Add Expense
          </DrawerTitle>
          <div className="mt-4 mb-2 flex w-full flex-col items-center">
            <div className="relative flex items-baseline gap-1">
              <span className="text-muted-foreground text-2xl font-bold">₫</span>
              <span className="text-6xl font-black tracking-tighter tabular-nums">
                {formatCurrency(amount)}
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoFocus
                className="absolute inset-0 w-full cursor-default opacity-0"
                value={amount === '0' ? '' : amount}
                onChange={handleAmountChange}
              />
            </div>
          </div>
        </DrawerHeader>

        <div className="space-y-6 overflow-y-auto px-6 pt-2 pb-28">
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-muted-foreground text-sm font-bold tracking-wider uppercase"
            >
              What was it for?
            </Label>
            <Input
              id="description"
              placeholder="e.g. Dinner, Taxi, Drinks"
              className="bg-muted/50 focus-visible:ring-primary/20 h-14 rounded-2xl border-none px-5 text-lg font-medium"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <MemberSelector
            label="Paid By"
            members={group.members}
            selectedIds={[payerId]}
            onToggle={(id) => setPayerId(id)}
            mode="single"
          />

          <MemberSelector
            label="Split With"
            members={group.members}
            selectedIds={involvedIds}
            onToggle={(id) => {
              setInvolvedIds((prev) =>
                prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
              );
            }}
            onSelectAll={() => setInvolvedIds(group.members.map((m) => m.id))}
            onDeselectAll={() => setInvolvedIds([])}
            mode="multiple"
          />
        </div>

        <DrawerFooter className="bg-background/80 fixed right-0 bottom-0 left-0 px-6 pb-8 backdrop-blur-md">
          <Button
            className="shadow-primary/20 h-16 w-full rounded-full text-lg font-bold shadow-xl transition-transform active:scale-[0.98]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Expense'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
