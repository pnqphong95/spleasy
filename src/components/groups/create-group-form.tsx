'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { groupService } from '@/infrastructure/firebase/group-repository';
import { useSession } from '@/hooks/use-session';
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

const ADJECTIVES = [
  'Thrifty',
  'Budget',
  'Savvy',
  'Smart',
  'Frugal',
  'Generous',
  'Quick',
  'Easy',
  'Happy',
  'Lucky',
  'Sunny',
  'Cozy',
];
const NOUNS = [
  'Trip',
  'Squad',
  'Gang',
  'Crew',
  'Family',
  'Weekend',
  'Vacation',
  'Project',
  'Team',
  'Friends',
  'Adventure',
  'Journey',
];

const getRandomGroupName = () => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adj} ${noun}`;
};

export function CreateGroupForm({ lang }: { lang: string }) {
  const router = useRouter();
  const { saveSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [placeholderName, setPlaceholderName] = useState('');

  // Set a random placeholder on client mount
  useEffect(() => {
    setPlaceholderName(getRandomGroupName());
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    try {
      // Use user input or the placeholder if empty
      const finalGroupName = name.trim() || placeholderName;

      const group = await groupService.createGroup(finalGroupName, username.trim());

      saveSession({
        groupId: group.id,
        groupName: group.name,
        userName: username.trim(),
        lastAccessed: Date.now(),
      });

      router.push(`/${lang}/groups/${group.id}`);
    } catch (error) {
      console.error('Failed to create group:', error);
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
        <CardTitle className="font-heading text-2xl">Create group</CardTitle>
      </CardHeader>
      <form onSubmit={handleCreate}>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="username" className="text-base">Name</Label>
            <Input
              id="username"
              placeholder="e.g. Alice"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="groupName" className="text-base">Group Name <span className="text-muted-foreground font-normal">(Optional)</span></Label>
            <Input
              id="groupName"
              placeholder={placeholderName ? `e.g. ${placeholderName}` : 'e.g. Sunny Friends'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              {placeholderName && (
                <>Leave blank to use <strong>{placeholderName}</strong></>
              )}
            </p>
          </div>
        </CardContent>
        <CardFooter className="sticky bottom-0 z-50 bg-card pt-6 pb-6 rounded-b-3xl">
          <Button
            type="submit"
            className="h-12 w-full rounded-full text-lg font-medium shadow-sm transition-transform active:scale-[0.98]"
            disabled={loading || !username.trim()}
          >
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
