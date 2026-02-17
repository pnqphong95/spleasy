'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { groupService } from '@/infrastructure/firebase/group-repository';
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
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [placeholderName, setPlaceholderName] = useState('');

  // Set a random placeholder on client mount
  useState(() => {
    setPlaceholderName(getRandomGroupName());
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    try {
      // Use user input or the placeholder if empty
      const finalGroupName = name.trim() || placeholderName;

      const group = await groupService.createGroup(finalGroupName, username.trim());
      // Store session in localStorage
      const session = {
        groupId: group.id,
        groupName: group.name,
        userName: username.trim(),
        lastAccessed: Date.now(),
      };

      const existingSessions = JSON.parse(localStorage.getItem('spleasy_session') || '[]');
      localStorage.setItem('spleasy_session', JSON.stringify([...existingSessions, session]));

      router.push(`/${lang}/groups/${group.id}`);
    } catch (error) {
      console.error('Failed to create group:', error);
      // TODO: Show toast error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new group</CardTitle>
        <CardDescription>Start managing expenses instantly.</CardDescription>
      </CardHeader>
      <form onSubmit={handleCreate}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Your Name</Label>
            <Input
              id="username"
              placeholder="e.g. Alice"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groupName">Group Name (Optional)</Label>
            <Input
              id="groupName"
              placeholder={placeholderName ? `e.g. ${placeholderName}` : 'e.g. Weekend Trip'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              If empty, we&apos;ll name it <strong>{placeholderName}</strong> for you!
            </p>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          {' '}
          {/* Added spacing */}
          <Button type="submit" className="w-full" disabled={loading || !username.trim()}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Start Spleasing
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
