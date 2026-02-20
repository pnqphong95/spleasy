'use client';

import { Member } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MemberSelectorProps {
  members: Member[];
  selectedIds: string[];
  onToggle: (memberId: string) => void;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
  mode?: 'single' | 'multiple';
  label: string;
}

export function MemberSelector({
  members,
  selectedIds,
  onToggle,
  onSelectAll,
  onDeselectAll,
  mode = 'multiple',
  label,
}: MemberSelectorProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isAllSelected = members.length > 0 && selectedIds.length === members.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
          {label}
        </label>
        {mode === 'multiple' && onSelectAll && onDeselectAll && (
          <Button
            variant="ghost"
            size="sm"
            className="text-primary h-7 rounded-full text-xs font-bold"
            onClick={isAllSelected ? onDeselectAll : onSelectAll}
          >
            {isAllSelected ? 'Deselect All' : 'Select All'}
          </Button>
        )}
      </div>

      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
        {members.map((member) => {
          const isSelected = selectedIds.includes(member.id);
          return (
            <button
              key={member.id}
              onClick={() => onToggle(member.id)}
              className="group flex flex-col items-center gap-2 outline-none"
            >
              <div
                className={cn(
                  'relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-200',
                  isSelected
                    ? 'bg-primary ring-primary/20 scale-110 text-white ring-4'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 ring-0',
                )}
              >
                <span className="text-lg font-bold">{getInitials(member.displayName)}</span>
                {isSelected && (
                  <div className="text-primary absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                    <Check className="h-3 w-3" strokeWidth={4} />
                  </div>
                )}
              </div>
              <span
                className={cn(
                  'w-16 truncate text-center text-[10px] font-bold tracking-tight uppercase',
                  isSelected ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {member.displayName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
