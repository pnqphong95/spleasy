'use client';

import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function GroupDashboardPage() {
  const { groupId } = useParams<{ groupId: string }>();

  // Placeholder for real-time group data
  return (
    <div className="flex min-h-screen flex-col pb-20">
      <header className="bg-background/80 sticky top-0 z-10 flex h-14 items-center border-b px-4 backdrop-blur-md">
        <h1 className="font-heading truncate font-bold">Group Dashboard</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-muted/50 space-y-4 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold">Welcome to Spleasy!</h2>
          <p className="text-muted-foreground">
            Dashboard for group {groupId} is under construction (Module 2).
          </p>
          <div className="flex justify-center">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        </div>
      </main>

      {/* Bottom Nav Placeholder */}
      <footer className="bg-background fixed right-0 bottom-0 left-0 flex h-16 items-center justify-around border-t px-6">
        <div className="text-primary flex flex-col items-center">
          <div className="bg-primary/20 h-6 w-6 rounded-md" />
          <span className="mt-1 text-[10px] font-medium">Activity</span>
        </div>
        <div className="text-muted-foreground flex flex-col items-center">
          <div className="bg-muted h-6 w-6 rounded-md" />
          <span className="mt-1 text-[10px]">Balances</span>
        </div>
        <div className="text-muted-foreground flex flex-col items-center">
          <div className="bg-muted h-6 w-6 rounded-md" />
          <span className="mt-1 text-[10px]">Settings</span>
        </div>
      </footer>
    </div>
  );
}
