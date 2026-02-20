'use client';

import { Group } from '@/types';
import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  group: Group;
}

export function DashboardHeader({ group }: DashboardHeaderProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    const url = `${window.location.origin}/en/groups?pin=${group.pin}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareGroup = async () => {
    const url = `${window.location.origin}/en/groups?pin=${group.pin}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join our group: ${group.name}`,
          text: `Use Spleasy to split bills for ${group.name}. PIN: ${group.pin}`,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyLink();
    }
  };

  return (
    <header className="bg-background/80 sticky top-0 z-10 flex h-14 items-center justify-between border-b px-4 backdrop-blur-md">
      <div className="flex flex-col truncate pr-4">
        <h1 className="font-heading truncate text-lg leading-tight font-bold">{group.name}</h1>
        <p className="text-muted-foreground text-xs font-medium">PIN: {group.pin}</p>
      </div>
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 shadow-lg">
            <DropdownMenuItem
              onClick={copyLink}
              className="flex cursor-pointer items-center justify-between rounded-xl p-3 text-sm font-medium transition-colors"
            >
              Copy Link
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={shareGroup}
              className="flex cursor-pointer items-center justify-between rounded-xl p-3 text-sm font-medium transition-colors"
            >
              Share via...
              <Share2 className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
