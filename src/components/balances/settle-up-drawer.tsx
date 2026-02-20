'use client';

import { useState } from 'react';
import { Group, Member } from '@/types';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { expenseService } from '@/infrastructure/firebase/expense-repository';
import { toast } from 'sonner';
import { Loader2, ArrowRight, User2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettleUpDrawerProps {
  group: Group;
  currentUser: Member | null;
  defaultSender?: Member;
  defaultReceiver?: Member;
  trigger: React.ReactNode;
}

export function SettleUpDrawer({
  group,
  currentUser,
  defaultSender,
  defaultReceiver,
  trigger,
}: SettleUpDrawerProps) {
  const [open, setOpen] = useState(false);
  const [sender, setSender] = useState<Member | null>(defaultSender || currentUser || null);
  const [receiver, setReceiver] = useState<Member | null>(defaultReceiver || null);
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!sender || !receiver || !amount || parseFloat(amount) <= 0) {
      toast.error('Please fill in all details');
      return;
    }

    if (sender.id === receiver.id) {
      toast.error('Sender and receiver cannot be the same');
      return;
    }

    setIsSubmitting(true);
    try {
      await expenseService.addExpense({
        groupId: group.id,
        description: `Settle up: ${sender.displayName} → ${receiver.displayName}`,
        amount: parseFloat(amount),
        payerId: sender.id,
        payerName: sender.displayName,
        involvedMemberIds: [receiver.id],
        createdBy: currentUser?.id || sender.id,
        type: 'reimbursement',
      });

      toast.success('Debt settled successfully!');
      setOpen(false);
      setAmount('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to settle debt');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-black tracking-tighter italic">
              Settle Up
            </DrawerTitle>
            <DrawerDescription>Record a payment from one member to another.</DrawerDescription>
          </DrawerHeader>

          <div className="space-y-8 p-4">
            {/* Direction Selection */}
            <div className="flex items-center justify-between gap-4">
              {/* Sender */}
              <div className="flex flex-1 flex-col items-center gap-2">
                <div className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Who paid?
                </div>
                <button
                  className={cn(
                    'relative flex h-16 w-16 items-center justify-center rounded-3xl transition-all',
                    sender
                      ? 'bg-primary text-primary-foreground shadow-primary/20 scale-105 shadow-lg'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  <span className="text-2xl font-bold">
                    {sender?.displayName.slice(0, 1).toUpperCase() || '?'}
                  </span>
                </button>
                <div className="max-w-[80px] truncate text-xs font-bold">
                  {sender?.displayName || 'Select...'}
                </div>
              </div>

              <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
                <ArrowRight className="text-muted-foreground h-5 w-5" />
              </div>

              {/* Receiver */}
              <div className="flex flex-1 flex-col items-center gap-2">
                <div className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  To whom?
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {group.members
                    .filter((m) => m.id !== sender?.id)
                    .map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setReceiver(m)}
                        className={cn(
                          'relative flex h-16 w-16 items-center justify-center rounded-3xl transition-all',
                          receiver?.id === m.id
                            ? 'bg-money-in shadow-money-in/20 scale-105 text-white shadow-lg'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80',
                        )}
                      >
                        <span className="text-2xl font-bold">
                          {m.displayName.slice(0, 1).toUpperCase()}
                        </span>
                      </button>
                    ))}
                </div>
                <div className="max-w-[80px] truncate text-xs font-bold">
                  {receiver?.displayName || 'Select...'}
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-3">
              <Label className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                Amount
              </Label>
              <div className="group relative">
                <span className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-6 -translate-y-1/2 text-2xl font-bold transition-colors">
                  ₫
                </span>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="0"
                  className="bg-muted/50 focus-visible:ring-primary/10 h-20 rounded-[2rem] border-none pl-14 text-4xl font-black tabular-nums transition-all focus-visible:bg-white focus-visible:ring-4"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="shadow-primary/20 h-16 w-full rounded-[2rem] text-lg font-black italic shadow-xl transition-all active:scale-95"
              onClick={handleSubmit}
              disabled={isSubmitting || !sender || !receiver || !amount}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Settle Up'
              )}
            </Button>
          </div>

          <DrawerFooter className="pb-8">
            <DrawerClose asChild>
              <Button variant="ghost" className="h-12 rounded-2xl font-bold">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
