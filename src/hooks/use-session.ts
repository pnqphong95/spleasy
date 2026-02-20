'use client';

import { useState, useEffect } from 'react';

export interface UserSession {
  groupId: string;
  groupName: string;
  userName: string;
  memberId?: string;
  lastAccessed: number;
}

const SESSION_KEY = 'spleasy_session';

export function useSession() {
  const [sessions, setSessions] = useState<UserSession[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse sessions from localStorage', e);
      }
    }
    return [];
  });

  useEffect(() => {
    // This effect is now just for sync if needed, but for now we only initialize
  }, []);

  const saveSession = (session: UserSession) => {
    // Check if session for this group already exists and update it, otherwise add new
    const updatedSessions = [...sessions];
    const index = updatedSessions.findIndex((s) => s.groupId === session.groupId);

    if (index >= 0) {
      updatedSessions[index] = session;
    } else {
      updatedSessions.push(session);
    }

    setSessions(updatedSessions);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSessions));
  };

  const getSession = (groupId: string) => {
    return sessions.find((s) => s.groupId === groupId);
  };

  const removeSession = (groupId: string) => {
    const updatedSessions = sessions.filter((s) => s.groupId !== groupId);
    setSessions(updatedSessions);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSessions));
  };

  return {
    sessions,
    saveSession,
    getSession,
    removeSession,
  };
}
