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

export function JoinGroupForm({ lang, initialPin = '' }: { lang: string; initialPin?: string }) {
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
      setError('PIN must be 6 digits');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // In a real app, we'd probably have a way to find group by PIN
      // For MVP, we might need to adjust the service to support findByPin or just use groupId if PIN=ID is not true
      // Based on technical_design.md, PIN is shareable but ID is UUID.
      // We need a way to resolve PIN to Group ID.

      // Let's assume for now we need a findGroupByPin method in the service
      // I'll check if I can add it to the repository.

      const groupId = await groupService.findGroupIdByPin(pin);

      if (!groupId) {
        setError('Group not found. Please check the PIN.');
        setLoading(false);
        return;
      }

      await groupService.joinGroup(groupId, username.trim());

      const group = await groupService.getGroup(groupId);
      if (group) {
        saveSession({
          groupId: group.id,
          groupName: group.name,
          userName: username.trim(),
          lastAccessed: Date.now(),
        });
        router.push(`/${lang}/groups/${group.id}`);
      }
    } catch (error) {
      console.error('Failed to join group:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-2xl">Join a group</CardTitle>
        <CardDescription>Enter the 6-digit PIN shared by your friends.</CardDescription>
      </CardHeader>
      <form onSubmit={handleJoin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="join-username">Your Name</Label>
            <Input
              id="join-username"
              placeholder="e.g. Bob"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pin">Group PIN</Label>
            <Input
              id="pin"
              placeholder="123456"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
              required
              className="text-center font-mono text-2xl tracking-[0.5em] tabular-nums"
            />
          </div>
          {error && <p className="text-destructive text-sm font-medium">{error}</p>}
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !username.trim() || pin.length !== 6}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Join Group
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
