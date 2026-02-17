'use client';

import { useState, useEffect } from 'react';
import { groupService } from '@/infrastructure/firebase/group-repository';
import { Group } from '@/types';

export function useGroup(groupId: string) {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!groupId) return;

    const fetchGroup = async () => {
      try {
        const data = await groupService.getGroup(groupId);
        setGroup(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch group'));
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  return { group, loading, error };
}
