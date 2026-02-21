'use client';

import { Group } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LogOut, Sun, Moon, Monitor } from 'lucide-react';
import { getAvatarStyle } from '@/lib/avatar';
import { useSession } from '@/hooks/use-session';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Dictionary } from '@/i18n/types';

interface SettingsTabProps {
  group: Group;
  lang: string;
  dict: Dictionary['dashboard']['settings'];
  onUpdate?: () => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
];

export function SettingsTab({ group, lang, dict }: SettingsTabProps) {
  const { removeSession } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const handleLeaveGroup = () => {
    if (!window.confirm(dict.leaveGroupConfirm)) return;
    removeSession(group.id);
    router.push(`/${lang}`);
  };

  const switchLanguage = (newLang: string) => {
    // Replace the current lang segment in the pathname
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <div className="flex flex-col gap-5 pb-32">
      <h2 className="font-heading text-muted-foreground text-sm font-bold tracking-widest uppercase">
        {dict.title}
      </h2>

      {/* Appearance — Theme Toggle */}
      <div className="space-y-2">
        <Label className="text-muted-foreground px-1 text-[10px] font-bold tracking-widest uppercase">
          {dict.appearance}
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'light', label: dict.lightMode, Icon: Sun },
            { value: 'dark', label: dict.darkMode, Icon: Moon },
            { value: 'system', label: 'Auto', Icon: Monitor },
          ].map(({ value, label, Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-xs font-bold transition-all',
                theme === value
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'bg-card/50 text-muted-foreground hover:bg-muted/50 border-white/5',
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Language Switcher */}
      <div className="space-y-2">
        <Label className="text-muted-foreground px-1 text-[10px] font-bold tracking-widest uppercase">
          {dict.language}
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map(({ code, label, flag }) => (
            <button
              key={code}
              onClick={() => switchLanguage(code)}
              className={cn(
                'flex items-center gap-2 rounded-2xl border p-3 text-sm font-bold transition-all',
                lang === code
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'bg-card/50 text-muted-foreground hover:bg-muted/50 border-white/5',
              )}
            >
              <span className="text-lg">{flag}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Group PIN */}
      <div className="space-y-2">
        <Label className="text-muted-foreground px-1 text-[10px] font-bold tracking-widest uppercase">
          {dict.pinLabel}
        </Label>
        <Card className="bg-card/50 overflow-hidden border border-white/5 shadow-sm backdrop-blur-sm">
          <CardContent className="flex items-center justify-between p-4">
            <span className="font-mono text-2xl font-black tracking-widest">{group.pin}</span>
            <span className="text-muted-foreground/40 text-[10px] font-bold">PIN</span>
          </CardContent>
        </Card>
      </div>

      {/* Members */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <Label className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            {dict.membersLabel}
          </Label>
          <span className="text-primary/60 text-[10px] font-bold">
            {group.members.length} {dict.membersTotal}
          </span>
        </div>
        <Card className="bg-card/50 overflow-hidden border border-white/5 shadow-sm backdrop-blur-sm">
          <CardContent className="space-y-1 p-2">
            {group.members.map((member) => (
              <div
                key={member.id}
                className="hover:bg-muted/50 flex items-center gap-2 rounded-xl p-2 transition-colors"
              >
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold shadow-sm',
                    getAvatarStyle(member.displayName),
                  )}
                >
                  <span className="text-xs">{member.displayName.slice(0, 1).toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">{member.displayName}</div>
                  <div className="text-muted-foreground text-[10px]">
                    {dict.joinedAt} {new Date(member.joinedAt).toLocaleDateString(lang)}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Leave Group */}
      <Button
        variant="outline"
        className="border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10 hover:border-destructive/50 h-12 w-full gap-2 rounded-2xl font-bold"
        onClick={handleLeaveGroup}
      >
        <LogOut className="h-4 w-4" />
        {dict.leaveGroup}
      </Button>
    </div>
  );
}
