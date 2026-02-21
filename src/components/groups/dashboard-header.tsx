'use client';

import { Group } from '@/types';
import { Share2, MoreVertical, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Dictionary } from '@/i18n/types';

interface DashboardHeaderProps {
  group: Group;
  lang: string;
  dict: Dictionary['dashboard']['header'];
  onTitleClick?: () => void;
}

export function DashboardHeader({ group, lang, dict, onTitleClick }: DashboardHeaderProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => `${window.location.origin}/${lang}/g/${group.pin}`;

  const shareGroup = async () => {
    const url = getUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${dict.shareTitle}${group.name}`,
          text: dict.shareText.replace('{name}', group.name).replace('{pin}', group.pin),
          url,
        });
      } catch {
        // User cancelled — silently ignore
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="bg-background/80 sticky top-0 z-10 flex h-14 items-center justify-between border-b px-4 backdrop-blur-md">
      {/* Group name — tap to go to expenses tab */}
      <button
        className="flex flex-col truncate pr-2 text-left transition-opacity active:opacity-70"
        onClick={onTitleClick}
      >
        <h1 className="font-heading truncate text-lg leading-tight font-bold">{group.name}</h1>
        <p className="text-muted-foreground text-xs font-medium">
          {dict.pin}: {group.pin}
        </p>
      </button>

      {/* Right actions */}
      <div className="flex shrink-0 items-center gap-0.5">
        {/* Primary share button — direct share */}
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={shareGroup}>
          <Share2 className="h-4 w-4" />
        </Button>

        {/* Collapsed overflow menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-2xl p-2 shadow-lg">
            <DropdownMenuItem
              onClick={copyLink}
              className="flex cursor-pointer items-center justify-between rounded-xl p-3 text-sm font-medium"
            >
              {dict.copyLink}
              {copied ? (
                <Check className="text-money-in h-4 w-4" />
              ) : (
                <Copy className="text-muted-foreground h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 opacity-20" />
            <DropdownMenuItem className="flex cursor-pointer items-center justify-between rounded-xl p-3 text-sm font-medium">
              <span className="text-muted-foreground font-mono text-xs tracking-widest">
                PIN: {group.pin}
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
