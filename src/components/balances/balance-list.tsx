'use client';

import { MemberBalance } from '@/lib/balance';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, MinusCircle, HandCoins } from 'lucide-react';
import { Group, Member } from '@/types';
import { SettleUpDrawer } from './settle-up-drawer';
import { Button } from '@/components/ui/button';

interface BalanceListProps {
  balances: MemberBalance[];
  group: Group;
  currentUser: Member | null;
}

export function BalanceList({ balances, group, currentUser }: BalanceListProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.abs(val));
  };

  return (
    <div className="grid gap-4 pb-32">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-muted-foreground text-sm font-bold tracking-widest uppercase">
          Net Balances
        </h2>
        <span className="text-primary/60 text-xs font-bold">{balances.length} MEMBERS</span>
      </div>

      <div className="flex flex-col gap-3">
        {balances.map((mb) => {
          const isOwed = mb.balance > 0;
          const isOwes = mb.balance < 0;
          const isSettled = mb.balance === 0;

          return (
            <Card key={mb.memberId} className="bg-card overflow-hidden border-none shadow-sm">
              <CardContent className="flex items-center gap-4 p-4">
                <div
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
                    isOwed
                      ? 'bg-money-in/10 text-money-in'
                      : isOwes
                        ? 'bg-money-out/10 text-money-out'
                        : 'bg-muted text-muted-foreground',
                  )}
                >
                  <span className="text-lg font-bold">
                    {mb.memberDisplayName.slice(0, 1).toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-1 flex-col truncate">
                  <div className="flex items-center justify-between">
                    <h3 className="text-foreground truncate font-bold">{mb.memberDisplayName}</h3>
                    <div
                      className={cn(
                        'flex items-baseline gap-1 font-black tracking-tighter tabular-nums',
                        isOwed
                          ? 'text-money-in'
                          : isOwes
                            ? 'text-money-out'
                            : 'text-muted-foreground',
                      )}
                    >
                      <span className="text-xs font-bold">₫</span>
                      <span className="text-xl">{formatCurrency(mb.balance)}</span>
                    </div>
                  </div>

                  <div className="mt-0.5 flex items-center gap-2">
                    {isOwed && (
                      <>
                        <ArrowUpRight className="text-money-in h-3 w-3" />
                        <span className="text-money-in/70 text-[10px] font-black tracking-wider uppercase">
                          Is Owed
                        </span>
                      </>
                    )}
                    {isOwes && (
                      <>
                        <ArrowDownLeft className="text-money-out h-3 w-3" />
                        <span className="text-money-out/70 text-[10px] font-black tracking-wider uppercase">
                          Owes
                        </span>
                      </>
                    )}
                    {isSettled && (
                      <>
                        <MinusCircle className="text-muted-foreground h-3 w-3" />
                        <span className="text-muted-foreground/70 text-[10px] font-black tracking-wider uppercase">
                          Settled
                        </span>
                      </>
                    )}
                  </div>

                  {/* Visual Debt Bar */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="bg-muted/50 h-1.5 flex-1 overflow-hidden rounded-full">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-1000',
                          isOwed ? 'bg-money-in' : isOwes ? 'bg-money-out' : 'bg-muted',
                        )}
                        style={{
                          width: isSettled ? '0%' : '100%',
                          opacity: 0.6,
                        }}
                      />
                    </div>

                    {!isSettled && (
                      <SettleUpDrawer
                        group={group}
                        currentUser={currentUser}
                        defaultSender={
                          isOwes ? group.members.find((m) => m.id === mb.memberId) : undefined
                        }
                        defaultReceiver={
                          isOwed ? group.members.find((m) => m.id === mb.memberId) : undefined
                        }
                        trigger={
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1.5 rounded-full px-3 text-[10px] font-bold tracking-wider uppercase"
                          >
                            <HandCoins className="h-3 w-3" />
                            Settle
                          </Button>
                        }
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
