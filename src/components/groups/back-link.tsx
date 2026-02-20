'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BackLink({ fallbackHref }: { fallbackHref: string }) {
    const router = useRouter();
    const [canGoBack, setCanGoBack] = useState(false);

    useEffect(() => {
        // Check if referrer is from the same origin to safely use router.back()
        if (document.referrer && document.referrer.includes(window.location.host)) {
            setCanGoBack(true);
        }
    }, []);

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
            className="absolute left-4 top-4 md:left-8 md:top-8 gap-2 text-muted-foreground hover:text-foreground z-50"
        >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Back</span>
        </Button>
    );
}
