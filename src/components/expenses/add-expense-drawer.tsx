'use client';

import { useState, useRef, useEffect } from 'react';
import { Group, Member } from '@/types';
import { expenseService } from '@/infrastructure/firebase/expense-repository';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { getAvatarStyle } from '@/lib/avatar';
import { Dictionary } from '@/i18n/types';

interface AddExpenseDrawerProps {
  group: Group;
  currentUser: Member | null;
  dict: Dictionary['dashboard']['addExpense'];
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddExpenseDrawer({
  group,
  currentUser,
  dict,
  trigger,
  open: controlledOpen,
  onOpenChange,
}: AddExpenseDrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = (val: boolean) => {
    setInternalOpen(val);
    onOpenChange?.(val);
  };

  const defaultPayerId = currentUser?.id || group.members[0]?.id;
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [payerId, setPayerId] = useState(defaultPayerId);
  const [involvedIds, setInvolvedIds] = useState<string[]>(group.members.map((m) => m.id));
  const [loading, setLoading] = useState(false);
  const amountRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  // Auto-focus amount when drawer opens
  useEffect(() => {
    if (open) {
      setTimeout(() => amountRef.current?.focus(), 100);
    }
  }, [open]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 12) setAmount(val);
  };

  const toggleInvolved = (id: string) => {
    setInvolvedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const allSelected = involvedIds.length === group.members.length;

  const handleSubmit = async () => {
    const numAmount = parseInt(amount || '0');
    if (numAmount <= 0) {
      toast.error(dict.errorAmount);
      return;
    }
    if (!description.trim()) {
      toast.error(dict.errorDescription);
      return;
    }
    if (involvedIds.length === 0) {
      toast.error(dict.errorInvolved);
      return;
    }

    setLoading(true);
    try {
      const payer = group.members.find((m) => m.id === payerId);
      await expenseService.addExpense({
        groupId: group.id,
        description: description.trim(),
        amount: numAmount,
        payerId,
        payerName: payer?.displayName || 'Unknown',
        involvedMemberIds: involvedIds,
        createdBy: currentUser?.id || payerId,
      });
      setOpen(false);
      setTimeout(() => {
        setAmount('');
        setDescription('');
        setPayerId(defaultPayerId);
        setInvolvedIds(group.members.map((m) => m.id));
      }, 350);
    } catch {
      toast.error(dict.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const formatDisplay = (val: string) =>
    val ? new Intl.NumberFormat('vi-VN').format(parseInt(val)) : '0';

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger || (
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <span className="text-2xl font-bold">+</span>
          </Button>
        )}
      </DrawerTrigger>

      <DrawerContent className="flex max-h-[92dvh] flex-col rounded-t-[2rem] focus:outline-none [&[data-state=closed]]:duration-200">
        {/* Visually hidden title for screen reader accessibility */}
        <DrawerTitle className="sr-only">{dict.title}</DrawerTitle>
        {/* Drag handle */}
        <div className="bg-muted-foreground/20 mx-auto mt-3 mb-1 h-1 w-10 rounded-full" />

        {/* Header row */}
        <div className="flex items-center justify-between px-5 pt-1 pb-0">
          <span className="text-muted-foreground/50 text-xs font-bold tracking-widest uppercase">
            {dict.title}
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ─── Amount ─── */}
        <div
          className="flex cursor-text items-baseline justify-center gap-1 py-3"
          onClick={() => amountRef.current?.focus()}
        >
          <span className="text-muted-foreground text-2xl font-bold">₫</span>
          <span
            className={cn(
              'text-5xl font-black tracking-tighter tabular-nums transition-colors',
              amount ? 'text-foreground' : 'text-muted-foreground/30',
            )}
          >
            {formatDisplay(amount)}
          </span>
          <input
            ref={amountRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="absolute h-0 w-0 opacity-0"
            style={{ fontSize: '16px' }}
            value={amount}
            onChange={handleAmountChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') descRef.current?.focus();
            }}
          />
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto px-5 pb-8">
          {/* ─── Description ─── */}
          <input
            ref={descRef}
            type="text"
            placeholder={dict.descriptionPlaceholder}
            className="bg-muted/40 placeholder:text-muted-foreground/40 focus:bg-muted/60 h-11 w-full rounded-2xl border-none px-4 font-medium transition-colors outline-none"
            style={{ fontSize: '16px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
          />

          {/* ─── Paid by + Split with in one row ─── */}
          <div className="flex items-start gap-3">
            {/* Paid by */}
            <div className="flex flex-col gap-1.5">
              <span className="text-muted-foreground/50 text-[9px] font-bold tracking-widest uppercase">
                {dict.paidByLabel}
              </span>
              <div className="flex gap-1.5">
                {group.members.map((m) => {
                  const sel = payerId === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPayerId(m.id)}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full text-xs font-black transition-all',
                        sel
                          ? cn(
                            'ring-primary ring-offset-background scale-110 ring-2 ring-offset-2',
                            getAvatarStyle(m.displayName),
                          )
                          : cn('opacity-40', getAvatarStyle(m.displayName)),
                      )}
                    >
                      {m.displayName.slice(0, 1).toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-muted-foreground/20 mt-4 self-center text-lg">→</div>

            {/* Split with */}
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground/50 text-[9px] font-bold tracking-widest uppercase">
                  {dict.splitWithLabel}
                </span>
                <button
                  onClick={() =>
                    allSelected
                      ? setInvolvedIds([])
                      : setInvolvedIds(group.members.map((m) => m.id))
                  }
                  className="text-primary text-[9px] font-bold tracking-wide"
                >
                  {allSelected ? dict.deselectAll : dict.selectAll}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.members.map((m) => {
                  const sel = involvedIds.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      onClick={() => toggleInvolved(m.id)}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full text-xs font-black transition-all',
                        sel
                          ? cn(
                            'ring-primary ring-offset-background ring-2 ring-offset-2',
                            getAvatarStyle(m.displayName),
                          )
                          : cn('opacity-30', getAvatarStyle(m.displayName)),
                      )}
                    >
                      {m.displayName.slice(0, 1).toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Save button ─── */}
          <Button
            className="shadow-primary/20 mt-1 h-13 w-full rounded-full text-base font-bold shadow-xl active:scale-[0.98]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {dict.submitting}
              </>
            ) : (
              dict.submit
            )}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
