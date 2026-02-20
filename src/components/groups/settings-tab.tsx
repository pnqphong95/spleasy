'use client';

import { useState } from 'react';
import { Group } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Share2, Save, ShieldCheck } from 'lucide-react';
import { groupService } from '@/infrastructure/firebase/group-repository';

interface SettingsTabProps {
  group: Group;
  onUpdate?: () => void;
}

export function SettingsTab({ group, onUpdate }: SettingsTabProps) {
  const [name, setName] = useState(group.name);
  const [isUpdating, setIsUpdating] = useState(false);

  const copyPin = () => {
    navigator.clipboard.writeText(group.pin);
    toast.success('PIN copied to clipboard!');
  };

  const copyLink = () => {
    const link = `${window.location.origin}/en/g/${group.pin}`;
    navigator.clipboard.writeText(link);
    toast.success('Join link copied!');
  };

  const handleShare = async () => {
    const link = `${window.location.origin}/en/g/${group.pin}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${group.name} on Spleasy`,
          text: `Use PIN ${group.pin} to join our group and split bills instantly!`,
          url: link,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyLink();
    }
  };

  // Note: Update group name is not yet implemented in the service, but we can add it to the repository easily
  const handleUpdateName = async () => {
    if (!name || name === group.name) return;

    setIsUpdating(true);
    try {
      await groupService.updateGroupName(group.id, name);
      toast.success('Group name updated!');
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update group name');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-32">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-muted-foreground text-sm font-bold tracking-widest uppercase">
          Group Settings
        </h2>
      </div>

      {/* Group Info Card */}
      <Card className="bg-card overflow-hidden border-none shadow-sm">
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <Label className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Group Name
            </Label>
            <div className="flex gap-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-muted/50 h-12 rounded-2xl border-none font-bold focus-visible:bg-white"
              />
              <Button
                size="icon"
                className="h-12 w-12 shrink-0 rounded-2xl"
                onClick={handleUpdateName}
                disabled={isUpdating || name === group.name}
              >
                <Save className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <Label className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Quick Access
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-muted-foreground/10 hover:bg-primary/5 hover:text-primary hover:border-primary/20 h-14 gap-2 rounded-2xl font-bold"
                onClick={copyPin}
              >
                <ShieldCheck className="h-5 w-5" />
                PIN: {group.pin}
              </Button>
              <Button
                variant="outline"
                className="border-muted-foreground/10 hover:bg-primary/5 hover:text-primary hover:border-primary/20 h-14 gap-2 rounded-2xl font-bold"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Card */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <Label className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            Group Members
          </Label>
          <span className="text-primary/60 text-[10px] font-bold">
            {group.members.length} TOTAL
          </span>
        </div>
        <Card className="bg-card overflow-hidden border-none shadow-sm">
          <CardContent className="space-y-1 p-2">
            {group.members.map((member) => (
              <div
                key={member.id}
                className="hover:bg-muted/50 flex items-center gap-3 rounded-2xl p-3 transition-colors"
              >
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold">
                  {member.displayName.slice(0, 1).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">{member.displayName}</div>
                  <div className="text-muted-foreground text-[10px]">
                    Joined {new Date(member.joinedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="pt-4 text-center">
        <p className="text-muted-foreground/40 text-[10px] font-bold tracking-widest uppercase italic">
          More group settings coming soon
        </p>
      </div>
    </div>
  );
}
