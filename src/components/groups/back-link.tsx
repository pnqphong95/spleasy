'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export function BackLink({
  fallbackHref,
  label = 'Back',
}: {
  fallbackHref: string;
  label?: string;
}) {
  const router = useRouter();
  const [canGoBack] = useState(() => {
    if (typeof document === 'undefined') return false;
    return !!(document.referrer && document.referrer.includes(window.location.host));
  });

  const handleBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className="text-muted-foreground hover:text-foreground absolute top-4 left-4 z-50 gap-2 md:top-8 md:left-8"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only sm:not-sr-only">{label}</span>
    </Button>
  );
}
