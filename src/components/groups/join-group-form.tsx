'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { groupService } from '@/infrastructure/firebase/group-repository';
import { useSession, UserSession } from '@/hooks/use-session';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

import { Dictionary } from '@/i18n/types';

export function JoinGroupForm({
  lang,
  initialPin = '',
  dict,
}: {
  lang: string;
  initialPin?: string;
  dict: Dictionary['groups']['join'];
}) {
  const router = useRouter();
  const { saveSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState(initialPin);
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Check for existing session and cleanup URL if initialPin is provided
  useEffect(() => {
    if (initialPin && initialPin.length === 6) {
      const checkExistingAndCleanup = async () => {
        try {
          const groupId = await groupService.findGroupIdByPin(initialPin);
          if (groupId) {
            const stored = localStorage.getItem('spleasy_session');
            if (stored) {
              const sessions: UserSession[] = JSON.parse(stored);
              const existing = sessions.find((s: UserSession) => s.groupId === groupId);
              if (existing) {
                router.replace(`/${lang}/groups/${groupId}`);
                return;
              }
            }
          }
          router.replace(`/${lang}/groups?tab=join`);
        } catch (e) {
          console.error('Error during auto-join check:', e);
        }
      };

      checkExistingAndCleanup();
    }
  }, [initialPin, lang, router]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !pin.trim()) return;
    if (pin.length !== 6) {
      setError(dict.errorPinLength);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const groupId = await groupService.findGroupIdByPin(pin);

      if (!groupId) {
        setError(dict.errorNotFound);
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }
        setLoading(false);
        return;
      }

      const member = await groupService.joinGroup(groupId, username.trim());

      const group = await groupService.getGroup(groupId);
      if (group) {
        saveSession({
          groupId: group.id,
          groupName: group.name,
          userName: member.displayName,
          memberId: member.id,
          lastAccessed: Date.now(),
        });
        router.push(`/${lang}/groups/${group.id}`);
      }
    } catch (error) {
      console.error('Failed to join group:', error);
      setError(dict.errorGeneric);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-2xl">{dict.title}</CardTitle>
        <CardDescription>{dict.description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleJoin}>
        <CardContent className="space-y-6 pt-2">
          <div className="space-y-3">
            <Label htmlFor="join-username" className="text-base">
              {dict.nameLabel}
            </Label>
            <Input
              id="join-username"
              placeholder={dict.namePlaceholder}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-3 pt-2">
            <Label htmlFor="pin" className="text-base">
              {dict.pinLabel}
            </Label>
            <Input
              id="pin"
              placeholder={dict.pinPlaceholder}
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
              required
              className="h-16 rounded-2xl text-center font-mono text-3xl tracking-[0.4em] tabular-nums"
            />
          </div>
          {error && (
            <div className="bg-destructive/10 border-destructive/20 text-destructive animate-in fade-in slide-in-from-top-2 rounded-xl border p-3 text-sm font-medium duration-300">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-card sticky bottom-0 z-50 rounded-b-3xl pt-6 pb-6">
          <Button
            type="submit"
            className="h-12 w-full rounded-full text-lg font-medium shadow-sm transition-transform active:scale-[0.98]"
            disabled={loading || !username.trim() || pin.length !== 6}
          >
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {dict.submit}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
